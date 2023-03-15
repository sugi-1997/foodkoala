import styles from '../styles/Shop_list.module.css';
import useSWR from 'swr';
import Image from 'next/image';
import type { Menu } from 'types/shops';
import { Fetcher } from 'lib/Fetcher';
import { MenuName } from 'lib/MenuName';

export default function ShopMenu({ id }: { id: number }) {
  let count = 1;
  const { data, error } = useSWR(
    `/api/menu_top2?shop_id=eq.${id}&genre_id=gt.0&area_id=gt.0`,
    Fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データを取得できませんでした</div>;

  const menus = data.slice(0, 2);

  async function cartSubmit(menuId: any) {
    try {
      console.log(menuId);
      const response = await fetch('/api/post_cart_items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart_id: 1,
          item_id: Number(menuId),
          count: count,
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
      <div className={styles.shop_menu_list}>
        {menus.map((menu: Menu) => (
          <div key={menu.id} className={styles.shop_menu}>
            <a href={`/item/${menu.id}`}>
              <div className={styles.shop_list_menuImg}>
                <Image
                  src={menu.image_url}
                  alt="メニュー画像"
                  width={150}
                  height={150}
                />
              </div>
              <div className={styles.shop_list_menuName}>
                {MenuName(menu)}
              </div>
            </a>
            <div className={styles.shop_list_menuPrice}>
              <p>{menu.price}円</p>
            </div>
            <button
              onClick={(e) => {
                console.log(menu.id);
                cartSubmit(menu.id);
              }}
            >
              <span>注文リストに追加</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
