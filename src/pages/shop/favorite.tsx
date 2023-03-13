import Head from 'next/head';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import Link from 'next/link';
import ShopName from 'components/shop_name';
import Header from 'components/header';
import Footer from 'components/footer';
import BreadList, {
  menu_list,
  favorite_list,
} from 'components/bread_list';
import type { Shop } from 'types/shops';
import styles from 'styles/Shop_list.module.css';

const fetcher = (resource: string) =>
  fetch(resource).then((res) =>
    res.json().then((data) => {
      return data;
    })
  );

export default function ShopFavorite() {
  const userId = Cookies.get('user_id');
  const [favoriteShops, setFavoriteShops] = useState<Shop[]>([]);

  //userが登録したお気に入りのshop_idをfavoriteテーブルから取得
  const { data, error } = useSWR(
    `/api/favorite?user_id=eq.${userId}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  //favorirteのshop_idからお気に入りのショップ一覧を取得
  useEffect(() => {
    if (userId === null || userId === undefined || !data) {
      return;
    } else {
      const getFavoriteShops = async () => {
        const newFavoriteShops: Shop[] = [];
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
              <Image
                src="/images/foodkoala_img2.png"
                alt="コアラ"
                width={300}
                height={300}
              />
              <br />
              <br />
              <Link href="/login">ログイン</Link>
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
              <Image
                src="/images/foodkoala_img2.png"
                alt="コアラ"
                width={300}
                height={300}
              />
              <br />
              <br />
              <Link href="/shop/list">ショップ一覧へ</Link>
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
