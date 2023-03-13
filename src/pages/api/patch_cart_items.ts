import type { NextApiRequest, NextApiResponse } from 'next';

export default async function CartItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['BACKEND_API_URL'];
  const itemId = req.body.item_id;
  try {
    const response = await fetch(
      `${url}/cart_items?item_id=eq.${itemId}`,
      {
        method: req.method,
        headers: {
          Authorization: `Bearer ${process.env['POSTGREST_API_TOKEN']}`,
          Prefer: 'return=representation',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    );
    if (!response.ok) {
      throw new Error('送信に失敗しました');
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}
