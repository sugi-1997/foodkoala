// Areaコンポーネントの作成
import Image from 'next/image';
export default function MenuList() {
  return (
    <>
      <h1>ショップ名</h1>
      <div className="list">
        <div className="menu">
          <Image
            src="/items/photo.jpg"
            alt="photo"
            width={100}
            height={100}
          />
          <p>メニュー１</p>
          <p>1000円</p>
          <button>カートに追加</button>
        </div>
        <br />
        <div className="menu">
          <Image
            src="/items/photo.jpg"
            alt="photo"
            width={100}
            height={100}
          />
          <p>メニュー１</p>
          <p>1000円</p>
          <button>カートに追加</button>
        </div>
        <br />
        <div className="menu">
          <Image
            src="/items/photo.jpg"
            alt="photo"
            width={100}
            height={100}
          />
          <p>メニュー１</p>
          <p>1000円</p>
          <button>カートに追加</button>
        </div>
        <br />
        <div className="menu">
          <Image
            src="/items/photo.jpg"
            alt="photo"
            width={100}
            height={100}
          />
          <p>メニュー１</p>
          <p>1000円</p>
          <button>カートに追加</button>
        </div>
        <br />
        <div className="menu">
          <Image
            src="/items/photo.jpg"
            alt="photo"
            width={100}
            height={100}
          />
          <p>メニュー１</p>
          <p>1000円</p>
          <button>カートに追加</button>
        </div>
      </div>
    </>
  );
}
