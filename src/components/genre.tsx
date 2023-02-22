// Genreコンポーネントの作成
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (resource: string, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Genre() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // //ローディング
  // useEffect(() => {
  //   if (router.isReady) {
  //     setLoading(true);
  //   }
  // }, [router.isReady, loading]);
  // if (!loading) return <div>Loading...</div>;

  const { data, error } = useSWR(
    'http://localhost:8000/genre',
    fetcher
  );

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データがありませんでした</div>;

  return (
    <>
      <h2>ジャンル</h2>
      <div className="list">
        {data.map((genre: GenreData) => (
          <div className="genre" key={genre.id}>
            <Image
              src={genre.image_url}
              alt="genre-icon"
              width={30}
              height={30}
            />
            <p>{genre.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

type GenreData = {
  id: number;
  name: string;
  image_url: string;
};

//データの取得
// export async function getServerSideProps() {
//   const response = await fetch('/api/genre');
//   if (!response.ok) {
//     console.error('送信に失敗しました');
//   }
//   const data = await response.json();
//   if (!data) {
//     console.error('データがありませんでhした');
//   }
//   return {
//     props: {
//       data,
//     },
//   };
// }
