import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Option from 'components/option';
import SelectPay from 'components/select_pay';
import Header from 'components/header';
import Footer from 'components/footer';
import Coupon from 'components/Coupon';
import BreadList, {
  menu_list,
  order_check,
} from 'components/bread_list';
import type { CartItem } from 'types/cart_item';
import type { CurrentCartItems } from 'types/current_cart_items';
import type { Options } from 'types/options';
import styles from 'styles/order_check.module.css';
import Cookies from 'js-cookie';

export default function OrderCheck() {
  const router = useRouter();
  const [itemId, setItemId] = useState<CartItem[]>([]);
  const [cartItems, setCartItems] = useState<CurrentCartItems[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [errorAlert, setErrorAlert] = useState('ok');
  let optionData: Options;
  const userId = Cookies.get('user_id');

  //cart_itemsテーブルからデータを取得
  useEffect(() => {
    async function getItemId() {
      if (userId === null || userId === undefined) {
        router.push('/login');
      } else {
        await fetch('/api/get_cart_items')
          .then((res) => res.json())
          .then((data) => {
            setItemId(data);
          });
      }
    }
    getItemId();
  }, [router]);

  //item_idが一致する商品のデータを取得
  useEffect(() => {
    async function itemData() {
      const newCartItems: CurrentCartItems[] = [];
      for (let i = 0; i <= itemId.length - 1; i++) {
        await fetch(
          `/api/menu?genre_id=gt.0&area_id=gt.0&id=eq.${itemId[i].item_id}`
        )
          .then((res) => res.json())
          .then((data) => {
            newCartItems.push({ ...data[0], count: itemId[i].count });
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
  let orderedAt: Date;
  const orderDate = async () => {
    const date = new Date();
    orderedAt = date;
    orderCode();
  };

  // 2.ランダムな10文字を生成（注文コード）
  let code: string;
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
        discount: optionData.discount,
        couponcode: optionData.couponcode,
        subtotal: subTotal,
        total: subTotal - (subTotal * optionData.discount) / 100,
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
        deleteCoupon();
      })
      .catch((error) => console.error(error));
  };

  //使用したクーポンの削除
  const deleteCoupon = async () => {
    await fetch(
      `/api/delete_coupon?user_id=eq.${userId}&couponcode=eq.${optionData.couponcode}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('使用したクーポンを削除しました');
        addThanksCoupon();
      })
      .catch((error) => console.error(error));
  };

  //容器返却を選択した場合、thanks couponを取得
  let thanks: string;
  const addThanksCoupon = async () => {
    if (thanks === 'true') {
      await fetch(`/api/post_coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: Number(userId),
          discount: 10,
          couponcode: 'thanks coupon',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('thanksクーポンをPOSTしました');
          deleteCarts();
        });
    } else {
      deleteCarts();
    }
  };

  // 4.cartsテーブルからuser_idが一致するデータを削除
  const deleteCarts = async () => {
    await fetch(`/api/delete_carts?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('cartsテーブルのデータを削除しました');
        getCartId();
      })
      .catch((error) => console.log(error));
  };

  // 5.order_historyテーブルから最新のcart_idを取得
  let latestCartId: number;
  const getCartId = async () => {
    await fetch(`/api/order_history?user_id=eq.${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('order_history', data);
        latestCartId = data[data.length - 1].cart_id;
        console.log('latestCartId', latestCartId);
        postOrderItems();
      });
  };

  // 6.order_itemsテーブルにcartItemsをPOST(cart_idはorder_historyから取得したもの)
  const postOrderItems = () => {
    cartItems.map((item) => {
      fetch('/api/post_order_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: latestCartId,
          item_name: item.name,
          price: item.price,
          shop_id: item.shop_id,
          quantitiy: item.count,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('order-itemsテーブルにデータをPOSTしました');
        });
    });
    deleteCartItems();
  };

  // 7.cart_itemsからuser_idが一致するデータを削除
  const deleteCartItems = async () => {
    await fetch(`/api/delete_all_cart_items`)
      .then((res) => res.json())
      .then((data) => {
        console.log('cart_itemsからデータを削除しました');
        router.push('/order/order_completed');
      })
      .catch((error) => console.error(error));
  };

  // クリックすると、1~7の処理を開始
  const handleOrder = async () => {
    try {
      const res = await fetch(`/api/carts?user_id=eq.${userId}`);
      const data = await res.json();
      console.log('cartsテーブルから取得したデータ', data[0]);
      optionData = data[0];
      if (data[0].payment_method === null) {
        console.log('payment_methodがnullです');
        setErrorAlert('alert');
        return;
      } else {
        setErrorAlert('ok');
        orderDate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (itemId.length === 0 || cartItems.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>注文確認ページ</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, order_check]} />
      <div className={styles.order_check}>
        <div className={styles.order_check_float1}>
          <>
            <div className={styles.h1}>
              <h1 className={styles.order_list_h1}>注文リスト</h1>
            </div>
            <div className={styles.order_list}>
              <div>
                {cartItems.map((item, index) => (
                  <div key={index}>
                    <dl>
                      <dt>{item.name}</dt>
                      <dd>
                        <Image
                          src={item.image_url}
                          alt="商品画像"
                          width={100}
                          height={100}
                        />
                      </dd>
                      <dd>{item.count}個</dd>
                      <dd>{item.price * item.count}円</dd>
                    </dl>
                  </div>
                ))}
                <p>小計：{subTotal}円</p>
              </div>
            </div>
          </>
          <SelectPay />
          <p className={styles[errorAlert]}>
            ※お支払い方法を選択してください
          </p>
        </div>
        <div className={styles.order_check_float2}>
          <Option />
          <Coupon
            subTotal={subTotal}
            onClick={(e) => {
              console.log(e.currentTarget.id);
              thanks = e.currentTarget.id;
            }}
          />
          <div>
            <button
              onClick={handleOrder}
              className={styles.order_check_button}
            >
              注文確定
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
