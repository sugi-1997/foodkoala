import styles from '../../styles/Shop.module.css';
import Header from 'components/header';
import Footer from 'components/footer';
import Head from 'next/head';
import Image from 'next/image';
import { Shop, GetStaticProps, ShopProps, Menu } from 'types/shops';
import score from 'components/shop/score';
import useSWR from 'swr';
import BreadList, {
  shop_page,
  shop_list,
  menu_list,
} from 'components/bread_list';
import FavoriteButton from 'components/shop/favorite_button';
import Link from 'next/link';

//お店情報の取得
export async function getStaticPaths() {
  const res = await fetch('http://127.0.0.1:8000/shops');

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
  const res = await fetch(
    `http://127.0.0.1:8000/shops?id=eq.${params.id}`
  );
  const shopData = await res.json();
  return {
    props: { shopData },
  };
}

//fetcher
const fetcher = (resource: string, init: object) =>
  fetch(resource, init).then((res) => res.json());

//メニュー情報の取得
export function MenuList({ data }: { data: Menu[] }) {
  return (
    <>
      <div className={styles.shop_id_menu_list}>
        {data.map((menu: Menu) => (
          <div key={menu.id} className={styles.shop_id_menu}>
            <Link href={`/item/${menu.id}`}>
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
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export function ShopMenu({ shopId }: { shopId: number }) {
  const { data, error } = useSWR(
    `http://localhost:8000/items?shop_id=eq.${shopId}`,
    fetcher
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
  const { data, error } = useSWR(
    'http://localhost:8000/shops',
    fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データを取得できませんでした</div>;

  //レビューのコアラアイコン
  function koalaIcon() {
    return (
      <div className={styles.shop_id_review_img}>
        <img src="/images/foodkoala_logo.png" alt="コアラ" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title id="title">ショップ詳細画面</title>
        <script
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
            {shop.score}
            {score(shop.score)}
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
          <div className={styles.shopDetail_review}>
            <p className={styles.shop_id_review_title}>
              <span>
                <i className="fa-solid fa-face-laugh"></i>
                &nbsp;みんなのレビュー
              </span>
            </p>
            <div className={styles.shop_review}>
              {koalaIcon()}
              <div className={styles.shop_id_review}>
                {shop.review_1}
              </div>
            </div>
            <br />
            <div className={styles.shop_review}>
              {koalaIcon()}
              <div className={styles.shop_id_review}>
                {shop.review_2}
              </div>
            </div>
            <br />
            <div className={styles.shop_review}>
              {koalaIcon()}
              <div className={styles.shop_id_review}>
                {shop.review_3}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
