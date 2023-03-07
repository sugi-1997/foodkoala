import ShopName from 'components/shop_name';
import styles from 'styles/Shop_list.module.css';
import Head from 'next/head';
import Header from 'components/header';
import Genre from 'components/genre';
import Area from 'components/area';
import Footer from 'components/footer';
import BreadList, {
  menu_list,
  favorite_list,
} from 'components/bread_list';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ShopFavorite() {
  const [favoriteData, setFavoriteData] = useState([]);
  const userId = Cookies.get('user_id');

  //ログイン前（cookieなし）はログインを促す
  if (userId === null || userId === undefined) {
    return (
      <>
        <Header />
        <BreadList list={[menu_list, favorite_list]} />
        <main>
          <div className={styles.favorite_login}>
            <div className={styles.favorite_login_link}>
              <img src="/images/foodkoala_img2.png" alt="コアラ" />
              <br />
              <br />
              <a href="/login">ログイン</a>
            </div>
            <br />
            <p>
              お気に入り店舗一覧を表示したい場合はログインをしてください
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  //userが登録したお気に入りのshop_idをfavoriteテーブルから取得
  useEffect(() => {
    fetch(`http://localhost:8000/favorite?user_id=eq.${userId}`)
      .then((res) => res.json())
      .then((data) => setFavoriteData(data));
  }, [favoriteData]);

  //お気に入りのshop_idのみのshop情報を取得して表示
  return (
    <>
      <Head>
        <title>お気に入り店舗一覧</title>
      </Head>
      <main>
        <Header />
        <BreadList list={[menu_list, favorite_list]} />
        <Genre onClick={undefined} />
        <Area />
        {favoriteData.map((fav: any) => (
          <ShopName
            url={`http://localhost:8000/shops?id=eq.${fav.shop_id}`}
          />
        ))}
        <Footer />
      </main>
    </>
  );
}
