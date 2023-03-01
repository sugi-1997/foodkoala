import type { NextApiRequest, NextApiResponse } from 'next';
// import fetch from 'isomorphic-unfetch';

type Data = {
  id: number;
  name: string;
  image_url: string;
};

export default async function ShopData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  try {
    const url = process.env['BACKEND_API_URL'];
    const response = await fetch(`${url}/shops?id=${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Fail to Load...');
    }
    if (!data) {
      throw new Error('Loading...');
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
