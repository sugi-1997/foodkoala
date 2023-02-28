import MenuList from 'components/Menu-list';
import Head from 'next/head';
import Footer from 'components/footer';
import styles from 'styles/Top.module.css';

export default function ItemListPage() {
  return (
    <>
      <Head>
        <title>商品一覧ページ</title>
      </Head>
      <main className={styles.main}>
        <MenuList />
        <Footer />
      </main>
    </>
  );
}
