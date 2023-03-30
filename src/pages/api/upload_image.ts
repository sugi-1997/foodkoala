import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '1mb',
  },
};

export default function UploadImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    const oldpath = files.filetoupload.filepath;
  });
}
