// headerコンポーネントの作成
import Image from 'next/image';

export default function Header() {
  return (
    <>
      {/* ロゴを入れるようにする */}
      <Image src="/" alt="logo" width={100} height={30} />
    </>
  );
}
