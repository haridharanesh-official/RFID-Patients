import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ ok: false, error: 'Invalid credentials' });
  const ok = bcrypt.compareSync(password, user.password);
  if (!ok || user.role !== 'doctor') return res.status(401).json({ ok: false, error: 'Invalid credentials' });
  // set simple cookie
  res.setHeader('Set-Cookie', `session_email=${user.email}; Path=/; HttpOnly; SameSite=Lax`);
  return res.json({ ok: true });
}
