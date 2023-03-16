import styles from 'styles/order_check.module.css';
import useSWR, { useSWRConfig } from 'swr';
import { useState, useEffect } from 'react';
import type { CartItem } from 'types/cart_item';
import type { CurrentCartItems } from 'types/current_cart_items';
import { Fetcher } from 'lib/Fetcher';
import Image from 'next/image';

export default function OrderList() {
  const [cartItems, setCartItems] = useState<CurrentCartItems[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const { mutate } = useSWRConfig();
  //cart_itemsテーブルからデータを取得
  const { data, error } = useSWR('/api/get_cart_items', Fetcher);
  let itemId: CartItem[] = data;

  //item_idが一致する商品のデータを取得
  useEffect(() => {
    if (!data) {
      return;
    }
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
  }, [data, itemId]);

  //商品の小計を計算
  useEffect(() => {
    const add = cartItems.reduce(
      (sum, i) => sum + i.price * i.count,
      0
    );
    setSubTotal(add);
  }, [cartItems, subTotal]);

  //商品の削除
  const handleDelete = async (clickedId: string) => {
    await fetch(`/api/delete_cart_items?item_id=eq.${clickedId}`, {
      method: 'DELETE',
      body: JSON.stringify({
        item_id: Number(clickedId),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    mutate('/api/get_cart_items');
  };

  if (error) <div>Error...</div>;
  if (!data) <div>Loading...</div>;

  if (cartItems.length === 0) {
    return (
      <>
        <div>
          <h1>注文リスト</h1>
        </div>
        <div className={styles.order_list}>
          <br />
          <div className={styles.order_list_sub}>
            カートに商品はありません
          </div>
          <br />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.h1}>
        <h1>注文リスト</h1>
      </div>
      <div className={styles.order_list}>
        <div>
          {cartItems.map((item, index) => (
            <dl key={item.id}>
              <dt>{item.name}</dt>
              <dd>
                <Image
                  src={item.image_url}
                  alt="商品画像"
                  width={150}
                  height={150}
                />
              </dd>
              <dd>
                <select
                  name="itemCount"
                  id={`itemCount-${index}`}
                  onChange={async (e) => {
                    const selectedCount = e.target.value;
                    const newCartItems = [...cartItems];
                    newCartItems[index].count =
                      parseInt(selectedCount);
                    setCartItems(newCartItems);
                    await fetch(`/api/patch_cart_items`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        item_id: Number(item.id),
                        count: Number(selectedCount),
                      }),
                    });
                  }}
                  value={item.count}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
                個
              </dd>
              <dd>{item.price * item.count}円</dd>
              <dd>
                <button
                  className={styles.delete_button}
                  id={`${item.id}`}
                  onClick={(e) => handleDelete(e.currentTarget.id)}
                >
                  削除
                </button>
              </dd>
            </dl>
          ))}
          <p>小計：{subTotal}円</p>
        </div>
      </div>
    </>
  );
}
