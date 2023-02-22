import ShopName from '../components/shop_name';
import ShopReview from '../components/shop_review';
import ShopMenu from '../components/shop_menu';
import styles from '../styles/Shop.module.css';

export default function ShopDetail() {
  return (
    <>
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
    </>
  );
}
