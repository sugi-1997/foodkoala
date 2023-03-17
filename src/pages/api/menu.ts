import type { NextApiRequest, NextApiResponse } from 'next';

export default async function ItemData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const genreId = req.query.genreId;
  const areaId = req.query.areaId;
  const id = req.query.id;
  const url = process.env['SUPABASE_URL'];
  if (id!.includes('eq')) {
    try {
      const response = await fetch(`${url}/items?id=${id}`, {
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
  } else if (areaId!.includes('eq')) {
    try {
      const response = await fetch(`${url}/items?area_id=${areaId}`, {
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
  } else {
    try {
      const response = await fetch(
        `${url}/items?genre_id=${genreId}`,
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
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
