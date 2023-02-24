import Head from 'next/head';
import styles from '../styles/Shop.module.css';
import useSWR from 'swr';
import Image from 'next/image';
import ShopMenu from '../components/shop_menu';
import { Shop } from 'types/shops';

const fetcher = (resource: string, init: object) =>
  fetch(resource, init).then((res) => res.json());

export default function ShopName() {
  const { data, error } = useSWR(
    'http://localhost:8000/shops',
    fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データを取得できませんでした</div>;

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
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
              <i className="fa-regular fa-star"></i>
            </div>
            <div className={styles.shop_detail_img}>
              <Image
                src={shop.image_url}
                alt="お店の画像"
                width={150}
                height={150}
              />
            </div>
            <div className={styles.shop_detail_favorite}>
              <button type="submit">
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
