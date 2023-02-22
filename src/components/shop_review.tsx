import styles from '../styles/Shop.module.css';

export default function ShopReview() {
  return (
    <>
      <div className={styles.shop_detail_reviewTitle}>
        <p>みんなのレビュー</p>
      </div>
      <div className={styles.shop_review}>
        <div className={styles.shop_detail_reviewImg}>
          <img src="/images/provisional_logo.png" alt="コアラ" />
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
