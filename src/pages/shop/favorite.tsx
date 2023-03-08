import ShopName from 'components/shop_name';
import styles from 'styles/Shop_list.module.css';
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
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (resource: string) =>
  fetch(resource).then((res) =>
    res.json().then((data) => {
      return data;
    })
  );

export default function ShopFavorite() {
  const userId = Cookies.get('user_id');
  const [favoriteShops, setFavoriteShops] = useState<Shops[]>([]);

  //userが登録したお気に入りのshop_idをfavoriteテーブルから取得
  const { data, error } = useSWR(
    `/api/favorite?user_id=eq.${userId}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );
  const { mutate } = useSWRConfig();

  //favorirteのshop_idからお気に入りのショップ一覧を取得
  useEffect(() => {
    if (userId === null || userId === undefined || !data) {
      return;
    } else {
      const getFavoriteShops = async () => {
        const newFavoriteShops: Shops[] = [];
        console.log(data);
        for (const fav of data) {
          try {
            const res = await fetch(
              `/api/favorite_shops?id=eq.${fav.shop_id}`
            );
            const data = await res.json();
            newFavoriteShops.push(data[0]);
            console.log(
              'newfavoriteShopsにデータを追加しました',
              newFavoriteShops
            );
          } catch (error) {
            console.error(error);
          }
        }
        setFavoriteShops(newFavoriteShops);
      };
      getFavoriteShops();
    }
  }, [data, userId]);

  if (error) return <div>Error...</div>;
  if (!data) {
    return (
      <>
        <Header />
        <BreadList list={[menu_list, favorite_list]} />
        <div>Loading...</div>
        <Footer />
      </>
    );
  }

  if (userId === null || userId === undefined) {
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
  }

  if (favoriteShops.length === 0) {
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
              <a href="/shop/list">ショップ一覧へ</a>
            </div>
            <br />
            <p>お気に入り店舗がありません</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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

type Data = {
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
