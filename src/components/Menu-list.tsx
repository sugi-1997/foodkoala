import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Area from 'components/area';
import Genre from 'components/genre';
import Header from 'components/header';
import useSWR, { useSWRConfig } from 'swr';
import { SyntheticEvent, useState } from 'react';
import styles from '../styles/menu_link.module.css';
import ShopName from 'components/shop_name';
import BreadList, { menu_list } from './bread_list';

const fetcher = (resource: string) =>
  fetch(resource).then((res) => res.json());

export default function MenuList({ onClick, id }: any) {
  const [genreId, setGenreId] = useState<string>('gt.0');
  const [areaId, setAreaId] = useState<string>('gt.0');
  const [itemId, setItemId] = useState<string>('gt.0');

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

  const handleMenuClick = () => {
    setAreaId('gt.0');
    setGenreId('gt.0');
    mutate(
      `/api/menu?genreId=${genreId}&areaId=${areaId}&id=${itemId}`
    );
  };

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

  return (
    <>
      <Head>
        <title>FoodKoala トップ</title>
      </Head>
      <main>
        <Header onClick={handleMenuClick} />
        <BreadList list={[menu_list]} />
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
        <ShopName />
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