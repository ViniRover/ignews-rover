import { render } from '@testing-library/react';
import { ActiveLink } from '../src/components/ActiveLink';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

describe('ActiveLink Component', () => {
  it('should render active link correctly', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClass="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('should have active class if the link is the current one', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClass="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText('Home')).toHaveClass('active');
  });
});

