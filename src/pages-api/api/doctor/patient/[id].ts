import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

function isDoctor(req: NextApiRequest) {
  return !!req.cookies['session_email'];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isDoctor(req)) return res.status(401).json({ error: 'unauthorized' });
  const { id } = req.query;
  const p = await prisma.patient.findUnique({ where: { id: String(id) }, include: { events: { orderBy: { createdAt: 'desc' } } } });
  if (!p) return res.status(404).json({ error: 'not found' });
  return res.json(p);
}
