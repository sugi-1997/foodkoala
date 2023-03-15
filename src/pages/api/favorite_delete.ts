import type { NextApiRequest, NextApiResponse } from 'next';

export default async function FavoriteDelete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['SUPABASE_URL'];
    const body = req.body;
    const response = await fetch(
      `${url}/favorite?shop_id=${req.query.shop_id}`,
      {
        method: 'DELETE',
        headers: {
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
