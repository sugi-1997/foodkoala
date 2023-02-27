import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import useSWR from 'swr';
import styles from '../styles/Shop.module.css';
import ShopMenu from '../components/shop_menu';
import { Shop } from 'types/shops';
import Link from 'next/link';

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

  return (
    <>
      <Script
        src="https://kit.fontawesome.com/acecca202b.js"
        crossOrigin="anonymous"
      ></Script>
      <main className={styles.shop_detail}>
        {data.map((shop: Shop) => (
          <div key={shop.id}>
            <p className={styles.shop_detail_name}>{shop.name}</p>
            <div className={styles.shop_detail_grade}>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
              <i className="fa-regular fa-star"></i>
            </div>
            <div className={styles.shop_detail_img}>
              <Link href={`/shop/${shop.id}`}>
                <Image
                  src={shop.image_url}
                  alt="お店の画像"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
            <div className={styles.shop_detail_favorite}>
              <button type="submit">
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
            <p>{shop.description}</p>
            <div className={styles.shopDetail_menu}>
              <ShopMenu id={shop.id} />
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
