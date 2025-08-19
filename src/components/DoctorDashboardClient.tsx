'use client';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import toast, { Toaster } from 'react-hot-toast';

export default function DoctorDashboardClient(){
  const [events,setEvents] = useState<any[]>([]);
  useEffect(()=>{
    const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '',
    });
    const ch = pusherClient.subscribe('sos-channel');
    ch.bind('new-sos', (data:any) => {
      setEvents(prev => [data, ...prev]);
      toast.error(`🚨 SOS: ${data.name} — ${data.message} (HR:${data.heartRate ?? '-'})`, { duration: 8000 });
      // additional visual cue: play sound
      const audio = new Audio('/alert.wav');
      audio.play().catch(()=>{});
    });
    return ()=>{ ch.unbind_all(); ch.unsubscribe(); pusherClient.disconnect(); };
  },[]);
  return (
    <main className="container mx-auto px-4 py-6">
      <Toaster position="top-right" />
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Doctor Dashboard</h2>
        <form method="post" action="/api/logout"><button className="px-4 py-2 rounded border">Logout</button></form>
      </header>
      <section className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-semibold mb-2">Live SOS Events</h3>
        <ul>
          {events.map(e=>(
            <li key={e.id} className="border-b py-2">
              <span className="font-bold">{e.patientId}</span> — {e.message} <span className="text-red-600 ml-2">HR: {e.heartRate ?? '-'}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
