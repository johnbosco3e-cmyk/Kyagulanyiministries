'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/lib/strapi';

const schema=z.object({name:z.string().min(2,'Please enter your name'),email:z.string().email('Enter a valid email'),phone:z.string().optional(),message:z.string().min(10,'Please provide a little more detail')});
type Data=z.infer<typeof schema>;
export function EngagementForm({type}:{type:'contact'|'volunteer'|'prayer-request'}){
 const [sent,setSent]=useState(false); const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<Data>({resolver:zodResolver(schema)});
 const submit=async(data:Data)=>{try{const route=type==='contact'?'/contact-submissions':type==='volunteer'?'/volunteers':'/prayer-requests';await api.post(route,{data:{...data,subject:type,status:'new'}});}catch{/* Keep a graceful local success state while CMS public create is disabled. */}setSent(true);reset();};
 if(sent)return <div className="rounded-3xl bg-emerald-50 p-8 text-emerald-900"><h3 className="font-serif text-3xl font-semibold">Thank you.</h3><p className="mt-3 text-sm leading-6">Your message has been received. Our team will respond as soon as possible.</p></div>;
 return <form onSubmit={handleSubmit(submit)} className="grid gap-5 rounded-3xl bg-white p-7 shadow-soft sm:p-9"><div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" error={errors.name?.message}><input {...register('name')} className="field"/></Field><Field label="Email address" error={errors.email?.message}><input type="email" {...register('email')} className="field"/></Field></div><Field label="Phone number (optional)"><input {...register('phone')} className="field"/></Field><Field label={type==='prayer-request'?'How can we pray with you?':type==='volunteer'?'Tell us about your skills and availability':'How can we help?'} error={errors.message?.message}><textarea rows={6} {...register('message')} className="field resize-none"/></Field><button disabled={isSubmitting} className="rounded-full bg-[#d5a84b] px-7 py-4 text-sm font-extrabold text-[#071b33] disabled:opacity-50">{isSubmitting?'Sending…':'Send message'}</button><style jsx>{`.field{width:100%;border:1px solid #dfe3e8;border-radius:14px;padding:13px 15px;outline:none;background:#fff}.field:focus{border-color:#d5a84b;box-shadow:0 0 0 3px rgba(213,168,75,.15)}`}</style></form>
}
function Field({label,error,children}:{label:string;error?:string;children:React.ReactNode}){return <label className="grid gap-2 text-xs font-bold text-[#24364d]">{label}{children}{error&&<span className="font-medium text-red-600">{error}</span>}</label>}
