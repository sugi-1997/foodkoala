import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/concept.module.css';
import BreadList, { menu_list, concept } from 'components/bread_list';
import { text } from 'stream/consumers';

export default function TopPage() {
  return (
    <>
      <Head>
        <title>Food Koala について</title>
        <script
          src="https://kit.fontawesome.com/acecca202b.js"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <Header />

      <div className={styles.concept}>
        {/* パンくずリスト */}
        <BreadList list={[menu_list, concept]} />

        {/*画像・理念・コアラの島*/}

        <div className="firstBlock">
          <div className={styles.concept_food}>
            <Image
              src="/images/menu/hamburger.food.jpg"
              alt="concept"
              width={400}
              height={250}
              className={styles.concept_food}
            />
          </div>
          <div className={styles.concept_text}>
            <h2>いつまでも「おいしい」に包まれた世界へ</h2>
            <h3>
              FoodKoalaは廃棄寸前の食品専門のテイクアウト予約サービス。
              <br />
              捨てられるはずの「おいしい」を食卓に届け、
              <br />
              「おいしい」に包まれた未来を守ります。
            </h3>
          </div>
          <Image
            src="/images/foodkoala_img2.png"
            alt="concept"
            width={100}
            height={100}
            className={styles.concept_koala}
          />
        </div>

        {/* 中段 */}

        <div className={styles.about}>
          <h2>Food Koalaについて</h2>
          <div className={styles.flex_box}>
            <div className={styles.box}>
              <div className={styles.Img}>
                <img
                  src="/images/concept/waste.concept.png"
                  alt="concept"
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.text}>
                <h3>食品ロス削減に貢献！</h3>
                <p>日本国内における食品ロスは年間520万トン。</p>
                <p>
                  うち、事業系による食品ロスは275万トン。※2020年度
                </p>
                <p>FoodKoalaの利用で、</p>
                <p>食品廃棄物削減の社会貢献をすることができます。</p>
              </div>
            </div>

            <div className={styles.box}>
              <div className={styles.Img}>
                <img
                  src="/images/concept/eat.concept.png"
                  alt="concept"
                  width={100}
                  height={100}
                />
                <img src="" alt="" />
              </div>
              <div className={styles.text}>
                <h3>おいしい店舗たくさん！</h3>
                <p>Food Koalaの登録店舗のジャンルは様々。</p>
                <p>
                  気になっていたお店のお試しにもご利用いただけます。
                </p>
                <p>あなたのお気に入りなお店も見つかるかも！</p>
                <p>おいしく楽しい食事の時間を提供します。</p>
              </div>
            </div>

            <div className={styles.box}>
              <div className={styles.Img}>
                <img
                  src="/images/concept/money.concept.png"
                  alt="concept"
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.text}>
                <h3>環境への配慮でお得に！</h3>
                <p>廃棄予定の食品を販売しているため、</p>
                <p>
                  すべてのメニューが通常よりお得な金額となっております。
                </p>
                <p>さらに、容器の持参で</p>
                <p>地球にやさしくお得な割引も行っています。</p>
              </div>
            </div>
          </div>
        </div>

        {/* 下段 */}

        <div className={styles.howTo}>
          <h2>ご利用方法</h2>
          <div className={styles.flex_box}>
            <div className={styles.box}>
              <div className={styles.Img}>
                <img
                  src="/images/concept/search.concept.png"
                  alt="concept"
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.text}>
                <br />
                <i className="fa-solid fa-1"></i>
                <h3>商品を探す</h3>
              </div>
            </div>

            <div className={styles.box}>
              <div className={styles.Img}>
                <img
                  src="/images/concept/cart.concept.png"
                  alt="concept"
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.text}>
                <br />
                <i className="fa-solid fa-2"></i>
                <h3>商品を予約する</h3>
              </div>
            </div>

            <div className={styles.box}>
              <div className={styles.Img}>
                <img
                  src="/images/concept/get.concept.png"
                  alt="concept"
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.text}>
                <br />
                <i className="fa-solid fa-3"></i>
                <h3>お店で商品を受け取る</h3>
              </div>
            </div>
          </div>
        </div>

        {/* 新規会員登録へ */}
        <div className={styles.start}>
          <h2>\&nbsp;&nbsp;いますぐ始める&nbsp;&nbsp;/</h2>
          <div className={styles.start_flex_box}>
            <div className={styles.start_box}>
              <a href="/user_resister">
                会員登録はこちら&nbsp;
                <i className="fa-solid fa-users"></i>
              </a>
            </div>
            <div className={styles.start_box}>
              <a href="/">
                商品一覧はこちら&nbsp;
                <i className="fa-solid fa-cart-shopping"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
