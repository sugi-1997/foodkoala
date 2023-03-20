import useSWR from 'swr';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/header';
import Footer from 'components/footer';
import ShopScore from 'components/shop/score';
import ShopReview from 'components/shop_review';
import BreadList, {
  shop_page,
  shop_list,
  menu_list,
} from 'components/bread_list';
import FavoriteButton from 'components/shop/favorite_button';
import { Fetcher } from 'lib/Fetcher';
import { Shop, GetStaticProps, ShopProps, Menu } from 'types/shops';
import styles from '../../styles/Shop.module.css';

//お店情報の取得
const url = process.env['SUPABASE_URL'];

export async function getStaticPaths() {
  const res = await fetch(`${url}/shops`, {
    headers: {
      apikey: `${process.env['SUPABASE_ANON_KEY']}`,
      Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
    },
  });
  const shops = await res.json();
  const paths = shops.map((shop: Shop) => ({
    params: {
      id: `${shop.id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticProps) {
  const res = await fetch(`${url}/shops?id=eq.${params.id}`, {
    headers: {
      apikey: `${process.env['SUPABASE_ANON_KEY']}`,
      Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
    },
  });
  const shopData = await res.json();
  return {
    props: { shopData },
  };
}

//メニュー情報の取得
export function MenuList({ data }: { data: Menu[] }) {
  return (
    <>
      <div className={styles.shop_id_menu_list}>
        {data.map((menu: Menu) => (
          <div key={menu.id} className={styles.shop_id_menu}>
            <a href={`/item/${menu.id}`}>
              <div>
                <Image
                  src={menu.image_url}
                  alt="メニュー画像"
                  width={300}
                  height={300}
                />
              </div>
              <p>{menu.name}</p>
              <p>{menu.price}円</p>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export function ShopMenu({ shopId }: { shopId: number }) {
  const { data, error } = useSWR(
    `http://localhost:8000/items?shop_id=eq.${shopId}`,
    Fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データを取得できませんでした</div>;

  return (
    <>
      <div>
        <MenuList data={data} />
      </div>
    </>
  );
}

//全体
export default function ShopDetail({ shopData }: ShopProps) {
  const shop = shopData[0];

  return (
    <>
      <Head>
        <title id="title">ショップ詳細画面</title>
        <script
          async
          src="https://kit.fontawesome.com/acecca202b.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Header />
      <BreadList list={[menu_list, shop_list, shop_page]} />
      <main>
        <div key={shop.id} className={styles.main}>
          <h1 className={styles.shop_id_name}>
            <i className="fa-solid fa-utensils"></i>
            &nbsp;&nbsp;{shop.name}
          </h1>
          <div className={styles.shop_id_score}>
            <ShopScore id={shop.id} />
          </div>
          <div className={styles.shop_id_image}>
            <Image
              src={shop.image_url}
              alt="お店の画像"
              width={300}
              height={300}
            />
          </div>
          <div>
            <FavoriteButton shop={shop} />
          </div>
          <p className={styles.shop_id_description}>
            {shop.description}
          </p>
          <ShopMenu shopId={shop.id} />
          <ShopReview id={shop.id} />
        </div>
      </main>
      <Footer />
    </>
  );
}
