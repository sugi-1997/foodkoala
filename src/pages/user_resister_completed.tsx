import Header from 'components/header';
import Footer from 'components/header';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/userResister_completed.module.css';

export default function ItemListPage() {
  const userName = localStorage.getItem('name');

  return (
    <>
      <Head>
        <title>ユーザー登録完了</title>
      </Head>
      <Header />
      <div className={styles.background}>
        <div className={styles.userResister_completed}>
          <div className={styles.logo}>
            <Image
              src="/images/foodkoala_logo.png"
              width={100}
              height={100}
              alt="logo"
            />
            <h1>Food Koala</h1>
          </div>
          <div className={styles.message}>
            <h2>アカウント登録完了</h2>
            <h2>ようこそ、{userName}さん</h2>
            <p>
              お客様のアカウント登録が完了しました！ <br />
              ログインする場合は、以下の「ログイン画面へ」ボタンをクリックしてください。
            </p>
            <Link
              href="/login"
              className={styles.link}
              onClick={() => localStorage.removeItem('name')}
            >
              ログイン画面へ
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
