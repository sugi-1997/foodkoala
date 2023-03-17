import { NextApiRequest, NextApiResponse } from 'next';

export default async function OrderItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['SUPABASE_URL'];
  const orderId = req.query.order_id;
  try {
    const response = await fetch(
      `${url}/order_items?order_id=${orderId}`,
      {
        headers: {
          apikey: `${process.env['SUPABASE_ANON_KEY']}`,
          Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
