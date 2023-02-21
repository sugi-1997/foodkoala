// footerコンポーネントの作成
import Link from "next/link";

export default function Footer() {
    return (
            <Link href='/' legacyBehavior>
                <a>お問い合わせ</a>
            </Link>
    );
}
