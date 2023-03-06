import type { NextApiRequest, NextApiResponse } from 'next';

export default async function CartItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['BACKEND_API_URL'];
    const id = req.query.user_id;
    const response = await fetch(`${url}/carts?user_id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env['POSTGREST_API_TOKEN']}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: id,
      }),
    });
    if (!response.ok) {
      throw new Error('送信に失敗しました');
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
