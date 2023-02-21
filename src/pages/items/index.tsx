import Area from '@/components/area';
import Genre from '@/components/genre';
import MenuList from '@/components/menu-list';
import Head from 'next/head';

export default function ItemListPage() {
  return (
    <>
      <Head>
        <title>商品一覧ページ</title>
      </Head>
      <Genre />
      <Area />
      <MenuList />
    </>
  );
}
