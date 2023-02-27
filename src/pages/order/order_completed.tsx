import Head from 'next/head';
import Link from 'next/link';
import styles from "../styles/order_completed.module.css"
import Image from 'next/image';

export default function OrderCompleted() {
  return (
    <>
      <Head>
        <title>注文完了</title>
      </Head>
      <div className={styles.position}>
      <h1>ご注文ありがとうございました！</h1>
      <h2>ご注文コード {'*****'}</h2>

{/*本当はテーブルで展開させたい(下にてコメントアウト)がうまくいかないため便宜上、divタグで陳列
  メニュー数が注文によって増減するため、それに耐えうるレイアウトを検討*/}
      
      <div className={styles.order_complete_border}>
      <div>
        <p className={styles.order_complete_group}>ご注文内容</p>
        <p className={styles.order_complete_item}>メニュー1(手打ち)</p>
      </div>

      <div>
        <p className={styles.order_complete_group}>お支払い金額</p>
        <p className={styles.order_complete_item}>2000円(手打ち)</p>
      </div>

      <div>
        <p className={styles.order_complete_group}>お支払い方法</p>
        <p className={styles.order_complete_item}>クレジットカード(手打ち)</p>
      </div>
      </div>
            
        <div>
        <Link href={'注文詳細'}>詳細を見る</Link>
        <p>お受け取り可能時間まで {'time'}</p>
        <div>
          <Image
          /*className*/ 
          src="/これから"
          alt="GoogleMap"
          width={500}
          height={500}
          priority
        />
        </div>  
        <Link href={'商品一覧'}>別のメニューを注文する</Link>
      </div>
      </div>
    </>
  );
}


/*
    <div>     
        <dl>
          <dt>ご注文内容</dt>
          <dd>{'メニュー1'}</dd>
          
        </dl>

        <dl>
          <dt>お支払い金額</dt>
          <dd>{'2250円'}</dd>
        </dl>
        <dl>
          <dt>お支払い方法</dt>
          <dd>{'クレジットカード'}</dd>
        </dl>
        </div>
*/ 