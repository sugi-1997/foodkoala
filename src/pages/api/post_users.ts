// リクエストを受け取るためのAPIルートを定義する
// ハンドラー関数内で必要なデータを取得し、処理する

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env['BACKEND_API_URL'];
  const userInfo = req.body;
  try {
    // fetchでhttp://127.0.0.1:8000/usersへ情報を送る
    const response = await fetch(`${url}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        Authorization: `Bearer ${process.env['POSTGREST_API_TOKEN']}`,
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();
    if (response.ok) {
      const response = await fetch(`${url}/coupon`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env['POSTGREST_API_TOKEN']}`,
          Prefer: 'return=representation',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          couponcode: 'welcome coupon',
          discount: 10,
        }),
      });
      const data = response.json();
      console.log('couponにデータを追加しました', data);
      res.status(200).json(data);
    }
    if (!response.ok) {
      throw new Error('データの送信に失敗しました');
    }
    if (!data) {
      throw new Error('データが見つかりませんでした');
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
