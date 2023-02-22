// Areaコンポーネントの作成
import Image from 'next/image';
export default function Area() {
  return (
    <>
      <h2>エリア</h2>
      <div className='list'>
        <div className="area">
          <Image src="/" alt="photo" width={100} height={30} />
          <p>○○区</p>
        </div>
        <div className="area">
          <Image src="/" alt="photo" width={100} height={30} />
          <p>○○区</p>
        </div>
        <div className="area">
          <Image src="/" alt="photo" width={100} height={30} />
          <p>○○区</p>
        </div>
        <div className="area">
          <Image src="/" alt="photo" width={100} height={30} />
          <p>○○区</p>
        </div>
        <div className="area">
          <Image src="/" alt="photo" width={100} height={30} />
          <p>○○区</p>
        </div>
      </div>
    </>
  );
}
