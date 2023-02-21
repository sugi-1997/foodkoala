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
            <MenuList />
          </div>
          <br />
          <div className="menu">
            <MenuList />
          </div>
          <br />
          <div className="menu">
            <MenuList />
          </div>
          <br />
          <div className="menu">
            <MenuList />
          </div>
          <br />
          <div className="menu">
            <MenuList />
          </div>
        </div>
      </main>
    </>
  );
}
