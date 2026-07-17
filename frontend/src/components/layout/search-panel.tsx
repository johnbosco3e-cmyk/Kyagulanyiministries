'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { HiOutlineArrowUpRight, HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2';
import { news, programs, projects } from '@/lib/content';

type SearchPanelProps = { open: boolean; onClose: () => void };

export function SearchPanel({ open, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return [
      ...programs.map((item) => ({ title: item.title, description: item.text, href: `/programs/${item.slug}`, type: 'Program' })),
      ...projects.map((item) => ({ title: item.title, description: item.summary, href: `/projects/${item.slug}`, type: 'Project' })),
      ...news.map((item) => ({ title: item.title, description: item.category, href: '/news', type: 'Story' })),
    ].filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(q));
  }, [query]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-[#06172b]/85 px-4 py-6 backdrop-blur-md sm:px-8" role="dialog" aria-modal="true" aria-label="Search Kyagulanyi Ministries">
      <div className="container-site flex justify-end"><button onClick={onClose} className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/20 text-2xl text-white" aria-label="Close search"><HiOutlineXMark /></button></div>
      <div className="mx-auto mt-16 max-w-3xl text-white sm:mt-24">
        <p className="eyebrow !text-[#e2bd70]">Search Kyagulanyi Ministries</p>
        <div className="mt-4 flex items-center gap-4 border-b border-white/30 pb-4"><HiOutlineMagnifyingGlass className="text-3xl text-[#e2bd70]" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search programs, projects, stories..." className="min-w-0 flex-1 bg-transparent font-serif text-3xl outline-none placeholder:text-white/35 sm:text-5xl" /></div>
        {query && <div className="mt-8 grid gap-3">{results.length ? results.map((result) => <Link onClick={onClose} key={`${result.type}-${result.title}`} href={result.href} className="group rounded-2xl border border-white/10 bg-white/10 p-5 transition hover:bg-white/15"><span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#e2bd70]">{result.type}</span><span className="mt-2 flex items-center justify-between gap-4 font-serif text-2xl">{result.title}<HiOutlineArrowUpRight className="shrink-0 text-xl text-[#e2bd70] transition group-hover:translate-x-1 group-hover:-translate-y-1" /></span><span className="mt-2 block text-sm text-white/60">{result.description}</span></Link>) : <p className="py-8 text-white/60">No results yet. Try a different phrase.</p>}</div>}
      </div>
    </div>
  );
}
