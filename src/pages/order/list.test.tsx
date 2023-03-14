import Orderlist from './list';
import { render, screen } from '@testing-library/react';
import useSWR, { Middleware, SWRConfig, SWRResponse } from 'swr';
import renderer from 'react-test-renderer';
import { useRouter } from 'next/router';

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
    jest.mock('next/router', () => ({
      useRouter: jest.fn().mockReturnValue({
        replace: jest.fn(),
      }),
    }));
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
    const testMiddleware: Middleware = () => {
      return (): SWRResponse<any, any> => {
        const mockData: any = [];
        return {
          data: mockData,
          error: undefined,
          mutate: (_) => Promise.resolve(),
          isValidating: false,
          isLoading: false,
        };
      };
    };

    // Orderlistをレンダリング
    const tree = renderer
      .create(
        <SWRConfig value={{ use: [testMiddleware] }}>
          <Orderlist />
        </SWRConfig>
      )
      .toJSON();

    //エラーメッセージが画面に描写されているか確認
    const errorMessage = await screen.findByText(
      '※カートに商品がないため、購入できません'
    );
    expect(errorMessage).toBeInTheDocument();

    //リンクが画面に描写されているか確認
    const link = screen.getByRole('link', { name: 'メニュー一覧へ' });
    expect(link).toBeInTheDocument();

    //fetchの引数が正しいか確認
    expect(fetch).toHaveBeenCalledWith('/api/get_cart_items');

    //スナップショットテスト
    expect(tree).toMatchSnapshot();
  });
});
