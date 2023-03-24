import { NextApiRequest, NextApiResponse } from 'next';

export default async function getItemData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['SUPABASE_URL'];
    const id = req.query.shop_id;
    const response = await fetch(`${url}/items?shop_id=${id}`, {
      headers: {
        apikey: `${process.env['SUPABASE_ANON_KEY']}`,
        Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
