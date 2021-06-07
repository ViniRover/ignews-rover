import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/prismic');

const posts = [
  {
    slug: 'slug-fake-one',
    title: 'title-fake-one',
    excerpt: 'excerpt-fake-one',
    updatedAt: 'fake-updated-one'
  },
]

describe('Posts page', () => {
  it('should render posts page correctly', () => {
    render(
      <Posts posts={posts} />
    );

    expect(screen.getByText('title-fake-one')).toBeInTheDocument();
  });

  it('should load initial data correctly', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'fake-uid',
            data: {
              title: [
                { type: 'heading', text: 'fake-title'},
              ],
              content: [
                { type: 'paragraph', text: 'fake-excerpt' }
              ],
            },
            last_publication_date: '03-04-2021'
          }
        ]
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'fake-uid',
            title: 'fake-title',
            excerpt: 'fake-excerpt',
            updatedAt: 'March 04, 2021'
          }]
        },
      }),
    );
  });
});
