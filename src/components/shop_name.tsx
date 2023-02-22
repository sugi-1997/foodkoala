import Head from 'next/head';

export default function ShopName() {
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/acecca202b.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div>
        <div className="shop_detail_name">
          <p>{'ショップ名'}</p>
        </div>
        <div className="shop_detail_grade">
          <p>
            <i className="fa-solid fa-star"></i>
          </p>
          <p>
            <i className="fa-solid fa-star"></i>
          </p>
          <p>
            <i className="fa-solid fa-star"></i>
          </p>
          <p>
            <i className="fa-solid fa-star-half"></i>
          </p>
          <p>
            <i className="fa-regular fa-star"></i>
          </p>
        </div>
        <div className="shop_detail_img">
          <img src="ロゴurl" alt="ロゴ" />
        </div>
        <div className="shop_detail_favorite">
          <p>
            <i className="fa-solid fa-heart"></i>
          </p>
        </div>
        <div className="shop_detail_explain"></div>
      </div>
    </>
  );
}
