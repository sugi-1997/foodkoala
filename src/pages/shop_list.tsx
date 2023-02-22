import ShopName from '../components/shop_name';
import ShopMenu from '../components/shop_menu';
import styles from '../styles/Shop.module.css';
import Head from 'next/head';

export default function ShopList() {
  return (
    <>
      <Head>
        <title>お店一覧</title>
      </Head>
      <div className={styles.shopList}>
        <div className={styles.shopList_shop}>
          <div className={styles.shopList_name}>
            <ShopName />
          </div>
          <div className={styles.shopList_menu}>
            <ShopMenu />
            <ShopMenu />
            <ShopMenu />
          </div>
        </div>
        <div className={styles.shopList_shop}>
          <div className={styles.shopList_name}>
            <ShopName />
          </div>
          <div className={styles.shopList_menu}>
            <ShopMenu />
            <ShopMenu />
            <ShopMenu />
          </div>
        </div>
        <div className={styles.shopList_shop}>
          <div className={styles.shopList_name}>
            <ShopName />
          </div>
          <div className={styles.shopList_menu}>
            <ShopMenu />
            <ShopMenu />
            <ShopMenu />
          </div>
        </div>
      </div>
    </>
  );
}
