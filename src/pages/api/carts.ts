import { NextApiRequest, NextApiResponse } from 'next';

export default async function Carts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const userId = req.query.user_id;
  try {
    const response = await fetch(`${url}/carts?user_id=${userId}`, {
      headers: {
        apikey: `${process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']}`,
        Authorization: `Bearer ${process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']}`,
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
