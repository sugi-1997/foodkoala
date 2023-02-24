import useSWR from 'swr';
import { useState, useEffect } from 'react';

type Genre = {
  id: number;
  name: string;
  image_url: string;
};

export default function FetchApiData() {
  const [genre, setGenre] = useState<Genre[]>([]);
  useEffect(() => {
    const fetchGenre = async () => {
      const response = await fetch('/api/genre');
      if (!response.ok) {
        console.log('error');
      }
      const data = await response.json();
      console.log(data);
      setGenre(data);
    };
    fetchGenre();
  }, []);

  if (genre.length === 0) {
    return <div>Loading...</div>;
  }

  if (genre.length > 0) {
    return (
      <div>
        <p>データを取得しました</p>
        <ul>
          {genre.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
