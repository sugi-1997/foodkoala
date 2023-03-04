import styles from 'styles/order_check.module.css';
import useSWR, { useSWRConfig } from 'swr';
import { useState, useEffect } from 'react';
import CartItems from 'pages/api/delete_cart_items';

export default function OrderList() {
  const fetcher = (resource: string, init: object) => {
    fetch(resource, init)
      .then((res) => res.json())
      .then((data) => setItemId(data));
  };
  const [itemId, setItemId] = useState<ItemId[]>([]);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [subTotal, setSubTotal] = useState(0);

  const { mutate } = useSWRConfig();
  const { data, error } = useSWR('/api/get_cart_items', fetcher);

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
                <select
                  name="itemCount"
                  id={`itemCount-${index}`}
                  onChange={(e) => {
                    const selectedCount = e.target.value;
                    const newCartItems = [...cartItems];
                    newCartItems[index].count =
                      parseInt(selectedCount);
                    setCartItems(newCartItems);
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
                  id={`${item.id}`}
                  onClick={(e) => handleDelete(e.target.id)}
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
