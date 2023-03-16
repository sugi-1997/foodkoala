/**
 * @jest-environment jsdom
 */

import Orderlist from './list';
import { render, screen, waitFor } from '@testing-library/react';
import useSWR, { Middleware, SWRConfig, SWRResponse } from 'swr';
import { useRouter } from 'next/router';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/login',
    };
  },
}));

const fetchMockError = () => {
  const error = new Error('Failed to fetch data');
  return new Promise((rejects) => {
    rejects({
      ok: false,
      status: 400,
      json: async () => {
        throw error;
      },
    });
  });
};

describe('OrderList', () => {
  beforeAll(() => {
    (global as any).fetch = jest.fn();
    jest.mock('next/router', () => require('next-router-mock'));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders loding when data is not fetched', () => {
    render(<Orderlist />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders Error when fetching data is failed', async () => {
    global.fetch = jest.fn().mockImplementation(fetchMockError);

    const { asFragment } = render(<Orderlist />);

    expect(await screen.findByText('Error...')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('/api/get_cart_items');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders OrderList correctly when the cart is empty', async () => {
    jest.mock('swr');
    (global as any).fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [],
    });

    // Orderlistをレンダリング
    const { asFragment } = render(
      <SWRConfig>
        <Orderlist />
      </SWRConfig>
    );

    //エラーメッセージが画面に描写されているか確認
    const errorMessage = await screen.findByText(
      '※カートに商品がないため、購入できません'
    );
    await waitFor(() => expect(errorMessage).toBeInTheDocument());

    //リンクが画面に描写されているか確認
    const link = screen.getByRole('link', { name: 'メニュー一覧へ' });
    await waitFor(() => expect(link).toBeInTheDocument());

    //fetchの引数が正しいか確認
    expect(fetch).toHaveBeenCalledWith('/api/get_cart_items');

    //スナップショットテスト
    expect(asFragment()).toMatchSnapshot();
  });
});

it('renders Orderlist when items in the cart', async () => {
  const mockData = [
    {
      id: 1,
      cart_id: 1,
      item_id: 5,
      count: 1,
    },
  ];
  jest.mock('swr');
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => mockData,
  });

  const { asFragment } = render(
    <SWRConfig>
      <Orderlist />
    </SWRConfig>
  );
  // 画面に商品が描写されているかの確認

  expect(await screen.findByText(/小計/)).toBeInTheDocument();

  // fetchの引数が正しいかの確認
  expect(fetch).toHaveBeenCalledWith('/api/get_cart_items');
  // スナップショットテストの実施
  expect(asFragment()).toMatchSnapshot();
});
