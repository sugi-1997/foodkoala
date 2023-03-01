import Link from 'next/link';
import { useRouter } from 'next/router';

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
  console.log('router', router);
  console.log('router', router.asPath);

  function BreadState(props: {
    list: { title: string; path: string | null }[];
  }) {
    return (
      <ul className="breadList" key={router.asPath}>
        {props.list.map((state) => {
          if (state.path === router.asPath || state.path === null) {
            return <li key={state.title}>{state.title}</li>;
          } else {
            return (
              <>
                <li key={state.path}>
                  <Link href={state.path}>{state.title}</Link>
                </li>
                <li key=">">&gt;</li>
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
