import type { NextApiRequest, NextApiResponse } from 'next';
// import fetch from 'isomorphic-unfetch';

export default async function ItemData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const genre_id = req.query.genre_id;
  const area_id = req.query.area_id;
  const id = req.query.shop_id;
  if (id!.includes('eq')) {
    try {
      const url = process.env['BACKEND_API_URL'];
      const response = await fetch(`${url}/items?shop_id=${id}`);
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
  } else if (area_id!.includes('eq')) {
    try {
      const url = process.env['BACKEND_API_URL'];
      const response = await fetch(`${url}/items?area_id=${area_id}`);
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
  } else {
    try {
      const url = process.env['BACKEND_API_URL'];
      const response = await fetch(
        `${url}/items?genre_id=${genre_id}`
      );
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
}
