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
                {/* 遷移先をhref=で指定する */}
                <Link href='/' >メニュー</Link>
                <br />
                <Link href='/' >ショップ</Link>
                <br />
                <Link href='/' >お気に入り</Link>
                <br />
                <Link href='/' >お買い物かご</Link>
                <br />
                <Link href='/' >注文履歴</Link>
                <br />
                <button>ログアウト</button>
            </header>
        </>
    );
}
