import ShopName from 'components/shop_name';
import ShopReview from 'components/shop_review';
import ShopMenu from 'components/shop_menu';

import styles from 'styles/Shop.module.css';

import Header from 'components/header';
import Footer from 'components/footer';
import Head from 'next/head';
import Image from 'next/image';

type Shop = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  score: number;
  favorite: boolean;
  genre_id: number;
  area_id: number;
};

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

type GetStaticProps = {
  params: { id: string };
};

export async function getStaticProps({ params }: GetStaticProps) {
  const res = await fetch(
    `http://127.0.0.1:8000/shops?id=eq.${params.id}`
  );
  const shopData = await res.json();
  return {
    props: { shopData },
  };
}

type ShopProps = {
  shopData: {
    id: number;
    name: string;
    description: string;
    image_url: string;
    score: number;
    favorite: boolean;
    genre_id: number;
    area_id: number;
  }[];
};

export default function ShopDetail({ shopData }: ShopProps) {
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
            <ShopMenu />
            <ShopMenu />
            <ShopMenu />
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
