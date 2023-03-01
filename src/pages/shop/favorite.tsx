import ShopName from 'components/shop_name';
import styles from 'styles/Shop.module.css';
import Head from 'next/head';
import Header from 'components/header';
import Genre from 'components/genre';
import Area from 'components/area';
import Footer from 'components/footer';
import BreadList, {
  menu_list,
  favorite_list,
} from 'components/bread_list';

export default function ShopFavorite() {
  return (
    <>
      <Head>
        <title>お気に入り店舗一覧</title>
      </Head>
      <main className={styles.shopFavorite}>
        <Header />
        <BreadList list={[menu_list, favorite_list]} />
        <Genre onClick={undefined} />
        <Area />
        <div className={styles.shopFavorite_shop}>
          <div className={styles.shopFavorite_name}>
            <ShopName />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}