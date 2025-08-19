import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

function isDoctor(req: NextApiRequest) {
  const email = req.cookies['session_email'];
  return !!email;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isDoctor(req)) return res.status(401).json({ error: 'unauthorized' });
  const q = String(req.query.q || '');
  const rows = await prisma.patient.findMany({
    where: {
      OR: [
        { patientId: { contains: q } },
        { name: { contains: q, mode: 'insensitive' } }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 200
  });
  return res.json(rows);
}
