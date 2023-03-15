// 注文ページをAuthコンポーネントで囲むイメージ

import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Auth = ({ children }: any) => {
  const router = useRouter();

  const user_id = Cookies.get('user_id');

  if (user_id === null || user_id === undefined)
    router.replace('/login');

  return children;
};

export { Auth };
