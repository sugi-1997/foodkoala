import { NextApiRequest, NextApiResponse } from 'next';

export default async function patchCarts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['BACKEND_API_URL'];
    const userId = req.query.user_id;
    const response = await fetch(`${url}/carts?user_id=${userId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }
    if (data.length > 0) {
      const response = await fetch(`${url}/carts?user_id=${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env['POSTGREST_API_TOKEN']}`,
          Prefer: 'return=representation',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      const data = await response.json();
      res.status(200).json(data);
    }

    if (data.length === 0) {
      const response = await fetch(`${url}/carts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env['POSTGREST_API_TOKEN']}`,
          Prefer: 'return=representation',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      const data = response.json();
      res.status(200).json(data);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
