import {
  render,
  fireEvent,
  getAllByTestId,
} from '@testing-library/react';
import FavoriteButton from 'components/shop/favorite_button';
import Cookies from 'js-cookie';
import React from 'react';

const mockFavoriteShops = [
  {
    id: 1,
    name: '麒麟食堂',
    description: '美味しいです',
    image_url: '/images/shop/shokudo.shop.jpg',
    score: 3,
    genre_id: 1,
    area_id: 2,
    review_1: '美味しいです',
    review_2: '美味しいです',
    review_3: '美味しいです',
  },
];

describe('favorite_button', () => {
  afterEach(() => {
    Cookies.remove('access_token');
  });
  it('ログアウト中に押されたらログインページへ', () => {
    //ルーター(push)のモック
    const mockRouter = {
      push: jest.fn(),
    };
    jest
      .spyOn(require('next/router'), 'useRouter')
      .mockReturnValue(mockRouter);

    //ログイン前
    const mockNoUserId = Cookies.remove('access_token');
    expect(mockNoUserId).toBeUndefined();

    //ハートを切り替える
    const useStateMock = jest.fn();
    useStateMock.mockReturnValue(['shop_favorite_false', jest.fn()]);
    React.useState = useStateMock;

    // //レンダー
    render(<FavoriteButton shop={mockFavoriteShops[0]} />);

    // //①ハートの切り替え（レンダー時）
    expect(useStateMock).toHaveBeenCalledWith('shop_favorite_false');

    //ボタンが押される
    const { getAllByTestId } = render(
      <FavoriteButton shop={mockFavoriteShops[0]} />
    );
    const favoriteButtons = getAllByTestId('favorite');
    const favoriteButton = favoriteButtons[0];
    fireEvent.click(favoriteButton);

    //②ログイン画面へ遷移
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('お気に入りでない時はお気に入りを登録してハートを赤に', () => {
    // ログイン状態
    const mockUserId = Cookies.set('access_token', '1');
    expect(mockUserId).toBe('1');

    //　お気に入りのモック
    const mockFavorite = [];

    // レンダー
    render(<FavoriteButton shop={mockFavoriteShops[0]} />);

    // レンダー時のfetch(dataのモック)

    // ①dataがdataのモックと一致（中身なし）

    // ②ハートをグレーに

    // ボタンが押される

    // クリック時のfetch（dataのモック）=checkFavorite()

    //　dataをPOST =postFavorite()

    // ③ハートを赤に
  });

  it('お気に入りの時はお気に入りを削除してハートをグレーに', () => {
    // ログイン状態
    const mockUserId = Cookies.set('access_token', '1');
    expect(mockUserId).toBe('1');

    //　お気に入りのモック
    const mockFavorite = [{ shop_id: 1, user_id: 1 }];

    // レンダー
    render(<FavoriteButton shop={mockFavoriteShops[0]} />);

    // レンダー時のfetch(dataのモック)

    // ①dataがdataのモックと一致

    // ②ハートを赤に

    // ボタンが押される

    // クリック時のfetch（dataのモック）=checkFavorite()

    //　dataをDELETE =deleteFavorite()

    // ③ハートをグレーに
  });
});
