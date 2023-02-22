import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  name: string;
  image_url: string;
};

export default async function GenreData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch('http://localhost:8000/genre');
    if (!response.ok) {
      throw new Error('データの送信に失敗しました');
    }
    const data = await response.json();
    if (!data) {
      throw new Error('データが見つかりませんでした');
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}
