import Head from 'next/head';
import Header from 'components/header';
import BreadList, {
  menu_list,
  order_list,
} from 'components/bread_list';
import OrderList from 'components/order_list';
import Footer from 'components/footer';
import useSWR from 'swr';
import styles from 'styles/order_list.module.css';
import type { CartItem } from 'types/cart_item';
import Link from 'next/link';
import { Fetcher } from 'lib/Fetcher';
import CheckCookieButton from 'lib/Check_Cookie';

export default function Orderlist() {
  //cart_itemsテーブルからデータを取得
  const { data, error } = useSWR<CartItem[]>(
    '/api/get_cart_items',
    Fetcher
  );

  if (error) return <div>Error...</div>;
  if (!data) return <div>Loading...</div>;

  if (data.length === 0) {
    return (
      <>
        <Head>
          <title>注文リスト</title>
        </Head>
        <Header />
        <BreadList list={[menu_list, order_list]} />
        <div className={styles.order_list}>
          <OrderList />
          <div className={styles.alert}>
            <p>※カートに商品がないため、購入できません</p>
            <button>
              <Link href="/">メニュー一覧へ</Link>
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>注文リスト</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, order_list]} />
      <div className={styles.order_list}>
        <OrderList />
        <CheckCookieButton />
      </div>
      <Footer />
    </>
  );
}
