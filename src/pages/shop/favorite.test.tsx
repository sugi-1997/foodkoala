import '@testing-library/jest-dom/extend-expect';
import ShopFavorite from './favorite';
import { render } from '@testing-library/react';

// describe('Snapshot', () => {
//   // ログイン時のスナップショットテスト
//   it('Snapshot test of favorite_page_login', () => {
//     const favorite = `    <>
//         <Head>
//           <title>お気に入り店舗一覧</title>
//         </Head>
//         <Header />
//         <BreadList list={[menu_list, favorite_list]} />
//         <ShopName data={favoriteShops} />
//         <Footer />
//       </>`;
//     expect(favorite).toMatchSnapshot();
//   });
//   // ログイン前のスナップショットテスト
//   it('Snapshot test of favorite_page_logout', () => {
//     const favorite_logout = `<>
//     <Header />
//     <BreadList list={[menu_list, favorite_list]} />
//     <div>
//       <div className={styles.favorite_login}>
//         <div className={styles.favorite_login_link}>
//           <img src="/images/foodkoala_img2.png" alt="コアラ" />
//           <br />
//           <br />
//           <a href="/login">ログイン</a>
//         </div>
//         <br />
//         <p>
//           お気に入り店舗一覧を表示したい場合はログインをしてください
//         </p>
//       </div>
//     </div>
//     <Footer />
//   </>`;
//     expect(favorite_logout).toMatchSnapshot();
//   });
//   // ログイン後お気に入り登録がない場合のスナップショットテスト
//   it('Snapshot test of no_favorite_page', () => {
//     const no_favorite_page = `<>
//     <Header />
//     <BreadList list={[menu_list, favorite_list]} />
//     <div>
//       <div className={styles.favorite_login}>
//         <div className={styles.favorite_login_link}>
//           <img src="/images/foodkoala_img2.png" alt="コアラ" />
//           <br />
//           <br />
//           <a href="/shop/list">ショップ一覧へ</a>
//         </div>
//         <br />
//         <p>お気に入り店舗がありません</p>
//       </div>
//     </div>
//     <Footer />
//   </>`;
//     expect(no_favorite_page).toMatchSnapshot();
//   });
// });

// describe('favoriteスナップショット', () => {
//   const { asFragment } = render(<ShopFavorite />);
//   expect(asFragment()).toMatchSnapshot();
// });
