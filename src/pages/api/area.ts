import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export default async function GenreData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['BACKEND_API_URL'];
    const response = await fetch(`${url}/area`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('データの送信に失敗しました');
    }
    if (!data) {
      throw new Error('データが見つかりませんでした');
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
