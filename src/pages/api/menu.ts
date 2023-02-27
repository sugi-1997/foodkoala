import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export default async function ItemData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const genreId = req.query.genreId;
  try {
    const url = process.env['BACKEND_API_URL'];
    const response = await fetch(`${url}/items?genre_id=${genreId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('データの送信に失敗しました');
    }
    if (!data) {
      throw new Error('Loading...');
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
