import type { NextApiRequest, NextApiResponse } from 'next';

export default async function CartItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['BACKEND_API_URL'];
    const response = await fetch(`${url}/cart_items`, {
      method: req.method,
      headers: {
        'Authorization': `Bearer ${process.env['POSTGREST_API_TOKEN']}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data = response.json();
    res.status(200).json(data);
  } catch {
    (error) => {
      res.status(400).json({ message: error.message });
    };
  }
}
