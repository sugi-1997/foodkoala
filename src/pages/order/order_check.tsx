import Head from 'next/head';
import OrderList from 'components/order_list';
import Option from 'components/option';
import SelectPay from '../../components/select_pay';
import Header from 'components/header';
import Footer from 'components/footer';
import { useRouter } from 'next/router';
import Coupon from 'components/Coupon';
import Auth from 'components/auth';
import styles from 'styles/order_check.module.css';
import BreadList, {
  menu_list,
  order_check,
} from 'components/bread_list';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function OrderCheck() {
  const router = useRouter();
  const [itemId, setItemId] = useState<ItemId[]>([]);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  let code: string;
  let orderedAt: Date;
  let optionData: Options;

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

  //商品の小計を計算
  useEffect(() => {
    const add = cartItems.reduce(
      (sum, i) => sum + i.price * i.count,
      0
    );
    setSubTotal(add);
  }, [cartItems, subTotal]);

  // 1.注文した日付を取得
  const orderDate = async () => {
    const date = new Date();
    orderedAt = date;
    orderCode();
  };

  // 2.ランダムな10文字を生成（注文コード）
  const orderCode = async () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 1; i <= 10; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    code = str;
    postOrders();
  };

  // 3.注文データ(オプション系)をorder-hisotoryテーブルにPOST
  const postOrders = async () => {
    fetch('/api/post_orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: Number(userId),
        order_code: code,
        ordered_at: orderedAt,
        coupon: optionData.coupon,
        subtotal: subTotal,
        total: subTotal - (subTotal * optionData.coupon) / 100,
        payment_method: optionData.payment_method,
        chopstick: optionData.chopstick,
        folk: optionData.folk,
        spoon: optionData.spoon,
        oshibori: optionData.oshibori,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        deleteCarts();
      })
      .catch((error) => console.error(error));
  };

  // 4.cartsテーブルからuser_idが一致するデータを削除
  const deleteCarts = async () => {
    await fetch(`/api/delete_carts?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('cartsテーブルのデータを削除しました');
        router.push('/order/order_completed');
      })
      .catch((error) => console.log(error));
  };

  // 5.order_historyテーブルから最新のcart_idを取得

  // 6.order_itemsテーブルにcartItemsをPOST(cart_idはorder_historyから取得したもの)

  // 7.cart_itemsからuser_idが一致するデータを削除

  // クリックすると、1~7の処理を開始
  const handleOrder = async () => {
    try {
      const res = await fetch(`/api/carts?user_id=eq.${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: Number(userId),
        }),
      });
      const data = await res.json();
      console.log('cartsテーブルから取得したデータ', data[0]);
      optionData = data[0];
      if (data[0].payment_method === null) {
        console.log('payment_methodがnullです');
        return;
      } else {
        orderDate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>注文確認ページ</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, order_check]} />
      <div className={styles.order_check}>
        <div>
          <OrderList />
          <Coupon subTotal={subTotal} />
        </div>
        <div>
          <div>
            <Option />
          </div>
          <div>
            <SelectPay />
            <div className={styles.order_check_button}>
              <button onClick={handleOrder}>注文を確定する</button>
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

type Options = {
  user_id: number;
  coupon: number;
  chopstick: number;
  folk: number;
  spoon: number;
  oshibori: number;
  payment_method: string | null;
};
