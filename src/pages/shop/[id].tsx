import ShopName from 'components/shop_name';
import ShopReview from 'components/shop_review';
import ShopMenu from 'components/shop_menu';
import styles from 'styles/Shop.module.css';
import Header from 'components/header';
import Footer from 'components/footer';
import Head from 'next/head';

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
  const res = await fetch('http://127.0.0.1:8000/shop');
  const shops = await res.json();
  const paths = shops.map((shop: Shop) => ({
    params: {
      id: `${shop.id}`,
    },
  }));
}

export default function ShopDetail() {
  return (
    <>
      <Head>
        <title>ショップ詳細画面</title>
      </Head>
      <main>
        <Header />
        <div>
          <div className={styles.shopDetail_name}>
            <ShopName />
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
