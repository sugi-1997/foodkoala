import Head from 'next/head';
import styles from '../styles/Shop.module.css';
import useSWR from 'swr';
import Image from 'next/image';
import ShopMenu from '../components/shop_menu';
import { Shop } from 'types/shops';
import Link from 'next/link';
import score from 'components/shop/score';
import { useState } from 'react';

const fetcher = (resource: string, init: object) =>
  fetch(resource, init).then((res) => res.json());

export default function ShopName() {
  const { data, error } = useSWR(
    'http://localhost:8000/shops',
    fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データを取得できませんでした</div>;

  console.log('data', data);

  const [active, setActive] = useState(false);
  function classToggle() {
    setActive(!active);
  }

  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/acecca202b.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <main className={styles.shop_detail}>
        {data.map((shop: Shop) => (
          <div key={shop.id}>
            <p className={styles.shop_detail_name}>{shop.name}</p>
            <div className={styles.shop_detail_grade}>
              {shop.score}
              {score(shop.score)}
            </div>
            <div className={styles.shop_detail_img}>
              <Link href={`../shop/${shop.id}`}>
                <Image
                  src={shop.image_url}
                  alt="お店の画像"
                  width={150}
                  height={150}
                />
              </Link>
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
            <div className={styles.shopDetail_menu}>
              <ShopMenu />
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
