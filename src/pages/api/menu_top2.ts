import type { NextApiRequest, NextApiResponse } from 'next';
// import fetch from 'isomorphic-unfetch';

export default async function ItemData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.shop_id;
  const url = process.env['SUPABASE_URL'];

  if (id!.includes('eq')) {
    try {
      const response = await fetch(`${url}/items?shop_id=${id}`, {
        headers: {
          apikey: `${process.env['SUPABASE_ANON_KEY']}`,
          Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Fail to Load...');
      }
      if (!data) {
        throw new Error('Loading...');
      }
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
