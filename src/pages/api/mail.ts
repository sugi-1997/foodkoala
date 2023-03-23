import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function Mail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, nameKana, email, phone, message } = req.body;
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '6b0ce4685db332',
        pass: 'eab76188b93d89',
      },
    });

    const mailOptions = {
      from: `${name}(${nameKana})`,
      to: '(to@example.com)',
      subject: 'お問い合わせ',
      text: `本文:${message}\nメールアドレス:${email}\n電話番号:${phone}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: '送信成功' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '送信エラー' });
    }
  } else {
    res.status(405).json({ message: 'メソッドの不許可' });
  }
}
