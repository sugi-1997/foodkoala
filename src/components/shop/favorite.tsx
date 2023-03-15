import Head from 'next/head';
import Header from 'components/header';
import BreadList, {
  menu_list,
  favorite_list,
} from 'components/bread_list';
import ShopName from 'components/shop_name';
import Footer from 'components/footer';
import { Shop } from 'types/shops';

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
      <BreadList list={[menu_list, favorite_list]} />
      <ShopName data={favoriteShops} />
      <Footer />
    </>
  );
}
