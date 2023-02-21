// headerコンポーネントの作成
import Link from "next/link";

export default function Header() {
    return (
        <>
            <header>
                <div>
                    <input type="text" name="search" />
                    <button>検索</button>
                </div>
                <br />
                {/* 遷移先をhref=で指定する */}
                <Link href='/' legacyBehavior>
                    <a>メニュー</a>
                </Link>
                <br />
                <Link href='/' legacyBehavior>
                    <a>ショップ</a>
                </Link>
                <br />
                <Link href='/' legacyBehavior>
                    <a>お気に入り</a>
                </Link>
                <br />
                <Link href='/' legacyBehavior>
                    <a>お買い物かご</a>
                </Link>
                <br />
                <Link href='/' legacyBehavior>
                    <a>注文履歴</a>
                </Link>
                <br />
                <button>ログアウト</button>
            </header>
        </>
    );
}
