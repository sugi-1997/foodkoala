import type { NextApiRequest, NextApiResponse } from 'next';

export default async function CartItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['BACKEND_API_URL'];
    const userId = req.query.user_id;
    const couponcode = req.query.couponcode;
    const response = await fetch(
      `${url}/coupon?user_id=${userId}&couponcode=${couponcode}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env['POSTGREST_API_TOKEN']}`,
        },
      }
    );
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
