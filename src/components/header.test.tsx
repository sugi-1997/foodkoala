import Header from './header';
import renderer from 'react-test-renderer';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/Header.module.css';

describe('Header', () => {
  //関数以外のスナップショットを実施
  it('renders header correctly when loginStatus is false', () => {
    const loginStatus = 'false';
    const logoutStatus = 'true';
    const tree = renderer
      .create(
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
              <label
                htmlFor="menu_btn_check"
                className={styles.menu_btn}
              >
                <span></span>
              </label>
              {/* ここまでハンバーガーメニュー */}
              <nav className={styles.nav}>
                <ul>
                  <li>
                    <Link href="/">メニュー</Link>
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
                  <li className={styles[logoutStatus]}>ログアウト</li>
                </ul>
              </nav>
            </div>
          </header>
        </>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders header correctly when loginStatus is true', () => {
    const loginStatus = 'true';
    const logoutStatus = 'false';
    const tree = renderer
      .create(
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
              <label
                htmlFor="menu_btn_check"
                className={styles.menu_btn}
              >
                <span></span>
              </label>
              {/* ここまでハンバーガーメニュー */}
              <nav className={styles.nav}>
                <ul>
                  <li>
                    <Link href="/">メニュー</Link>
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
                  <li className={styles[logoutStatus]}>ログアウト</li>
                </ul>
              </nav>
            </div>
          </header>
        </>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
