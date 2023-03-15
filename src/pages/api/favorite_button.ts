import { NextApiRequest, NextApiResponse } from 'next';

export default async function favoriteButton(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const shop_id = req.query.shop_id;
  const user_id = req.query.user_id;
  const url = process.env['BACKEND_API_URL'];
  try {
    const response = await fetch(
      `${url}/favorite?shop_id=${shop_id}&user_id=${user_id}`
    );
    const data = await response.json();
    if (!response) {
      throw new Error('Failed to Load...');
    }
    if (!data) {
      throw new Error('Loading...');
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
