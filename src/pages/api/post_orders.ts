import { NextApiRequest, NextApiResponse } from 'next';

export default async function Orders(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['SUPABASE_URL'];
  try {
    const response = await fetch(`${url}/order_history`, {
      method: 'POST',
      headers: {
        apikey: `${process.env['SUPABASE_ANON_KEY']}`,
        Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
        Prefer: 'return=representation',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const data = response.json();
    console.log('ordersにデータを追加しました', data);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
