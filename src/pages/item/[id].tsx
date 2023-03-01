// 商品詳細画面

import Footer from 'components/footer';
import Header from 'components/header';
import Head from 'next/head';
import Image from 'next/image';
import BreadList, {
  menu_list,
  menu_page,
} from 'components/bread_list';

export default function ItemPage({ data }) {
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

  const item = data[0];

  return (
    <>
      <Head>
        <title>商品詳細画面</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, menu_page]} />
      <main>
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
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetch('http://127.0.0.1:8000/items');
  const data = await response.json();
  const paths = data.map((item) => ({
    params: {
      id: `${item.id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `http://127.0.0.1:8000/items?id=eq.${params.id}`
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}
