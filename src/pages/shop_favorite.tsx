import ShopName from '../components/shop_name';
import ShopMenu from '../components/shop_menu';
import styles from '../styles/Shop.module.css';
import Head from 'next/head';

export default function ShopFavorite() {
  return (
    <>
      <Head>
        <title>お気に入り店舗一覧</title>
      </Head>
      <div className={styles.shopFavorite}>
        <div className={styles.shopFavorite_shop}>
          <div className={styles.shopFavorite_name}>
            <ShopName />
          </div>
          <div className={styles.shopFavorite_menu}>
            <ShopMenu />
            <ShopMenu />
            <ShopMenu />
          </div>
        </div>
        <div className={styles.shopFavorite_shop}>
          <div className={styles.shopFavorite_name}>
            <ShopName />
          </div>
          <div className={styles.shopFavorite_menu}>
            <ShopMenu />
            <ShopMenu />
            <ShopMenu />
          </div>
        </div>
        <div className={styles.shopFavorite_shop}>
          <div className={styles.shopFavorite_name}>
            <ShopName />
          </div>
          <div className={styles.shopFavorite_menu}>
            <ShopMenu />
            <ShopMenu />
            <ShopMenu />
          </div>
        </div>
      </div>
    </>
  );
}
