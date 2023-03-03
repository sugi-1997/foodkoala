import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/concept.module.css';
import BreadList, { menu_list, concept } from 'components/bread_list';

export default function TopPage() {
  return (
    <>
      <Head>
        <title>Food Koala について</title>
      </Head>
      
      <Header />
      
      <div className={styles.concept}>
      
      {/* パンくずリスト */}
      <BreadList list={[menu_list, concept]} />
      

      {/*画像・理念・コアラの島*/}

      <div className='firstBlock'>
      <div className={styles.concept_food}>
      <Image
          src="/images/menu/hamburger.food.jpg"
          alt="concept"
          width={400}
          height={250}
          className={styles.concept_food}
        />
        </div>
        {/*<div className={styles.concept_text}>
        <h2>いつまでも「おいしい」に包まれた世界へ</h2>
        <h3>
          foodKoalaは廃棄寸前の食品専門のテイクアウト予約サービス。
          <br />
          捨てられるはずの「おいしい」を食卓に届け、
          <br />
          「おいしい」に包まれた未来を守ります。
        </h3>
  </div> */}
        
        <div>
        {/* <Image
          src="/images/foodkoala_img2.PNG"
          alt="concept"
          width={100}
          height={100}
          className={styles.concept_koala}
        /> */}
        </div>
        </div>
        

        {/* 中段 */}
        
        <div className={styles.flex_box}>
       
        <div className={styles.box}>
        <div className={styles.Img}>
        <Image
          src="/images/foodkoala_img2.PNG"
          alt="concept"
          width={100}
          height={100}
        />
        </div>
        <div className={styles.text}>
          <h3>ごみ</h3>
          <p>
            日本国内における食品ロスは年間600万トンにのぼります。
            平成30年度中でも、外食産業による食品ロスは全体の16%を占め、
            約81万トンもの食品廃棄物を排出しています。
            FoodKoalaの利用で、食品廃棄物削減の社会貢献をすることができます。
          </p>
        </div>
        </div>

        <div className={styles.box}>
        <div className={styles.Img}>
        <Image
          src="/images/foodkoala_img2.PNG"
          alt="concept"
          width={100}
          height={100}
        />
        </div>
        <div className={styles.text}>
          <h3>おいしいお店</h3>
          <p>Food Koalaの登録店舗のジャンルは様々。
             気になっていたお店のお試しにもご利用いただけます。
             あなたのお気に入りなお店も見つかるかも！
             おいしく楽しい食事の時間を提供します。
          </p>
        </div>
        </div>

        <div className={styles.box}>
        <div className={styles.Img}>
        <Image
          src="/images/foodkoala_img2.PNG"
          alt="concept"
          width={100}
          height={100}
        />
        </div>
        <div className={styles.text}>
          <h3>お得</h3>
          <p>廃棄予定の食品を販売しているため、すべてのメニューが通常よりお得な金額となっております。
             さらに、容器の持参で地球にやさしくお得な割引も行っています。
          </p>
        </div>
        </div>
        </div>

          {/* 下段 */}
        
      <div className={styles.flex_box}>
       
       <div className={styles.box}>
       <div className={styles.Img}>
       <Image
         src="/images/foodkoala_img2.PNG"
         alt="concept"
         width={100}
         height={100}
       />
       </div>
       <div className={styles.text}>
         <h3>商品を探す</h3>
       </div>
       </div>

       <div className={styles.box}>
       <div className={styles.Img}>
       <Image
         src="/images/foodkoala_img2.PNG"
         alt="concept"
         width={100}
         height={100}
       />
       </div>
       <div className={styles.text}>
         <h3>商品を予約する</h3>
       </div>
       </div>

       <div className={styles.box}>
       <div className={styles.Img}>
       <Image
         src="/images/foodkoala_img2.PNG"
         alt="concept"
         width={100}
         height={100}
       />
       </div>
       <div className={styles.text}>
         <h3>お店で行って商品を受け取る</h3>
       </div>
       </div>
       </div>








          
        
        {/* 新規会員登録へ */}
        <div className={styles.concept_goToUserResister}>
          <Link href="/userResisterPage">
            <input type="button" value='新規会員登録'/>
            </Link>
        </div>
        
        </div>
      <Footer />
    </>
  );
}
