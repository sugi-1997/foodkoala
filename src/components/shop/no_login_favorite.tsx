import Header from 'components/header';
import Footer from 'components/footer';
import BreadList, {
  menu_list,
  favorite_list,
} from 'components/bread_list';
import Link from 'next/link';
import styles from 'styles/Shop_list.module.css';
import Image from 'next/image';
import Head from 'next/head';

export default function NoLoginFavorite() {
  return (
    <>
      <Head>
        <title>お気に入り店舗一覧</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, favorite_list]} />
      <div>
        <div className={styles.favorite_login}>
          <div className={styles.favorite_login_link}>
            <Image
              src="/images/foodkoala_img2.png"
              alt="コアラ"
              width={300}
              height={300}
            />
            <br />
            <br />
            <Link href="/login">ログイン</Link>
          </div>
          <br />
          <p>
            お気に入り店舗一覧を表示したい場合はログインをしてください
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
