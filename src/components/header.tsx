// headerコンポーネントの作成
import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/Header.module.css';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Logout from 'lib/Logout';

export default function Header({ onClick }: any) {
  const user_id = Cookies.get('user_id');
  const [loginStatus, setLoginStatus] = useState('true');
  const [logoutStatus, setLogoutStatus] = useState('false');

  useEffect(() => {
    if (user_id) {
      setLoginStatus('false');
      setLogoutStatus('true');
    }
  }, [user_id]);

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
        {/* ここからハンバーガーメニュー */}
        <div className={styles.hamburger}>
          <input
            type="checkbox"
            id="menu_btn_check"
            className={styles.menu_btn_check}
          />
          <label htmlFor="menu_btn_check" className={styles.menu_btn}>
            <span></span>
          </label>
          {/* ここまでハンバーガーメニュー */}
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
              <Logout className={styles[logoutStatus]} />
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
