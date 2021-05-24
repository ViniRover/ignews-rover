import { render, screen } from '@testing-library/react';
import Home from '../../src/pages';

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});
jest.mock('next/router');

const product = {
  priceId: 'fake-price-id',
  amount: 'R$10,00'
}

describe('Home page', () => {
  it('should render home page correctly', () => {
    render(
      <Home product={product} />
    );

    expect(screen.getByText('for R$10,00 per month')).toBeInTheDocument();
  });
});
