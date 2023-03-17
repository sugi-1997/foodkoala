import type { NextApiRequest, NextApiResponse } from 'next';

export default async function GenreData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['SUPABASE_URL'];
    const userId = req.query.user_id;
    const response = await fetch(`${url}/orders?user_id=${userId}`, {
      headers: {
        apikey: `${process.env['SUPABASE_ANON_KEY']}`,
        Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('データの送信に失敗しました');
    }
    if (!data) {
      throw new Error('データが見つかりませんでした');
    }
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
