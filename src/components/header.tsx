// headerコンポーネントの作成
import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/Header.module.css';

export default function Header({ onClick }: any) {
  return (
    <>
      <header className={styles.header}>
        <Image
          src="/images/provisional_logo.png"
          alt="logo"
          width={30}
          height={30}
          className={styles.logo}
        />
        <span>Food Koala</span>
        <div className={styles.search}>
          <input type="search" name="search" />
          <button>検索</button>
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
              <Link href="/order/order_check">注文リスト</Link>
            </li>
            <li>
              <Link href="/order/order_history">注文履歴</Link>
            </li>
          </ul>
        </nav>
        <button>ログアウト</button>
      </header>
    </>
  );
}
