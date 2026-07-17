'use client';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
export function ImpactCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null); const active = useInView(ref, { once: true }); const number = Number(value.replace(/\D/g,''));
  return <div ref={ref} className="border-l border-white/20 pl-6"><strong className="block font-serif text-4xl text-white sm:text-5xl">{active ? <CountUp end={number} duration={2.2} separator="," /> : 0}{value.includes('+') && '+'}</strong><span className="mt-2 block text-xs font-bold uppercase tracking-[.14em] text-white/55">{label}</span></div>;
}
