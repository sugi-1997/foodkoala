import styles from '../styles/Shop.module.css';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';

const fetcher = (resource: string, init: object) =>
  fetch(resource, init).then((res) => res.json());

export default function ShopMenu({ id }) {
  const { data, error } = useSWR(
    `http://localhost:8000/items?shop_id=eq.${id}`,
    fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データを取得できませんでした</div>;

  type Menu = {
    id: number;
    image_url: string;
    name: string;
    price: number;
  };

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
                <p>{menu.name}</p>
              </div>
            </Link>
            <div className={styles.shop_detail_menuPrice}>
              <p>{menu.price}円</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
