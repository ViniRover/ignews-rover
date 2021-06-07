import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripe';

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});
jest.mock('next/router');
jest.mock('../../services/stripe');

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

  it('should load initial data correctly', async () => {
    const retrievePricesStripeMocked = mocked(stripe.prices.retrieve);

    retrievePricesStripeMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00',
          },
        },
      }),
    );
  });
});
