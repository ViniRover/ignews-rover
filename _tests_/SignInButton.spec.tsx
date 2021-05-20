import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';

import { SignInButton } from '../src/components/SignInButton';

jest.mock('next-auth/client');

describe('SignInButton Component', () => {
  it('should render header correctly when user is not autheticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(
      <SignInButton />
    );

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
    expect(screen.getByTestId('not-authenticated-icon')).toBeInTheDocument();
  });

  it('should render header correctly when user is autheticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          email: 'johndoe@email.com',
          name: 'John Doe',
          image: 'urlimage',
        },
        expires: 'fake-expires',
      },
      false
    ]);

    render(
      <SignInButton />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByTestId('authenticated-icon')).toBeInTheDocument();
    expect(screen.getByTestId('signout-icon')).toBeInTheDocument();
  });
});

