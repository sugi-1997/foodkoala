// headerコンポーネントの作成
import Image from 'next/image';

export default function Header() {
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
              <a href="./item_detail">メニュー</a>
            </li>
            <li>
              <a href="./list">ショップ</a>
            </li>
            <li>
              <a href="./favorite">お気に入り</a>
            </li>
            <li>
              <a href="./order_check">お買い物かご</a>
            </li>
            <li>
              <a href="./order_history">注文履歴</a>
            </li>
          </ul>
        </nav>
        <button>ログアウト</button>
      </header>
    </>
  );
}
