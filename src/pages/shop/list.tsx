import ShopName from '../../components/shop_name';
import styles from '../../styles/Shop.module.css';
import Head from 'next/head';
import Header from 'components/header';
import Genre from 'components/genre';
import Area from 'components/area';
import Footer from 'components/footer';
import Link from 'next/link';
import BreadList, {
  menu_list,
  shop_list,
} from 'components/bread_list';

export default function ShopList() {
  return (
    <>
      <Head>
        <title>お店一覧</title>
      </Head>
      <main className={styles.shopList}>
        <Header />
        <BreadList list={[menu_list, shop_list]} />
        <Genre onClick={undefined} />
        <Area />
        <div className={styles.shopList_shop}>
          <div className={styles.shopList_name}>
            <ShopName url="http://localhost:8000/shops" />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
