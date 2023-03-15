import type { NextApiRequest, NextApiResponse } from 'next';

export default async function CartItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['SUPABASE_URL'];
    const response = await fetch(`${url}/cart_items?cart_id=eq.1`, {
      method: 'DELETE',
      headers: {
        apikey: `${process.env['SUPABASE_ANON_KEY']}`,
        Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
      },
    });
    if (response.ok) {
      const data = await response.text();
      res.status(200).json(data);
    } else {
      throw new Error('送信に失敗しました');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
