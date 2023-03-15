import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Logout({ className }: { className: string }) {
  const router = useRouter();

  const logout = () => {
    Cookies.remove('user_id');
    router.replace('/login');
  };

  return (
    <li onClick={logout} className={className}>
      ログアウト
    </li>
  );
}
