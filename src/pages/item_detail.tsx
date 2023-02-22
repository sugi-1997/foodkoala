// 商品詳細画面

import Footer from '@/components/footer';
import Header from '@/components/header';
import ItemList from '@/components/item_list';
import Head from 'next/head';

export default function ItemPage() {
  return (
    <>
      <Head>
        <title>商品詳細画面</title>
      </Head>
      <Header />
      <main>
        <h1>ショップ名</h1>
        <ItemList />
      </main>
      <Footer />
    </>
  );
}
