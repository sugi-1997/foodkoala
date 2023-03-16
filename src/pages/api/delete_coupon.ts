import type { NextApiRequest, NextApiResponse } from 'next';

export default async function CartItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['BACKEND_API_URL'];
    const userId = req.query.user_id;
    const couponcode = req.query.couponcode;
    if (couponcode === undefined || couponcode.includes('null')) {
      res
        .status(200)
        .json({ message: 'クーポンは使用されませんでした' });
    } else {
      const response = await fetch(
        `${url}/coupon?user_id=${userId}&couponcode=${couponcode}`,
        {
          method: 'DELETE',
          headers: {
            apikey: `${process.env['SUPABASE_ANON_KEY']}`,
            Authorization: `Bearer ${process.env['SUPABASE_ANON_KEY']}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.text();
        res.status(200).json(data);
      } else {
        throw new Error('送信に失敗しました');
      }
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
