import Header from 'components/header';
import Footer from 'components/footer';
import BreadList, {
  menu_list,
  favorite_list,
} from 'components/bread_list';
import Image from 'next/image';
import styles from 'styles/Shop_list.module.css';
import Link from 'next/link';

export default function NoFavorite() {
  return (
    <>
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
            <Link href="/shop/list">ショップ一覧へ</Link>
          </div>
          <br />
          <p>お気に入り店舗がありません</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
