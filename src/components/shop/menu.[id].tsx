import styles from '../../styles/Shop.module.css';
import useSWR from 'swr';
import Image from 'next/image';
import { Menu } from 'types/shops';

const fetcher = (resource: string, init: object) =>
  fetch(resource, init).then((res) => res.json());

export default function shopMenuList({ id }: { id: number }) {
  const { data, error } = useSWR(
    `http://localhost:8000/items?shop_id=eq.${id}`,
    fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データを取得できませんでした</div>;

  const menus = data.slice(0, 2);

  return (
    <>
      <div className={styles.shop_menu}>
        {menus.map((menu: Menu) => (
          <div key={menu.id}>
            <div className={styles.shop_detail_menuImg}>
              <Image
                src={menu.image_url}
                alt="メニュー画像"
                width={150}
                height={150}
              />
            </div>
            <div className={styles.shop_detail_menuName}>
              <p>{menu.name}</p>
            </div>
            <div className={styles.shop_detail_menuPrice}>
              <p>{menu.price}円</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
