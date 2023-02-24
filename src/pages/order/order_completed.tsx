import Head from 'next/head';
import Link from 'next/link';

export default function OrderCompleted() {
  return (
    <>
      <Head>
        <title>注文完了</title>
      </Head>
      <div>
        <h1>ご注文ありがとうございました！</h1>
        <h2>ご注文コード {'注文コード'}</h2>
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
        <p>お受け取り可能時間まで {'time'}</p>
        <p>google map</p>
        <Link href={'商品一覧'}>別のメニューを注文する</Link>
      </div>
    </>
  );
}
