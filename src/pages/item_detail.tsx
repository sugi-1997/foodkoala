// 商品詳細画面

import Footer from '@/components/footer';
import Header from '@/components/header';
import Head from 'next/head';
import useSWR from 'swr';
import Image from 'next/image';

const fetcher = (resource: string, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function ItemPage() {
  const { data, error } = useSWR(
    'http://localhost:8000/items',
    fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データを取得できませんでした</div>;

  type Item = {
    id: number;
    name: string;
    explain: string;
    price: number;
    image_url: string;
    favorite: boolean;
    genre_id: number;
    area_id: number;
    shop_id: number;
  };

  return (
    <>
      <Head>
        <title>商品詳細画面</title>
      </Head>
      <Header />
      <main>
        {data.map((item: Item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <Image
              src={item.image_url}
              alt="商品の画像"
              width={150}
              height={150}
            />
            <p>{item.price}円</p>
            <p>{item.explain}</p>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
