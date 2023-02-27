import ShopReview from 'components/shop_review';
//import ShopMenu from 'components/shop_menu';
import styles from '../../styles/Shop.module.css';
import Header from 'components/header';
import Footer from 'components/footer';
import Head from 'next/head';
import Image from 'next/image';
import { Shop, GetStaticProps, ShopProps, Menu } from 'types/shops';
import score from 'components/shop/score';
import { useState } from 'react';
import useSWR from 'swr';

export async function getStaticPaths() {
  const res = await fetch('http://127.0.0.1:8000/shops');
  const shops = await res.json();
  const paths = shops.map((shop: Shop) => ({
    params: {
      id: `${shop.id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticProps) {
  const res = await fetch(
    `http://127.0.0.1:8000/shops?id=eq.${params.id}`
  );
  const shopData = await res.json();
  return {
    props: { shopData },
  };
}

const fetcher = (resource: string, init: object) =>
  fetch(resource, init).then((res) => res.json());

export function MenuList({ data }: { data: Menu[] }) {
  return (
    <>
      {data.map((menu: Menu) => (
        <div key={menu.id}>
          <div className={styles.shop_detail_menuImg}>
            <Image
              src={menu.image_url}
              alt="メニュー画像"
              width={150}
              height={150}
            />
          </div>
          <div className={styles.shop_detail_menuName}>
            <p>{menu.name}</p>
          </div>
          <div className={styles.shop_detail_menuPrice}>
            <p>{menu.price}円</p>
          </div>
        </div>
      ))}
    </>
  );
}

export function ShopMenu({ shopId }: { shopId: number }) {
  const { data, error } = useSWR(
    `http://localhost:8000/items?shop_id=eq.${shopId}`,
    fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データを取得できませんでした</div>;

  console.log('data', data);
  return (
    <>
      <div className={styles.shop_menu}>
        <MenuList data={data} />
      </div>
    </>
  );
}

export default function ShopDetail({ shopData }: ShopProps) {
  const shop = shopData[0];

  function Score() {
    return score(shop.score);
  }

  /*
  function ShopMenu() {
    return shopMenu(shop)
  }
  */

  const [active, setActive] = useState(false);
  function classToggle() {
    setActive(!active);
  }

  return (
    <>
      <Head>
        <title>ショップ詳細画面</title>
        <script
          src="https://kit.fontawesome.com/acecca202b.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <main>
        <Header />
        <div>
          <div key={shop.id}>
            <p className={styles.shop_detail_name}>{shop.name}</p>
            <div className={styles.shop_detail_grade}>
              {shop.score}
              <Score />
            </div>
            <div className={styles.shop_detail_img}>
              <Image
                src={shop.image_url}
                alt="お店の画像"
                width={150}
                height={150}
              />
            </div>
            <div
              className={
                active
                  ? styles.shop_favorite_true
                  : styles.shop_favorite_false
              }
            >
              <button type="submit" onClick={classToggle}>
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
            <p>{shop.description}</p>
          </div>
          <div className={styles.shopDetail_menu}>
            <ShopMenu shopId={shop.id} />
          </div>
          <div className={styles.shopDetail_review}>
            <ShopReview />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
