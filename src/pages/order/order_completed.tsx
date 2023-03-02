import Head from 'next/head';
import Link from 'next/link';
import styles from 'styles/order_completed.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function OrderCompleted() {
  const [code, setCode] = useState('');
  const orderCode = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 1; i <= 10; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(str);
  };

  useEffect(() => {
    orderCode();
  }, []);

  return (
    <>
      <Head>
        <title>注文完了画面</title>
      </Head>
      <div className={styles.position}>
        <h1>ご注文ありがとうございました！</h1>
        <h2>
          ご注文コード: <span>{code}</span>
        </h2>
        <div className={styles.order_complete_border}>
          <div>
            <p className={styles.order_complete_group}>ご注文内容</p>
            <p className={styles.order_complete_item}>
              メニュー1(手打ち)
            </p>
          </div>

          <div>
            <p className={styles.order_complete_group}>
              お支払い金額
            </p>
            <p className={styles.order_complete_item}>
              2000円(手打ち)
            </p>
          </div>

          <div>
            <p className={styles.order_complete_group}>
              お支払い方法
            </p>
            <p className={styles.order_complete_item}>
              クレジットカード(手打ち)
            </p>
          </div>
        </div>

        <div>
          <Link href={'#'}>詳細を見る</Link>
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
          <Link href={'/'}>別のメニューを注文する</Link>
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
