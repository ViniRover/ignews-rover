import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils';
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('next-auth/client');
jest.mock('next/router');
jest.mock('../../services/prismic');

const post = {
    slug: 'slug-fake-one',
    title: 'title-fake-one',
    content: '<p>content-fake-one</p>',
    updatedAt: 'fake-updated-one'
}


describe('Postpreview page', () => {
  it('should render post preview page correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(
      <Post post={post} />
    );

    expect(screen.getByText('title-fake-one')).toBeInTheDocument();
    expect(screen.getByText('content-fake-one')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  it('should redirects user to full post if user is subscriber', async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMocked = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    useSessionMocked.mockReturnValueOnce([
      {
        activeSubscription: 'fake-subscription',
      },
      false,
    ] as any);

    render(
      <Post post={post} />
    )

    expect(pushMocked).toHaveBeenCalledWith('/posts/slug-fake-one');
  });

  it('should load initial data correctly', async () => {
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

    const response = await getStaticProps({
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
