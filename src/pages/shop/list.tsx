import Head from 'next/head';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import ShopName from '../../components/shop_name';
import Header from 'components/header';
import Genre from 'components/genre';
import Area from 'components/area';
import Footer from 'components/footer';
import BreadList, {
  menu_list,
  shop_list,
} from 'components/bread_list';
import { Fetcher } from 'lib/Fetcher';
import styles from 'styles/index.module.css';

export default function ShopList() {
  const [genreId, setGenreId] = useState<string>('gt.0');
  const [areaId, setAreaId] = useState<string>('gt.0');

  const { data, error } = useSWR(
    `/api/shop?genreId=${genreId}&areaId=${areaId}`,
    Fetcher,
    {
      revalidateOnMount: true,
    }
  );
  const { mutate } = useSWRConfig();

  const handleGenreClick = (clickedId: any) => {
    setAreaId('gt.0');
    setGenreId(`eq.${clickedId}`);
    console.log(clickedId);
    mutate(`/api/shop?genreId=${genreId}&areaId=${areaId}`);
  };

  const handleAreaClick = (clickedId: any) => {
    setGenreId('gt.0');
    setAreaId(`eq.${clickedId}`);
    console.log(clickedId);
    mutate(`/api/shop?areaId=${areaId}&genreId=${genreId}`);
  };

  if (error) return <div>エラーです</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>ショップ一覧</title>
      </Head>
      <main className={styles.main}>
        <a id="link2">
          <Header />
        </a>
        <BreadList list={[menu_list, shop_list]} />
        <Genre onClick={(e: any) => handleGenreClick(e.target.id)} />
        <Area onClick={(e: any) => handleAreaClick(e.target.id)} />
        <ShopName data={data} />
        <a id="link">
          <Footer />
        </a>
        <a href="#link">
          <input
            type="button"
            value="Down↓"
            className={styles.button_down}
          />
        </a>
        <a href="#link2">
          <input
            type="button"
            value="Up↑"
            className={styles.button_up}
          />
        </a>
      </main>
    </>
  );
}
