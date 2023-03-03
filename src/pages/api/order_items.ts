import { NextApiRequest, NextApiResponse } from 'next';

export default async function OrderItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['BACKEND_API_URL'];
  const orderId = req.query.order_id;
  try {
    const response = await fetch(
      `${url}/order_items?order_id=${orderId}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
