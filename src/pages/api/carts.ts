import { NextApiRequest, NextApiResponse } from 'next';

export default async function Carts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['BACKEND_API_URL'];
  const userId = req.body.user_id;
  try {
    const response = await fetch(`${url}/carts?user_id=eq.${userId}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
