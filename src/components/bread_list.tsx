import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/breadList.module.css';

//各ページのtitleとpathを定義。ページごとに現在のページまでの階層のページを指定。
export const concept = { title: 'コンセプト', path: `/concept` };
export const menu_page = { title: '商品詳細', path: null };
export const menu_list = { title: 'Food Koala トップ', path: `/` };
export const shop_page = { title: 'ショップ詳細', path: null };
export const shop_list = {
  title: 'ショップ一覧',
  path: `/shop/list`,
};
export const favorite_list = {
  title: 'お気に入りショップ一覧',
  path: `/shop/favorite`,
};
export const inquiry_form = {
  title: 'お問い合わせフォーム',
  path: `/inquiry_form`,
};
export const order_list = {
  title: '注文リスト',
  path: `/order/list`,
};
export const order_check = {
  title: '注文確認',
  path: `/order/order_check`,
};
export const order_history = {
  title: '注文履歴',
  path: `/order/order_history`,
};

export default function BreadList({
  list,
}: {
  list: { title: string; path: string | null }[];
}) {
  const router = useRouter();

  //現在のpathはtitleのみ返す。上の階層は、リンクを指定。（[id]ページはpathがページごとに異なるので、nullとして指定しています。）
  function BreadState(props: {
    list: { title: string; path: string | null }[];
  }) {
    return (
      <ul className={styles.breadList} key={router.asPath}>
        {props.list.map((state, index) => {
          if (state.path === router.asPath || state.path === null) {
            return <li key={state.title}>{state.title}</li>;
          } else {
            return (
              <>
                <li key={state.title}>
                  <Link href={state.path}>{state.title}</Link>
                </li>
                <li key={index}>
                  <i className="fa-solid fa-square-caret-right"></i>
                </li>
              </>
            );
          }
        })}
      </ul>
    );
  }

  return (
    <>
      <div>
        <BreadState list={list} />
      </div>
    </>
  );
}
