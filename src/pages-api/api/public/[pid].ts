import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  const patient = await prisma.patient.findUnique({
    where: { patientId: String(pid) },
    select: { patientId: true, name: true, bloodGroup: true, allergies: true, emergency: true }
  });
  if (!patient) return res.status(404).json({ error: 'not found' });
  return res.json(patient);
}
