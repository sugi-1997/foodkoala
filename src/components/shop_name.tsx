import Head from 'next/head';
import styles from '../styles/Shop.module.css';

export default function ShopName() {
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/acecca202b.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className={styles.shop_detail}>
        <div className={styles.shop_detail_name}>
          <p>{'ショップ名'}</p>
        </div>
        <div className={styles.shop_detail_grade}>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star-half-stroke"></i>
          <i className="fa-regular fa-star"></i>
        </div>
        <div className={styles.shop_detail_img}>
          <img src="/images/shop/abcpizza.shop.png" alt="ロゴ" />
        </div>
        <div className={styles.shop_detail_favorite}>
          <button type="submit">
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
        <div className={styles.shop_detail_explain}>
          <p>
            {
              'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
            }
          </p>
        </div>
      </div>
    </>
  );
}
