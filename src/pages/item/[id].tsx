import Image from 'next/image';
import Head from 'next/head';
import { useState } from 'react';
import Footer from 'components/footer';
import Header from 'components/header';
import BreadList, {
  menu_list,
  menu_page,
} from 'components/bread_list';
import type { Menu } from 'types/menu';
import styles from 'styles/item_detail.module.css';

export default function ItemPage({ data }: { data: Menu[] }) {
  const item = data[0];
  const [count, setCount] = useState(1);

  async function cartSubmit(menuId: any) {
    try {
      console.log(menuId);
      const response = await fetch('/api/post_cart_items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart_id: 1,
          item_id: Number(menuId),
          count: count,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Head>
        <title>商品詳細画面</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, menu_page]} />
      <main>
        <div key={item.id} className={styles.item_detail}>
          <Image
            src={item.image_url}
            alt="商品の画像"
            width={150}
            height={150}
            className={styles.image}
          />
          <h1>{item.name}</h1>
          <p>{item.price}円</p>
          <p>{item.explain}</p>
          <button
            // className={styles.add_button}
            data-menu-id={item.id}
            onClick={(e) =>
              cartSubmit(e.target.getAttribute('data-menu-id'))
            }
          >
            注文リストに追加
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetch('http://127.0.0.1:8000/items');
  const data = await response.json();
  const paths = data.map((item: any) => ({
    params: {
      id: `${item.id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { id: string };
}) {
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
