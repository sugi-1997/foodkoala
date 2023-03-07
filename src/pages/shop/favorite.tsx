import ShopName from 'components/shop_name';
import styles from '../styles/Shop_list.module.css';
import Head from 'next/head';
import Header from 'components/header';
import Footer from 'components/footer';
import BreadList, {
  menu_list,
  favorite_list,
} from 'components/bread_list';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ShopFavorite() {
  const userId = Cookies.get('user_id');
  const [favoriteData, setFavoriteData] = useState<FavoriteData[]>(
    []
  );
  const [favoriteShops, setFavoriteShops] = useState<Shops[]>([]);

  //userが登録したお気に入りのshop_idをfavoriteテーブルから取得
  useEffect(() => {
    fetch(`http://localhost:8000/favorite?user_id=eq.${userId}`)
      .then((res) => res.json())
      .then((data) => setFavoriteData(data));
  }, [userId]);

  //favorirteのshop_idからお気に入りのショップ一覧を取得
  useEffect(() => {
    if (favoriteData.length === 0) {
      return;
    } else {
      console.log('favoriteData', favoriteData);
      const getFavoriteShops = async () => {
        const promises = favoriteData.map((data) => {
          return fetch(
            `/api/favorite_shops?id=eq.${data.shop_id}`
          ).then((res) => res.json());
        });
        const shopsData = await Promise.all(promises);
        const newFavoriteShops = shopsData.map((data) => data[0]);
        console.log(
          'newfavoriteShopsにデータを追加しました',
          newFavoriteShops
        );
        setFavoriteShops(newFavoriteShops);
      };
      getFavoriteShops();
    }
  }, [favoriteData]);

  if (favoriteShops.length === 0) {
    return <div>Loading...</div>;
  } else if (userId === null || userId === undefined) {
    return (
      <>
        <Header />
        <BreadList list={[menu_list, favorite_list]} />
        <div>
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
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>お気に入り店舗一覧</title>
        </Head>
        <Header />
        <BreadList list={[menu_list, favorite_list]} />
        <ShopName data={favoriteShops} />
        <Footer />
      </>
    );
  }
}

type FavoriteData = {
  shop_id: number;
  user_id: number;
};

type Shops = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  score: number;
  favorite: boolean;
  genre_id: number;
  area_id: number;
  deleted_at: Date;
  review_1: string;
  review_2: string;
  review_3: string;
};
