// Areaコンポーネントの作成
import Image from 'next/image';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (resource: string, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Area({ onClick }) {
  const { data, error } = useSWR('/api/area', fetcher);

  if (error) return <div>Fail to Laod...</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <h2>エリア</h2>
      <div className="list">
        {data.map((area) => (
          <div className="area" key={area.id}>
            <button id={area.id} onClick={onClick}>
              <p>{area.name}</p>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
