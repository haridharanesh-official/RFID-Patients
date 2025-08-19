'use client';
import { useState } from 'react';

export default function DoctorLoginClient(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('');
  async function submit(e:any){ e.preventDefault(); setErr('');
    const res = await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const j = await res.json();
    if (j.ok) window.location.reload(); else setErr(j.error||'Login failed');
  }
  return (
    <main className="container mx-auto max-w-md px-4 py-12">
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Doctor Sign In</h2>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input className="border w-full rounded-2xl px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="border w-full rounded-2xl px-3 py-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-indigo-600 text-white rounded-2xl px-4 py-2">Login</button>
        </form>
      </div>
    </main>
  );
}
