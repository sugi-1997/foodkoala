import Area from '@/components/area';
import Genre from '@/components/genre';
import ItemList from '@/components/item_list';
import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ItemListPage() {
  return (
    <>
      <Head>
        <title>商品一覧ページ</title>
      </Head>
      <Header />
      <main>
        <div>
          <Genre />
        </div>
        <div>
          <Area />
        </div>
        <h1>ショップ名</h1>
        <div className="list">
          <div className="menu">
            <ItemList />
          </div>
          <br />
          <div className="menu">
            <ItemList />
          </div>
          <br />
          <div className="menu">
            <ItemList />
          </div>
          <br />
          <div className="menu">
            <ItemList />
          </div>
          <br />
          <div className="menu">
            <ItemList />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
