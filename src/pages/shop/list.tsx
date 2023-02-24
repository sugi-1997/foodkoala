import ShopName from 'components/shop_name';
import styles from 'styles/Shop.module.css';
import Head from 'next/head';
import Header from 'components/header';
import Genre from 'components/genre';
import Area from 'components/area';
import Footer from 'components/footer';

export default function ShopList() {
  return (
    <>
      <Head>
        <title>お店一覧</title>
      </Head>
      <main className={styles.shopList}>
        <Header />
        <Genre />
        <Area />
        <div className={styles.shopList_shop}>
          <div className={styles.shopList_name}>
            <ShopName />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
