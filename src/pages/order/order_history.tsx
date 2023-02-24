import Head from 'next/head';
import Link from 'next/link';

export default function OrderHistory() {
  return (
    <>
      <Head>
        <title>注文履歴</title>
      </Head>
      <div>
        <h1>注文履歴一覧</h1>
      </div>
      <div>
        <h2>{'12月9日'}</h2>
        <dl>
          <dt>ご注文内容</dt>
          <dd>{'メニュー1'}</dd>
          <dd>{'メニュー2'}</dd>
          <dd>{'メニュー3'}</dd>
          <dt>お支払い金額</dt>
          <dd>{'2250円'}</dd>
          <dt>お支払い方法</dt>
          <dd>{'クレジットカード'}</dd>
        </dl>
        <Link href={'注文詳細'}>詳細を見る</Link>
      </div>
    </>
  );
}
