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
import useSWR from 'swr';

const fetcher = (resource: string, init: object) =>
  fetch(resource, init).then((res) => res.json());

export default function ShopFavorite() {
  const { data, error } = useSWR(
    `http://localhost:8000/favorite?favorite=eq.${true}`,
    fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>Loading...</div>;

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
            {data.map((fav: any) => (
              <ShopName
                url={`http://localhost:8000/shops?id=eq.${fav.shop_id}`}
              />
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
