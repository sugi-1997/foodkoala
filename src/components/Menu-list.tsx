import { SyntheticEvent, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Area from 'components/area';
import Genre from 'components/genre';
import { Fetcher } from 'lib/Fetcher';
import { MenuName } from 'lib/MenuName';
import type { Menu } from 'types/menu';
import styles from 'styles/Menu_list.module.css';

export default function MenuList() {
  const [genreId, setGenreId] = useState<string>('gt.0');
  const [areaId, setAreaId] = useState<string>('gt.0');
  const [count, setCount] = useState(1);
  const itemId = 'gt.0';

  const { data, error } = useSWR(
    `/api/menu?genreId=${genreId}&areaId=${areaId}&id=${itemId}`,
    Fetcher,
    {
      revalidateOnMount: true,
    }
  );
  const { mutate } = useSWRConfig();

  if (error) return <div>エラーです</div>;
  if (!data) return <div>Loading...</div>;

  const handleGenreClick = (clickedId: any) => {
    setAreaId('gt.0');
    setGenreId(`eq.${clickedId}`);
    mutate(
      `/api/menu?genreId=${genreId}&areaId=${areaId}&id=${itemId}`
    );
  };

  const handleAreaClick = (clickedId: any) => {
    setGenreId('gt.0');
    setAreaId(`eq.${clickedId}`);
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
      <Head>
        <title>FoodKoala トップ</title>
      </Head>
      <main className={styles.topPage}>
        <div className={styles.genre_area}>
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
        </div>
        <h2 className={styles.h2}>--- Menu ---</h2>
        <div className={styles.all_menu}>
          {data.map((menu: Menu) => (
            <div key={menu.id} className={styles.menu}>
              <Link
                href={`/item/${menu.id}`}
                className={styles.menu_link}
              >
                <div className={styles.menu_img}>
                  <Image
                    src={menu.image_url}
                    alt="メニュー画像"
                    width={250}
                    height={250}
                  />
                </div>
                <div className={styles.shop_detail_menuName}>
                  {MenuName(menu)}
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
