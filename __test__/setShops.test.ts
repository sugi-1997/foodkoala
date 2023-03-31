export {};
// // import { useSetShops } from './setShops';

// // describe('お気に入りの店の情報を表示する', () => {
// //   jest.mock('');
// //   it('お気に入りを表示しない', () => {
// //     const userId = null || undefined;
// //     const mockData = null || undefined;
// //     useSetShops(mockData);
// //     expect(userId).toHaveReturned();
// //     expect(mockData).toHaveReturned();
// //   });

// //   it('お気に入りを表示する', () => {
// //     jest.mock('fetch');
// //     const mockData = [
// //       {
// //         id: 1,
// //         name: '食堂麒麟',
// //         description:
// //           '和食の伝統的な味わいと季節感を大切にしています。',
// //         image_url: '/images/shop/shokudo.shop.jpg',
// //         score: 3.7,
// //         genre_id: 2,
// //         area_id: 1,
// //         review_1: '本格的な味',
// //         review_2: '彩りが綺麗',
// //         review_3: '出汁の効いたうどん',
// //       },
// //     ];
// //     expect(favoriteShops).toEqual(mockData);
// //     expect(fetch).toHaveBeenCalledWith();
// //   });
// // });

// import { useState as useStateMock } from 'react';
// import { useSetShops } from './setShops';
// import { Shop } from 'types/shops';

// jest.mock('react', () => ({
//   ...jestRequireActual('react'),
//   useState: jest.fn(),
// }));

// const [favoriteShops, setFavoriteShops] = useStateMock<Shop[]>([]);

// describe('お気に入りテスト', () => {
//   it('お気に入りの店情報を取得する', () => {
//     //モック
//     const mockData = [{ shop_id: 1, user_id: 1 }];
//     global.fetch = jest.fn().mockImplementation(
//       (): Promise<{
//         status: number;
//         json: jest.Mock<any, any, any>;
//       }> => new Promise(mockRes)
//     );
//     const mockRes = {
//       status: 200,
//       json: jest.fn().mockResolvedValue(mockData),
//     };
//     const data = mockRes.json();
//     useSetShops(data);
//     const error = undefined;
//     expect(data).toEqual(mockData);
//     expect(error).toBeUndefined();
//     expect(fetch).toBeCalledWith(
//       `/api/favorite_shops?id=eq.${mockData[0].shop_id}`
//     );
//   });
// });
