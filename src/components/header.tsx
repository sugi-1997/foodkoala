// headerコンポーネントの作成
import Image from 'next/image';
import Link from 'next/link';

export default function Header({ onClick }) {
  return (
    <>
      <header>
        <Image
          src="/images/provisional_logo.png"
          alt="logo"
          width={30}
          height={30}
        />
        <span>Food Koala</span>
        <div className="search">
          <input type="serch" name="search" />
          <button>検索</button>
        </div>
        <nav>
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
              <Link href="/order/order_check">お買い物かご</Link>
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
