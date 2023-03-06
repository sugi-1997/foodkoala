import styles from '../styles/Shop.module.css';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const fetcher = (resource: string, init: object) =>
  fetch(resource, init).then((res) => res.json());

export default function ShopMenu({ id }: { id: number }) {
  const [count, setCount] = useState(0);
  const { data, error } = useSWR(
    `http://localhost:8000/items?shop_id=eq.${id}`,
    fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データを取得できませんでした</div>;

  async function cartSubmit(menuId) {
    try {
      console.log(menuId);
      const response = await fetch('/api/post_cart_items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart_id: 1,
          item_id: Number(menuId),
          count: count + 1,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className={styles.shop_menu}>
        {data.map((menu: Menu) => (
          <div key={menu.id}>
            <Link href={`/item/${menu.id}`}>
              <div className={styles.shop_detail_menuImg}>
                <Image
                  src={menu.image_url}
                  alt="メニュー画像"
                  width={150}
                  height={150}
                />
              </div>
              <div className={styles.shop_detail_menuName}>
                <p>{menu.name}...</p>
              </div>
            </Link>
            <div className={styles.shop_detail_menuPrice}>
              <p>{menu.price}円</p>
            </div>
            <button
              data-menu-id={menu.id}
              onClick={(e) =>
                cartSubmit(e.target.getAttribute('data-menu-id'))
              }
            >
              注文リストに追加
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

type Menu = {
  id: number;
  image_url: string;
  name: string;
  price: number;
};
