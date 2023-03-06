import { NextApiRequest, NextApiResponse } from 'next';

export default async function Orders(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['BACKEND_API_URL'];
  try {
    const response = await fetch(`${url}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env['POSTGREST_API_TOKEN']}`,
        Prefer: 'return=representation',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const data = response.json();
    console.log('ordersにデータを追加しました', data);
    if (response.ok) {
      const response = await fetch(`${url}/order_history`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env['POSTGREST_API_TOKEN']}`,
          Prefer: 'return=representation',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      console.log('order_historyにデータを追加しました', data);
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
