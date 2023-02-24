// Areaコンポーネントの作成
import Image from 'next/image';
import useSWR from 'swr';

const fetcher = (resource: string, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Area() {
  const { data, error } = useSWR('/api/area', fetcher);

  if (error) return <div>Fail to Laod...</div>;
  if (!data) return <div>Loading...</div>;

  type Area = {
    id: number;
    name: string;
  };

  return (
    <>
      <h2>エリア</h2>
      <div className="list">
        {data.map((area: Area) => (
          <div className="area" key={area.id}>
            <p>{area.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
