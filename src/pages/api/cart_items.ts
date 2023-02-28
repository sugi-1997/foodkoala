import type { NextApiRequest, NextApiResponse } from 'next';

export default async function CartItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['BACKEND_API_URL'];
  const TOKEN = 'AsvGqKHVnuSjAsXH9jqNJrGrTIUHXAAU%';
  const itemId = req.body.itemId;
  try {
    const response = await fetch(`${url}/cart_items`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer' + TOKEN,
        'Content-Type': 'application/json',
      },
      body: {
        item_id: itemId,
      },
    });
    if (!response.ok) {
      throw new Error('Fail to Load...');
    }
    const data = await response.json();
    if (!data) {
      throw new Error('Loading...');
    }
    res.status(200).json({ url: url, item_id: itemId });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
