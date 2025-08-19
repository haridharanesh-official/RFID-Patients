import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { pusher } from '../../lib/pusher';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { patientId, message, heartRate } = req.body;
  if (!patientId || !message) return res.status(400).json({ error: 'patientId and message required' });

  const patient = await prisma.patient.findUnique({ where: { patientId } });
  if (!patient) return res.status(404).json({ error: 'unknown patientId' });

  const ev = await prisma.event.create({
    data: {
      patientId: patient.id,
      message: message,
      heartRate: heartRate ? Number(heartRate) : null
    }
  });

  try {
    await pusher.trigger('sos-channel', 'new-sos', {
      id: ev.id,
      patientId: patient.patientId,
      name: patient.name,
      message: ev.message,
      heartRate: ev.heartRate,
      createdAt: ev.createdAt
    });
  } catch (e) {
    console.error('Pusher trigger failed', e);
  }

  return res.json({ ok: true });
}
