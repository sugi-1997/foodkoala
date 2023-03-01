import styles from 'styles/order_check.module.css';
import useSWR from 'swr';
import { useState, useEffect } from 'react';

const fetcher = (resource: string, init: object) => {
  fetch(resource, init).then((res) => res.json());
};

export default function OrderList() {
  const [itemId, setItemId] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function getItemId() {
      await fetch('/api/get_cart_items')
        .then((res) => res.json())
        .then((data) => {
          setItemId(data);
        });
    }
    async function itemData() {
      const newCartItems = [];
      for (let i = 0; i <= itemId.length - 1; i++) {
        await fetch(
          `/api/menu?genre_id=gt.0&area_id=gt.0&id=eq.${itemId[i].item_id}`
        )
          .then((res) => res.json())
          .then((data) => {
            newCartItems.push(data[0]);
          });
      }
      setCartItems(newCartItems);
    }
    getItemId();
    itemData();
  }, [itemId]);

  if (cartItems.length === 0) {
    return (
      <>
        <div className={styles.h1}>
          <h1>注文リスト</h1>
        </div>
        <div className={styles.order_list}>
          <br />
          <div>カートに商品はありません</div>
          <br />
          <p>小計: 0円</p>
          <p>合計: 0円</p>
        </div>
      </>
    );
  }

  const count = 1;

  function subTotal() {}

  return (
    <>
      <div className={styles.h1}>
        <h1>注文リスト</h1>
      </div>
      <div className={styles.order_list}>
        <div>
          {cartItems.map((item) => (
            <dl key={item.id}>
              <dt>{item.name}</dt>
              <dd>{count}個</dd>
              <dd>{item.price}円</dd>
              <dd>
                <button
                  onClick={(e) => {
                    '削除';
                  }}
                >
                  削除
                </button>
              </dd>
            </dl>
          ))}
          <p>小計：{'合計金額'}円</p>
        </div>
        <div className={styles.order_list_details}>
          <dl>
            <dt>クーポン</dt>
            <dd>
              <input type="text" />
            </dd>
            <dt>容器返却</dt>
            <dd>
              <input
                type="radio"
                id="container_true"
                name="container"
              />
              する
            </dd>
            <dd>
              <input
                type="radio"
                id="container_false"
                name="container"
              />
              しない
            </dd>
          </dl>
          <p>値引き合計：{'クーポン金額'}円</p>
        </div>
        <div>
          <p>合計：{'合計金額-クーポン金額'}円</p>
        </div>
      </div>
    </>
  );
}
