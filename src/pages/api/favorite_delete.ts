import type { NextApiRequest, NextApiResponse } from 'next';

export default async function FavoriteDelete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env['BACKEND_API_URL'];
    const body = req.body;
    const response = await fetch(
      `${url}/favorite?shop_id=${req.query.shop_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
          //↓TOKEN設定
          Authorization: `Bearer ${process.env.POSTGREST_API_TOKEN}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      throw new Error('送信に失敗しました');
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function Favorite(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const url = process.env['BACKEND_API_URL'];
//     const body = req.body;
//     const response = await fetch(
//       `${url}/favorite?shop_id=${req.query.shop_id}`,
//       {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Prefer: 'return=representation',
//           //↓TOKEN設定
//           Authorization: `Bearer ${process.env.POSTGREST_API_TOKEN}`,
//         },
//         body: JSON.stringify(body),
//       }
//     );
//     if (!response.ok) {
//       throw new Error('送信に失敗しました');
//     }
//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// }
