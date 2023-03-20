import type { Options } from 'types/options';
import type { CurrentCartItems } from 'types/current_cart_items';

export default function OrderCompleted(
  userId: string,
  cartItems: CurrentCartItems[],
  subTotal: number,
  optionData: Options,
  thanks: string
) {
  // 9.cart_itemsからuser_idが一致するデータを削除
  const deleteCartItems = async () => {
    await fetch(`/api/delete_all_cart_items`)
      .then((res) => res.json())
      .then((data) => {
        console.log('cart_itemsからデータを削除しました');
      })
      .catch((error) => console.error(error));
  };

  // 8.order_itemsテーブルにcartItemsをPOST(cart_idはorder_historyから取得したもの)
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

  // 7.order_historyテーブルから最新のcart_idを取得
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

  // 6.cartsテーブルからuser_idが一致するデータを削除
  const deleteCarts = async () => {
    await fetch(`/api/delete_carts?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('cartsテーブルのデータを削除しました');
        getCartId();
      })
      .catch((error) => console.log(error));
  };

  // 5.容器返却を選択した場合、thanks couponを取得
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

  // 4.使用したクーポンの削除
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

  // 1.注文した日付を取得
  let orderedAt: Date;
  const orderDate = async () => {
    const date = new Date();
    orderedAt = date;
    orderCode();
  };

  orderDate();

  return <></>;
}
