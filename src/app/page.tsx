import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold">Care Hub — Patient Portal</h1>
      <p className="mt-2 text-gray-600">Scan NFC/QR to open emergency info. Doctors sign in for full records.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/doctor" className="px-4 py-2 rounded bg-indigo-600 text-white">Doctor Dashboard</Link>
        <Link href="/p/demo" className="px-4 py-2 rounded border">Public demo</Link>
      </div>
    </main>
  );
}
