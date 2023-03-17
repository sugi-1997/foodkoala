// Areaコンポーネントの作成
import useSWR from 'swr';
import styles from 'styles/Area.module.css';
import type { Area } from 'types/area';
import { Fetcher } from 'lib/Fetcher';

export default function Area({ onClick }: any) {
  const { data, error } = useSWR('/api/area', Fetcher, {
    revalidateOnMount: true,
  });

  if (error) return <div>Fail to Laod...</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <h2 className={styles.h2}>--- Area ---</h2>
      <div className={styles.arealist}>
        <div className={styles.all_area}>
          {data.map((area: Area, index: number) => (
            <div className={styles.area} key={index}>
              <button id={`${area.id}`} onClick={onClick}>
                <p>{area.name}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
