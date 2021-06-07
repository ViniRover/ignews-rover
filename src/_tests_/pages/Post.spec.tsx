import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/prismic');
jest.mock('next-auth/client');

const post = {
    slug: 'slug-fake-one',
    title: 'title-fake-one',
    content: '<p>content-fake-one</p>',
    updatedAt: 'fake-updated-one'
}


describe('Post page', () => {
  it('should render post page correctly', () => {
    render(
      <Post post={post} />
    );

    expect(screen.getByText('title-fake-one')).toBeInTheDocument();
    expect(screen.getByText('content-fake-one')).toBeInTheDocument();
  });

  it('should redirects user if no subscription is found', async () => {
    const getSessionsMocked = mocked(getSession);

    getSessionsMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'fake-slug',
      },
    } as any);


    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: '/posts/preview/fake-slug',
          permanent: false,
        },
      }),
    );
  });

  it('should load initial data correctly', async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'fake-title'},
          ],
          content: [
            { type: 'paragraph', text: 'fake-content' }
          ],
        },
        last_publication_date: '03-04-2021'
      }),
    } as any);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-subscription',
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'fake-slug',
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'fake-slug',
            title: 'fake-title',
            content: '<p>fake-content</p>',
            updatedAt: 'March 04, 2021',
          },
        },
      }),
    );
  });
});
