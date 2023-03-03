import Head from 'next/head';
import OrderList from '../../components/order_list';
import Option from '../../components/option';
import SelectPay from '../../components/select_pay';
import Header from 'components/header';
import Footer from 'components/footer';
import Router, { useRouter } from 'next/router';
import styles from 'styles/order_check.module.css';
import BreadList, {
  menu_list,
  order_check,
} from 'components/bread_list';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function OrderCheck() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [itemId, setItemId] = useState<ItemId[]>([]);
  const [orderedAt, setorderedAt] = useState<Date>();
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [orderItems, setorderItems] = useState<CartItems[]>([]);
  const userId = Cookies.get('user_id');

  //cart_itemsテーブルからデータを取得
  useEffect(() => {
    async function getItemId() {
      await fetch('/api/get_cart_items')
        .then((res) => res.json())
        .then((data) => {
          setItemId(data);
        });
    }
    getItemId();
  }, []);

  //item_idが一致する商品のデータを取得
  useEffect(() => {
    async function itemData() {
      const newCartItems: CartItems[] = [];
      for (let i = 0; i <= itemId.length - 1; i++) {
        await fetch(
          `/api/menu?genre_id=gt.0&area_id=gt.0&id=eq.${itemId[i].item_id}`
        )
          .then((res) => res.json())
          .then((data) => {
            newCartItems.push({ ...data[0], count: 1 });
          });
      }
      setCartItems(newCartItems);
    }
    itemData();
  }, [itemId]);

  //itemId配列とcartItems配列を結合
  const orderItemsArray = () => {
    //itemId配列からcart_idとcountのみを取得した新しい配列を作成
    const newItemId = itemId.map(({ cart_id, count }) => ({
      cart_id,
      count,
    }));
    //cartItems配列とnewItemId配列を結合する
    const newOrderItems = cartItems.map((item, index) => {
      return Object.assign({}, item, newItemId[index]);
    });
    setorderItems(newOrderItems);
  };

  //注文した日付を取得
  const orderDate = () => {
    const date = new Date();
    setorderedAt(date);
  };

  //ランダムな10文字を生成（注文コード）
  const orderCode = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 1; i <= 10; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(str);
  };

  //注文したアイテムのデータを、order_itemsテーブルにPOSTする
  const postOrderItems = () => {
    orderItems.map((orderItem) => {
      fetch('/api/order_items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderItem.cart_id,
          item_name: orderItem.name,
          item_price: orderItem.price,
          quantity: orderItem.count,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    });
  };

  //注文データをordersテーブルにPOST
  const postOrders = () => {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart_id: userId,
        user_id: userId,
        order_code: code,
        ordered_at: orderedAt,
        total: '',
        payment_method: '',
      }),
    });
  };

  //注文ボタンを押した時の遷移
  const handleClick = async () => {
    orderItemsArray();
    orderCode();
    orderDate();
    postOrderItems();
    postOrders();
    router.push('/order/order_completed');
  };

  return (
    <>
      <Head>
        <title>注文確認</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, order_check]} />
      <div className={styles.order_check}>
        <div>
          <OrderList />
        </div>
        <div>
          <div>
            <Option />
          </div>
          <div>
            <SelectPay />
            <div className={styles.order_check_button}>
              <button onClick={handleClick}>注文を確定する</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

type ItemId = {
  id: number;
  item_id: number;
  cart_id: number;
  count: number;
};

type CartItems = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  genre_id: number;
  shop_id: number;
  area_id: number;
  explain: string;
  count: number;
  cart_id: number;
};
