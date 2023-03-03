import Head from 'next/head';
import Link from 'next/link';
import styles from 'styles/order_completed.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useSWR from 'swr';

const fetcher = async (resource: string) => {
  const res = await fetch(resource);
  const data = await res.json();
  return data;
};

export default function OrderCompleted() {
  const userId = Cookies.get('user_id');

  const { data, error } = useSWR(
    `/api/orders?user_id=eq.${userId}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>Loading...</div>;

  //合計金額を計算
  const calcCoupon = (data.subtotal * data.coupon) / 100;
  const Total = data.subtotal - calcCoupon;

  return (
    <>
      <Head>
        <title>注文完了画面</title>
      </Head>
      <div className={styles.position}>
        <h1>ご注文ありがとうございました！</h1>
        <h2>
          ご注文コード: <span>{data[0].order_code}</span>
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
              小計（税込）
            </p>
            <p className={styles.order_complete_item}>
              {data[0].subtotal}円
            </p>
          </div>

          <div>
            <p className={styles.order_complete_group}>クーポン</p>
            <p className={styles.order_complete_item}>
              -{data[0].coupon}%
            </p>
          </div>

          <div>
            <p className={styles.order_complete_group}>
              合計（税込）
            </p>
            <p className={styles.order_complete_item}>
              {data[0].total}円
            </p>
          </div>

          <div>
            <p className={styles.order_complete_group}>
              お支払い方法
            </p>
            <p className={styles.order_complete_item}>
              {data[0].payment_method}
            </p>
          </div>
        </div>

        <div>
          <Link href={'#'}>詳細を見る</Link>
          <p>お受け取り可能時間まで {'time'}</p>
          <div>
            <Image
              /*className*/
              src="/images/map.png"
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

type OrderData = {
  cart_id: number;
  user_id: number;
  order_code: string;
  ordered_at: Date;
  coupon: number;
  subtotal: number;
  total: number;
  payment_method: string;
  chopstick: number;
  folk: number;
  spoon: number;
  oshibori: number;
};
