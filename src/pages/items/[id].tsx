// 商品詳細画面

import MenuList from '@/components/menu-list';
import Head from 'next/head';

export default function ItemPage() {
  return (
    <>
      <Head>
        <title>商品詳細画面</title>
      </Head>
      <main>
        <h1>ショップ名</h1>
        <MenuList />
      </main>
    </>
  );
}
