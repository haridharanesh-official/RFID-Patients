import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.cookies['session_email'];
  return res.json({ ok: !!email });
}
