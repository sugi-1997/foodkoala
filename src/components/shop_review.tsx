import styles from '../styles/Shop.module.css';
import Image from 'next/image';

export default function ShopReview() {
  return (
    <>
      <div className={styles.shop_detail_reviewTitle}>
        <p>みんなのレビュー</p>
      </div>
      <div className={styles.shop_review}>
        <div className={styles.shop_detail_reviewImg}>
          <Image
            src="/images/provisional_logo.png"
            alt="コアラ"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.shop_detail_review}>
          {
            'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
          }
        </div>
      </div>
    </>
  );
}
