import styles from '../styles/Shop.module.css';
import Image from 'next/image';
import { Shop } from 'types/shops';

export default function ShopReview({ shop }: { shop: Shop }) {
  //レビューのコアラアイコン
  function koalaIcon() {
    return (
      <div className={styles.shop_id_review_img}>
        <Image
          src="/images/foodkoala_logo.png"
          alt="コアラ"
          width={50}
          height={50}
        />
      </div>
    );
  }

  return (
    <>
      <div className={styles.shopDetail_review}>
        <p className={styles.shop_id_review_title}>
          <span>
            <i className="fa-solid fa-face-laugh"></i>
            &nbsp;みんなのレビュー
          </span>
        </p>
        <div className={styles.shop_review}>
          {koalaIcon()}
          <div className={styles.shop_id_review}>{shop.review_1}</div>
        </div>
        <br />
        <div className={styles.shop_review}>
          {koalaIcon()}
          <div className={styles.shop_id_review}>{shop.review_2}</div>
        </div>
        <br />
        <div className={styles.shop_review}>
          {koalaIcon()}
          <div className={styles.shop_id_review}>{shop.review_3}</div>
        </div>
      </div>
    </>
  );
}
