import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Area from 'components/area';
import Genre from 'components/genre';
import useSWR, { useSWRConfig } from 'swr';
import { SyntheticEvent, useState } from 'react';
import styles from 'styles/Menu_list.module.css';
import ShopName from 'components/shop_name';

const fetcher = (resource: string) =>
  fetch(resource).then((res) => res.json());

export default function MenuList({ onClick, id }: any) {
  const [genreId, setGenreId] = useState<string>('gt.0');
  const [areaId, setAreaId] = useState<string>('gt.0');
  const [itemId, setItemId] = useState<string>('gt.0');
  const [count, setCount] = useState(0);

  const { data, error } = useSWR(
    `/api/menu?genreId=${genreId}&areaId=${areaId}&id=${itemId}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );
  const { mutate } = useSWRConfig();

  if (error) return <div>エラーです</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  const handleGenreClick = (clickedId: any) => {
    setAreaId('gt.0');
    setGenreId(`eq.${clickedId}`);
    console.log(clickedId);
    mutate(
      `/api/menu?genreId=${genreId}&areaId=${areaId}&id=${itemId}`
    );
  };

  const handleAreaClick = (clickedId: any) => {
    setGenreId('gt.0');
    setAreaId(`eq.${clickedId}`);
    console.log(clickedId);
    mutate(
      `/api/menu?areaId=${areaId}&genreId=${genreId}&id=${itemId}`
    );
  };

  async function cartSubmit(menuId: any) {
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
      <Head>
        <title>FoodKoala トップ</title>
      </Head>
      <main>
        <Genre
          onClick={(e: SyntheticEvent) =>
            handleGenreClick(e.target.id)
          }
        />
        <Area
          onClick={(e: SyntheticEvent) =>
            handleAreaClick(e.target.id)
          }
        />
        <div className={styles.body}>
          {data.map((menu: Item) => (
            <div key={menu.id} className={styles.menu}>
              <Link href={`/item/${menu.id}`}>
                <div className={styles.menu_img}>
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
      </main>
    </>
  );
}

type Item = {
  id: number;
  name: string;
  image_url: string;
  price: number;
  explain: string;
  genre_id: number;
  area_id: number;
  shop_id: number;
};
