import ShopName from '../../components/shop_name';
import Head from 'next/head';
import Header from 'components/header';
import Genre from 'components/genre';
import Area from 'components/area';
import Footer from 'components/footer';
import BreadList, {
  menu_list,
  shop_list,
} from 'components/bread_list';

export default function ShopList() {
  return (
    <>
      <Head>
        <title>ショップ一覧</title>
      </Head>
      <main>
        <Header />
        <BreadList list={[menu_list, shop_list]} />
        <Genre onClick={undefined} />
        <Area />
        <ShopName url="http://localhost:8000/shops" />
        <Footer />
      </main>
    </>
  );
}
