import Head from 'next/head';
import Link from 'next/link';

export default function ItemListPage() {
  return (
    <>
      <Head>
        <title>ユーザー登録完了</title>
      </Head>
      <div>
        <h2>アカウント登録完了</h2>
        <p>
          お客様のアカウント登録が完了しました！ <br />
          ログインする場合は、以下の「ログイン画面へ」ボタンをクリックしてください。
        </p>
        <Link href="/login">ログイン画面へ</Link>
      </div>
    </>
  );
}
