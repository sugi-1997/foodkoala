export {};

// import fs from 'fs';
// import path from 'path';
// import { IncomingForm } from 'formidable';

// export const config = {
//   api: {
//     bodyParser: false,
//     sizeLimit: '1mb',
//   },
// };

// export default function UploadImage(req: any, res: any) {
//   if (req.method === 'POST') {
//     console.log('リクエスト', req);
//     // if (!req.files || !req.files.image) {
//     //   res.status(400).json({ message: 'No file uploaded' });
//     //   return;
//     // }
//     const form = new IncomingForm();
//     console.log('form', form);
//     //@ts-ignore
//     form.uploadDir = path.join('../public/images/review', 'tmp');

//     form.on('file', (name: any, file: any) => {
//       const oldPath = file.path;

//       console.log('oldpath', oldPath);
//       // ランダムなファイル名を生成
//       const fileName =
//         Math.random().toString(36).substring(7) +
//         path.extname(file.name);
//       const newPath = path.join(
//         '/public/images/review',
//         'tmp',
//         fileName
//       );
//       // oldPath→newPathに書き換え
//       fs.renameSync(oldPath, newPath);

//       res.status(200).json({ message: 'Success' });
//     });

//     form.parse(req);
//   } else {
//     res.status(405).json('メソッドが間違っています');
//   }
// }
