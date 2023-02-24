import ShopReview from 'components/shop_review';
import styles from '../../styles/Shop.module.css';
import Header from 'components/header';
import Footer from 'components/footer';
import Head from 'next/head';
import Image from 'next/image';
import { Shop, GetStaticProps, ShopProps, Menu } from 'types/shops';
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

export default async function ShopDetail(
  { shopData }: ShopProps,
  { params }: GetStaticProps
) {
  const shop = shopData[0];

  return (
    <>
      <Head>
        <title>ショップ詳細画面</title>
      </Head>
      <main>
        <Header />
        <div>
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
          </div>
          <div className={styles.shopDetail_menu}>
            <ShopMenu params={params} />
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

export async function shopMenu({ shop }: any) {
  const { data, error } = useSWR(
    `http://localhost:8000/items?shop_id=eq.${shop.id}`,
    fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データを取得できませんでした</div>;

  const menus = data.slice(0, 2);

  return (
    <>
      <div className={styles.shop_menu}>
        {menus.map((menu: Menu) => (
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
      </div>
    </>
  );
}
