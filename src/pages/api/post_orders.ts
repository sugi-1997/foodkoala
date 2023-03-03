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
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
