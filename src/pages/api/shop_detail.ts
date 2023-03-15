import { NextApiRequest, NextApiResponse } from 'next';

export default async function getShopDetailData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['SUPABASE_URL'];
    const id = req.query.id;
    const response = await fetch(`${url}/shops?id=${id}`, {
      headers: {
        apikey: `${process.env['SUPABASE_ANON_KEY']}`,
        Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
