export {};

// import { render } from '@testing-library/react';
// import NoLoginFavorite from 'components/shop/no_login_favorite';
// import LoadingFavorite from 'components/shop/loading_favorite';
// import NoFavorite from 'components/shop/no_favorite';
// import Favorite from 'components/shop/favorite';

// jest.mock('next/router', () => ({
//   useRouter() {
//     return {
//       asPath: '/login',
//     };
//   },
// }));

// describe('お気に入りページのテスト', () => {
//   it('ログイン後お気に入りがある場合のスナップショットテスト', () => {
//     const mockFavoriteShops = [
//       {
//         id: 1,
//         name: '麒麟食堂',
//         description: '美味しいです',
//         image_url: '/images/shop/shokudo.shop.jpg',
//         score: 3,
//         genre_id: 1,
//         area_id: 2,
//         review_1: '美味しいです',
//         review_2: '美味しいです',
//         review_3: '美味しいです',
//       },
//     ];
//     const { asFragment } = render(
//       <Favorite favoriteShops={mockFavoriteShops} />
//     );
//     expect(asFragment).toMatchSnapshot();
//   });
//   it('ログイン後お気に入りがない場合のスナップショットテスト', () => {
//     const { asFragment } = render(<NoFavorite />);
//     expect(asFragment).toMatchSnapshot();
//   });
//   it('データ待ちの場合のスナップショット', () => {
//     const { asFragment } = render(<LoadingFavorite />);
//     expect(asFragment).toMatchSnapshot();
//   });
//   it('ログインしていない場合のスナップショット', () => {
//     const { asFragment } = render(<NoLoginFavorite />);
//     expect(asFragment).toMatchSnapshot();
//   });
// });
