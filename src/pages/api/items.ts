import { NextApiRequest, NextApiResponse } from 'next';

export default async function getItemData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['BACKEND_API_URL'];
    const id = req.query.id;
    const response = await fetch(`${url}/items?id=${id}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
