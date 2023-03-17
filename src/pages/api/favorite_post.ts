import type { NextApiRequest, NextApiResponse } from 'next';

export default async function FavoritePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['SUPABASE_URL'];
  try {
    const body = req.body;
    const response = await fetch(
      `${url}/favorite?shop_id=${req.query.shop_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
          apikey: `${process.env['SUPABASE_ANON_KEY']}`,
          Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      throw new Error('送信に失敗しました');
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
