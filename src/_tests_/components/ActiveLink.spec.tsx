import { render, screen } from '@testing-library/react';
import { ActiveLink } from '../../components/ActiveLink';

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
    render(
      <ActiveLink href="/" activeClass="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should have active class if the link is the current one', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClass="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText('Home')).toHaveClass('active');
  });
});

