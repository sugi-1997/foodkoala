import { NextApiRequest, NextApiResponse } from 'next';

export default async function getScore(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['SUPABASE_URL'];
  const shop_id = req.query.shop_id;
  try {
    const response = await fetch(`${url}/score?shop_id=${shop_id}`, {
      headers: {
        apikey: `${process.env['SUPABASE_ANON_KEY']}`,
        Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to Load...');
    }
    if (!data) {
      throw new Error('Loading...');
    }
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
