// headerコンポーネントの作成
import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/Header.module.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Header({ onClick }: any) {
  const router = useRouter();
  const user_id = Cookies.get('user_id');
  const [loginStatus, setLoginStatus] = useState('true');
  const [logoutStatus, setLogoutStatus] = useState('false');

  useEffect(() => {
    if (user_id) {
      setLoginStatus('false');
      setLogoutStatus('true');
    }
  }, [user_id]);

  const logout = () => {
    Cookies.remove('user_id');
    router.replace('/login  ');
    setLoginStatus('true');
    setLogoutStatus('false');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/images/provisional_logo.png"
              alt="logo"
              width={35}
              height={35}
            />
            <span>Food Koala</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/" onClick={onClick}>
                メニュー
              </Link>
            </li>
            <li>
              <Link href="/shop/list">ショップ</Link>
            </li>
            <li>
              <Link href="/shop/favorite">お気に入り</Link>
            </li>
            <li>
              <Link href="/order/list">注文リスト</Link>
            </li>
            <li>
              <Link href="/order/order_history">注文履歴</Link>
            </li>
            <li className={styles[loginStatus]}>
              <Link href="/login">ログイン</Link>
            </li>
            <li className={styles[logoutStatus]} onClick={logout}>
              ログアウト
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
