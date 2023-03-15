import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  try {
    const response = await fetch(
      `${url}/users?email=eq.${req.body.email}`,
      {
        headers: {
          apikey: `${process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']}`,
          Authorization: `Bearer ${process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']}`,
        },
      }
    );
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
