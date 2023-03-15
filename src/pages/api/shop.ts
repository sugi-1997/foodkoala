import type { NextApiRequest, NextApiResponse } from 'next';
// import fetch from 'isomorphic-unfetch';

export default async function ItemData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const genreId = req.query.genreId;
  const areaId = req.query.areaId;
  const url = process.env['NEXT_PUBLIC_SUPABASE_URL'];

  if (areaId!.includes('eq')) {
    try {
      const response = await fetch(`${url}/shops?area_id=${areaId}`, {
        headers: {
          apikey: `${process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']}`,
          Authorization: `Bearer ${process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']}`,
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
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else {
    try {
      const response = await fetch(
        `${url}/shops?genre_id=${genreId}`,
        {
          headers: {
            apikey: `${process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']}`,
            Authorization: `Bearer ${process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']}`,
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
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}
