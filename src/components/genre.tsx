// Genreコンポーネントの作成
import Image from 'next/image';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (resource: string, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Genre({ onClick }) {
  const { data, error } = useSWR('/api/genre', fetcher);

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データがありませんでした</div>;

  return (
    <>
      <h2>ジャンル</h2>
      <div className="list">
        {data.map((genre: GenreData) => (
          <div className="genre" key={genre.id}>
            <button id={genre.id} onClick={onClick}>
              <Image
                src={genre.image_url}
                id={genre.id}
                alt="genre-icon"
                width={30}
                height={30}
              />
              <p id={genre.id}>{genre.name}</p>
            </button>
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
