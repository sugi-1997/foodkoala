import Footer from '@/components/footer';
import Header from '@/components/header';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/order_history.module.css';

export default function OrderHistory() {
  return (
    <>
      <Head>
        <title>注文履歴</title>
      </Head>
      <Header />
      <div className={styles.h1}>
        <h1>注文履歴一覧</h1>
      </div>
      <div className={styles.order_history}>
        <h2>{'12月9日'}</h2>
        <dl>
          <dt>ご注文内容</dt>
          <dd>{'メニュー1'}</dd>
          <dd>{'メニュー2'}</dd>
          <dd>{'メニュー3'}</dd>
          <dt>お支払い金額</dt>
          <dd>{'2250円'}</dd>
          <dt>お支払い方法</dt>
          <dd>{'クレジットカード'}</dd>
        </dl>
        <div className={styles.link}>
          <Link href={'注文詳細'}>詳細を見る</Link>
        </div>
      </div>
      <div className={styles.buttons}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
      <Footer />
    </>
  );
}
