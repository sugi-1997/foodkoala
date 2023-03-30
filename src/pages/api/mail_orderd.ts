import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function MailOrdered(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
    secure: true,
    tls: {
      rejectUnauthorized: true,
    },
  });

  // 受け取るメール
  const mailOptionsOrdered = {
    from: 'something@example.com',
    to: req.body.email,
    subject: `ご注文ありがとうございます`,
    text: `${req.body.message}sent from ${req.body.email}`,
    html: `
      <p>【お名前】</p>
      <p>${req.body.name}</p>
      <p>【かな】</p>
      <p>${req.body.nameKana}</p>
      <p>【ご注文内容】</p>
      <p>${req.body.message}</p>
      <p>【メールアドレス】</p>
      <p>${req.body.email}</p>
      <p>【電話番号】</p>
      <p>${req.body.phone}</p>
      `,
  };

  transport.sendMail(mailOptionsOrdered, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  return res.send('成功しました');
}
