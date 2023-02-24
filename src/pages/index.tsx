import Area from 'components/area';
import Genre from 'components/genre';
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
        <Genre />
        <Area />
        <MenuList />
        <Footer />
      </main>
    </>
  );
}
