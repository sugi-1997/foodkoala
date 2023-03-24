export {};

// import { render, fireEvent, waitFor } from '@testing-library/react';
// import FavoriteButton from 'components/shop/favorite_button';
// import Cookies from 'js-cookie';
// import React from 'react';

// const mockFavoriteShops = [
//   {
//     id: 1,
//     name: '麒麟食堂',
//     description: '美味しいです',
//     image_url: '/images/shop/shokudo.shop.jpg',
//     score: 3,
//     genre_id: 1,
//     area_id: 2,
//     review_1: '美味しいです',
//     review_2: '美味しいです',
//     review_3: '美味しいです',
//   },
// ];

// describe('favorite_button', () => {
//   beforeEach(() => {
//     Cookies.set('access_token', '1');
//   });

//   afterEach(() => {
//     Cookies.remove('access_token');
//   });

//   //useRouter(push)のモック
//   const mockRouter = {
//     push: jest.fn(),
//   };
//   jest
//     .spyOn(require('next/router'), 'useRouter')
//     .mockReturnValue(mockRouter);

//   //お気に入りテーブルへのfetchのモック
//   const mockFetch = () =>
//     Promise.resolve({
//       ok: true,
//       status: 200,
//     });

//   // レンダー時のfetch
//   global.fetch = jest.fn().mockImplementation(mockFetch);

//   //お気に入りボタンの表示
//   const renderFavorite = () =>
//     render(<FavoriteButton shop={mockFavoriteShops[0]} />);

//   //ボタンが押される
//   const { getAllByTestId } = render(
//     <FavoriteButton shop={mockFavoriteShops[0]} />
//   );
//   const favoriteButtons = getAllByTestId('favorite');
//   const favoriteButton = favoriteButtons[0];

//   //ハートを切り替える(useState/setHeart)
//   const useStateMock = jest.fn();
//   useStateMock.mockReturnValue(['shop_favorite_false', jest.fn()]);
//   React.useState = useStateMock;
//   const setHeartTrue = jest.fn();
//   setHeartTrue.mockReturnValue('shop_favorite_true');
//   const setHeartFalse = jest.fn();
//   setHeartFalse.mockReturnValue('shop_favorite_false');

//   // お気に入りされている場合のモック
//   const mockFavorite = [{ shop_id: 1, user_id: 1 }];

//   it('ログアウト中に押されたらログインページへ', async () => {
//     //ログイン前
//     Cookies.remove('access_token');

//     // //レンダー
//     waitFor(() => renderFavorite())
//       // //①ハートの切り替え（レンダー時）
//       .then(() =>
//         expect(useStateMock).toHaveBeenCalledWith(
//           'shop_favorite_false'
//         )
//       )
//       .then(() => expect(setHeartFalse).toBeCalled());

//     //ボタンが押される
//     waitFor(() => fireEvent.click(favoriteButton))
//       //②ログイン画面へ遷移
//       .then(() =>
//         expect(mockRouter.push).toHaveBeenCalledWith('/login')
//       );
//   });

//   it('お気に入りでない時はお気に入りを登録してハートを赤に', async () => {
//     const mockData = Promise.resolve({ json: () => [] });
//     const data = mockData.then((res) => res.json());
//     //POSTのfetchモック
//     (global.fetch as jest.Mock).mockReturnValue(
//       Promise.resolve(mockFavorite[0])
//     );

//     // レンダー
//     waitFor(() => renderFavorite())
//       // ①dataがdataのモックと一致（中身なし）
//       .then(() =>
//         data.then((result) => {
//           expect(result).toBeDefined;
//         })
//       )
//       .then(() => expect(setHeartFalse).toBeCalled())
//       .then(() =>
//         expect(setHeartFalse).toBeCalledWith('shop_favorite_false')
//       );

//     // ボタンが押される
//     waitFor(() => fireEvent.click(favoriteButton))
//       // クリック時のfetch（dataのモック）=checkFavorite()
//       .then(() =>
//         data.then((result) => {
//           expect(result).toEqual(mockFavorite);
//         })
//       )

//       // ③ハートを赤に
//       .then(() => expect(setHeartTrue).toBeCalled())
//       .then(() =>
//         expect(setHeartTrue).toBeCalledWith('shop_favorite_true')
//       )

//       //　dataをPOST =postFavorite()
//       .then(() => expect(fetch).toHaveBeenCalledTimes(1))
//       .then(() =>
//         expect(fetch).toHaveBeenCalledWith(
//           `/api/favorite_post?shop_id=eq.1&user_id=eq.1`,
//           { method: 'POST' }
//         )
//       );
//   });

//   it('お気に入りの時はお気に入りを削除してハートをグレーに', () => {
//     const mockData = Promise.resolve({
//       json: (shop_id: number, user_id: number) => [
//         { shop_id, user_id },
//       ],
//     });
//     const data = mockData.then((res) => res.json(1, 1));
//     //DELETEのfetchモック
//     (global.fetch as jest.Mock).mockReturnValue(
//       Promise.resolve(mockFavorite[0])
//     );

//     // レンダー
//     waitFor(() => renderFavorite())
//       // ①dataがdataのモックと一致
//       .then(() => expect(setHeartTrue).toBeCalled())
//       .then(() =>
//         data.then((result) => {
//           expect(result).toEqual(mockFavorite);
//         })
//       );

//     // ボタンが押される
//     waitFor(() => fireEvent.click(favoriteButton))
//       // // クリック時のfetch（dataのモック）=checkFavorite()
//       .then(() =>
//         data.then((result) => {
//           expect(result).toBeDefined;
//         })
//       )

//       // ③ハートをグレーに
//       .then(() => expect(setHeartFalse).toBeCalled())

//       //　dataをDELETE =deleteFavorite()
//       .then(() => expect(fetch).toHaveBeenCalledTimes(1))
//       .then(() =>
//         expect(fetch).toHaveBeenCalledWith(
//           `/api/favorite_post?shop_id=eq.1&user_id=eq.1`,
//           { method: 'DELETE' }
//         )
//       );
//   });
// });
