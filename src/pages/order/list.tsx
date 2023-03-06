import Head from 'next/head';
import Header from 'components/header';
import BreadList, {
  menu_list,
  order_check,
  order_list,
} from 'components/bread_list';
import OrderList from 'components/order_list';
import Footer from 'components/footer';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from 'styles/order_list.module.css';

export default function Orderlist() {
  const userId = Cookies.get('user_id');
  const router = useRouter();
  const [itemId, setItemId] = useState<ItemId[]>([]);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

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

  //cookieの有無を確認し、ログインしていればcartItemsのデータをorder_itemsにPOST
  const handleClick = async () => {
    if (userId === undefined || userId === null) {
      router.push('/loginPage');
    } else {
      router.push('/order/order_check');
    }
  };

  return (
    <>
      <Head>
        <title>注文リスト</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, order_list]} />
      <div className={styles.order_list}>
        <div>
          <OrderList />
          <button
            className={styles.transition_button}
            onClick={handleClick}
          >
            購入画面へ
          </button>
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
};
