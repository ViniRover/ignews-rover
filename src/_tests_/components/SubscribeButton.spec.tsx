import { fireEvent, render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { SubscribeButton } from '../../components/SubscribeButton';

jest.mock('next-auth/client');
jest.mock('next/router');

describe('SubscribeButton Component', () => {
  it('should render subscribe button correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(
      <SubscribeButton />
    );

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('should redirect user to sign in when not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('should redirect to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMocked = jest.fn();


    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          email: 'johndoe@email.com',
          name: 'John Doe',
          image: 'urlimage',
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires',
      },
      false
    ]);

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    render(
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMocked).toHaveBeenCalledWith('/posts');
  });
});

