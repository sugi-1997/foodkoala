import BreadList, {
  menu_list,
  order_history,
} from 'components/bread_list';
import Footer from 'components/footer';
import Header from 'components/header';
import Auth from 'components/auth';
import Head from 'next/head';
import Link from 'next/link';
import styles from 'styles/order_history.module.css';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

const fetcher = async (resource: string) => {
  const res = await fetch(resource);
  const data: OrderData[] = await res.json();
  return data;
};

export default function OrderHistory() {
  const userId = Cookies.get('user_id');
  const [orderDate, setOrderDate] = useState<Date[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
  const [pageId, setPageId] = useState(0);

  //order_historyテーブルから注文内容を取得
  const { data, error } = useSWR(
    `/api/order_history?user_id=eq.${userId}`,
    fetcher
  );

  //ordersテーブルのcart_idを使用して、order_itemsテーブルからitemのデータを取得
  useEffect(() => {
    async function getOrderItems() {
      if (data === undefined || data === null) {
        return;
      }
      await fetch(
        `/api/order_items?user_id=eq.${userId}&order_id=eq.${data[pageId].cart_id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setOrderItems(data);
        })
        .catch((error) => console.error(error));
    }
    getOrderItems();
  }, [data, userId, pageId]);

  //ordered_atをDate型に変換
  useEffect(() => {
    if (data === undefined || data === null) {
      return;
    }
    const newDateArray = () => {
      const newOrderDate: Date[] = [];
      for (let i = 0; i <= data.length - 1; i++) {
        const orderDate = new Date(data[i].ordered_at);
        newOrderDate.push(orderDate);
      }
      setOrderDate(newOrderDate);
    };
    newDateArray();
  }, [data]);

  if (error) return <div>Error...</div>;
  if (!data || orderDate.length === 0 || orderItems.length === 0)
    return <div>Loading...</div>;

  return (
    <Auth>
      <Head>
        <title>注文履歴</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, order_history]} />
      <div className={styles.h1}>
        <h1>注文履歴一覧</h1>
      </div>
      {data.map((order, index) => (
        <>
          <div className={styles.order_history} key={order.cart_id}>
            <h2>
              {orderDate[index].getFullYear()}年
              {orderDate[index].getMonth() + 1}月
              {orderDate[index].getDate()}日
            </h2>
            <div>
              <dl>
                <dt>ご注文内容</dt>
                {orderItems.map((item, index) => (
                  <div key={item.item_name}>
                    <dd>{item.item_name}</dd>
                  </div>
                ))}
                <dt>お支払い金額</dt>
                <dd>{order.total}円</dd>
                <dt>お支払い方法</dt>
                <dd>{order.payment_method}</dd>
              </dl>
              <div className={styles.link}>
                <Link href={'注文詳細'}>詳細を見る</Link>
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <input
              type="button"
              value={index + 1}
              onClick={(e) => setPageId(index)}
            />
          </div>
        </>
      ))}
      <Footer />
    </Auth>
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

type OrderItems = {
  order_id: number;
  item_name: string;
  price: number;
  shop_id: number;
  quantitiy: number;
};
