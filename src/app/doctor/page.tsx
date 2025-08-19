'use client';
import DoctorLoginClient from '../../components/DoctorLoginClient';
import DoctorDashboardClient from '../../components/DoctorDashboardClient';
import useSWR from 'swr';
const fetcher = (url:string)=>fetch(url).then(r=>r.json());

export default function DoctorPage(){
  const { data } = useSWR('/api/me', fetcher);
  if (!data) return null;
  if (!data.ok) return <DoctorLoginClient />;
  return <DoctorDashboardClient />;
}
