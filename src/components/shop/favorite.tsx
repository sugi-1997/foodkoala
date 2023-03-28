import Head from 'next/head';
import Header from 'components/header';
import BreadList, {
  menu_list,
  favorite_list,
} from 'components/bread_list';
import ShopName from 'components/shop_name';
import Footer from 'components/footer';
import { Shop } from 'types/shops';
import styles from 'styles/favorite.module.css';

export default function Favorite({
  favoriteShops,
}: {
  favoriteShops: Shop[];
}) {
  return (
    <>
      <Head>
        <title>お気に入り店舗一覧</title>
      </Head>
      <Header />
      <div className={styles.main}>
        <BreadList list={[menu_list, favorite_list]} />
        <aside className={styles.aside}></aside>
        <ShopName data={favoriteShops} />
      </div>
      <Footer />
    </>
  );
}
