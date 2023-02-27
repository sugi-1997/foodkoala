import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Area from 'components/area';
import Genre from 'components/genre';
import useSWR, { useSWRConfig } from 'swr';
import { useState } from 'react';
import styles from '../styles/menu_link.module.css';

const fetcher = (resource: string) =>
  fetch(resource).then((res) => res.json());

export default function MenuList({ onClick, id }) {
  const [genreId, setGenreId] = useState<string>('gt.0');
  const { data, error } = useSWR(
    `/api/menu?genreId=${genreId}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );
  const { mutate } = useSWRConfig();

  if (error) return <div>エラーです</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  const handleClick = (clickedId) => {
    setGenreId(`eq.${clickedId}`);
    console.log(clickedId);
    mutate(`/api/menu?genreId=${genreId}`);
  };

  return (
    <>
      <Head>
        <title>商品一覧ページ</title>
      </Head>
      <main>
        <Genre onClick={(e) => handleClick(e.target.id)} />
        <Area />
        <Link href={'#'}>
          <h1>ショップ名</h1>
        </Link>
        <div className={styles.menulist}>
          {data.map((item: Item) => (
            <div key={item.id} className={styles.menu}>
              <Link href={`/item/${item.id}`}>
                <Image
                  src={item.image_url}
                  alt="メニューの画像"
                  width={200}
                  height={200}
                />
                <p>{item.name}</p>
              </Link>
              <p>{item.price}円</p>
              <button>カートに追加</button>
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
