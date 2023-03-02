// Areaコンポーネントの作成
import Image from 'next/image';
import useSWR from 'swr';
import Link from 'next/link';
import styles from 'styles/Area.module.css';

const fetcher = (resource: string, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Area({ onClick }: any) {
  const { data, error } = useSWR('/api/area', fetcher);

  if (error) return <div>Fail to Laod...</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.arealist}>
        <h2>エリア</h2>
        {data.map((area: any) => (
          <div className={styles.area} key={area.id} id={area.id}>
            <button id={area.id} onClick={onClick}>
              <p id={area.id}>{area.name}</p>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
