// Genreコンポーネントの作成
import Image from 'next/image';
export default function Genre() {
  return (
    <>
      <h2>ジャンル</h2>
      <div className="list">
        <div className="genre">
          <Image src="/" alt="photo" width={100} height={30} />
          <p>洋食</p>
        </div>
        <div className="genre">
          <Image src="/" alt="photo" width={100} height={30} />
          <p>和食</p>
        </div>
        <div className="genre">
          <Image src="/" alt="photo" width={100} height={30} />
          <p>中華</p>
        </div>
        <div className="genre">
          <Image src="/" alt="photo" width={100} height={30} />
          <p>スイーツ</p>
        </div>
        <div className="genre">
          <Image src="/" alt="photo" width={100} height={30} />
          <p>ドリンク</p>
        </div>
      </div>
    </>
  );
}
