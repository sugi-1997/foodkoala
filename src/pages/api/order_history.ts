import { NextApiRequest, NextApiResponse } from 'next';

export default async function Orders(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['BACKEND_API_URL'];
  const userId = req.query.user_id;
  try {
    if (userId!.includes('undefined')) {
      const data: [] = [];
      res.status(200).json(data);
    } else {
      const response = await fetch(
        `${url}/order_history?user_id=${userId}`
      );
      const data = await response.json();
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
