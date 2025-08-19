import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', 'session_email=; Path=/; HttpOnly; Max-Age=0');
  return res.json({ ok: true });
}
