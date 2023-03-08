import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  email: string;
  password: string;
};

export default async function LoginData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const url = process.env['BACKEND_API_URL'];
    const response = await fetch(
      `${url}/users?email=eq.${email}&password=eq.${password}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error('データの送信にシッパイしました');
    }
    if (!data) {
      throw new Error('データが見つかりませんでした');
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
