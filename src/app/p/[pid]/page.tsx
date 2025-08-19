import { notFound } from 'next/navigation';

type Params = { params: { pid: string } };
export default async function Page({ params: { pid } }: Params) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/public/${pid}`, { cache: 'no-store' });
  if (!res.ok) return notFound();
  const patient = await res.json();
  return (
    <main className="container mx-auto px-4 py-8 max-w-xl">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold">Emergency Information</h2>
        <div className="mt-3 text-sm space-y-2">
          <div><b>Patient ID:</b> {patient.patientId}</div>
          <div><b>Name:</b> {patient.name}</div>
          <div><b>Blood:</b> {patient.bloodGroup ?? '-'}</div>
          <div><b>Allergies:</b> {patient.allergies ?? '-'}</div>
          <div><b>Emergency:</b> {patient.emergency ?? '-'}</div>
        </div>
      </div>
    </main>
  );
}
