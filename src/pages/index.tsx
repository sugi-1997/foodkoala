import MenuList from 'components/Menu-list';
import Head from 'next/head';
import Header from 'components/header';
import Footer from 'components/footer';

export default function ItemListPage() {
  return (
    <>
      <Head>
        <title>商品一覧ページ</title>
      </Head>
      <main>
        <Header />
        <MenuList />
        <Footer />
      </main>
    </>
  );
}
