import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import useSWR from 'swr';
import styles from '../styles/Shop.module.css';
import ShopMenu from '../components/shop_menu';
import { Shop } from 'types/shops';
import Link from 'next/link';
import score from 'components/shop/score';
import { SyntheticEvent, useState } from 'react';
import shopMenuList from './shop/menu.[id]';
import { useEffect } from 'react';

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

  function ToggleFavorite(props: { shop: Shop }) {
    const [favorite, setFavorite] = useState(false);
    useEffect(() => {
      fetch(
        `http://localhost:8000/favorite?shop_id=eq.${props.shop.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setFavorite(data[0].favorite);
        });
    }, [data.id]);

    return (
      <>
        <form>
          {favorite ? (
            <div className={styles.shop_favorite_true}>
              <button type="submit">
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          ) : (
            <div className={styles.shop_favorite_false}>
              <button type="submit">
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          )}
        </form>
      </>
    );
  }

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
              {shop.score}
              {score(shop.score)}
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
            <ToggleFavorite shop={shop} />
            <p className={styles.shop_detail_description}>
              {shop.description}
            </p>
            <div className={styles.shopDetail_menu}>
              <ShopMenu id={shop.id} />
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
