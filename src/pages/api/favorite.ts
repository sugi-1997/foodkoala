import type { NextApiRequest, NextApiResponse } from 'next';
// import fetch from 'isomorphic-unfetch';

export default async function ShopData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.user_id;
  const url = process.env['SUPABASE_URL'];

  try {
    if (userId?.includes('undefined')) {
      const data: [] = [];
      res.status(200).json(data);
    } else {
      const response = await fetch(
        `${url}/favorite?user_id=${userId}`,
        {
          headers: {
            apikey: `${process.env['SUPABASE_ANON_KEY']}`,
            Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Fail to Load...');
      }
      if (!data) {
        throw new Error('Loading...');
      }
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
