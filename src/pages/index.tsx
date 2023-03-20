import MenuList from 'components/Menu-list';
import Head from 'next/head';
import Footer from 'components/footer';
import BreadList, { menu_list } from 'components/bread_list';
import Header from 'components/header';
import useSWR, { useSWRConfig } from 'swr';
import { useState } from 'react';
import styles from 'styles/index.module.css';
import { Fetcher } from 'lib/Fetcher';

export default function ItemListPage() {
  const [genreId, setGenreId] = useState<string>('gt.0');
  const [areaId, setAreaId] = useState<string>('gt.0');
  const [itemId, setItemId] = useState<string>('gt.0');
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

  console.log(data);

  const handleMenuClick = () => {
    setAreaId('gt.0');
    setGenreId('gt.0');
    mutate(
      `/api/menu?genreId=${genreId}&areaId=${areaId}&id=${itemId}`
    );
  };

  return (
    <>
      <Head>
        <title>商品一覧ページ</title>
      </Head>
      <main className={styles.main}>
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
        <a id="link2">
          <Header onClick={handleMenuClick} />
        </a>
        <BreadList list={[menu_list]} />
        <MenuList />
        <a id="link">
          <Footer />
        </a>
      </main>
    </>
  );
}
