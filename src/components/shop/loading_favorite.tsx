import Head from 'next/head';
import Header from 'components/header';
import BreadList, {
  menu_list,
  favorite_list,
} from 'components/bread_list';
import Footer from 'components/footer';

export default function LoadingFavorite() {
  return (
    <>
      <Head>
        <title>お気に入り店舗一覧</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, favorite_list]} />
      <div>Loading...</div>
      <Footer />
    </>
  );
}
