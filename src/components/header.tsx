// headerコンポーネントの作成
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <>
      <header>
        <Image src="/" alt="logo" width={100} height={30} />
        <div className="search">
          <input type="serch" name="search" />
          <button>検索</button>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">メニュー</a>
            </li>
            <li>
              <a href="#">ショップ</a>
            </li>
            <li>
              <a href="#">お気に入り</a>
            </li>
            <li>
              <a href="#">お買い物かご</a>
            </li>
            <li>
              <a href="#">注文履歴</a>
            </li>
          </ul>
        </nav>
        <button>ログアウト</button>
      </header>
    </>
  );
}
