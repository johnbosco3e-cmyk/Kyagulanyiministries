'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiOutlineBars3, HiOutlineXMark, HiOutlineMagnifyingGlass, HiOutlineHeart } from 'react-icons/hi2';
import { cn } from '@/lib/utils';
import { SearchPanel } from './search-panel';

const links = [
  ['About', '/about'], ['Programs', '/programs'], ['Projects', '/projects'],
  ['Events', '/events'], ['News', '/news'], ['Media', '/media'], ['Get Involved', '/volunteer'], ['Contact', '/contact'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { const fn = () => setScrolled(scrollY > 24); fn(); addEventListener('scroll', fn); return () => removeEventListener('scroll', fn); }, []);
  useEffect(() => setOpen(false), [pathname]);
  return <>
    <div className="hidden bg-[#071b33] text-white lg:block">
      <div className="container-site flex h-9 items-center justify-between text-[11px] font-semibold tracking-wide text-white/75">
        <span>Transforming lives. Building communities. Empowering the future.</span>
        <div className="flex gap-6"><Link href="/prayer-request">Prayer Request</Link><Link href="/reports">Reports & Transparency</Link><span>Kampala, Uganda</span></div>
      </div>
    </div>
    <header className={cn('sticky top-0 z-50 border-b transition-all duration-300', scrolled ? 'border-white/10 bg-[#0d2133]/95 shadow-sm backdrop-blur-xl' : 'border-white/10 bg-[#0d2133]')}>
      <div className="container-site flex h-[78px] items-center justify-between gap-6">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-sm" aria-label="Kyagulanyi Ministries home">
          <span className="flex h-14 w-[145px] items-center sm:h-16 sm:w-[205px]"><Image src="/kyagulanyi-logo.webp" alt="Kyagulanyi Ministries" width={220} height={135} priority className="h-full w-full object-contain" /></span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className={cn('focus-ring rounded-sm py-3 text-[12px] font-bold !text-white transition hover:!text-[#3fad3c]', pathname === href ? '!text-[#3fad3c]' : '')}>{label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(true)} aria-label="Search" className="focus-ring hidden h-10 w-10 place-items-center rounded-full text-xl text-white hover:bg-white/10 sm:grid"><HiOutlineMagnifyingGlass /></button>
          <Link href="/donate" className="focus-ring donate-cta hidden gap-2 px-5 py-3 text-xs sm:flex"><HiOutlineHeart className="text-lg" /> DONATE NOW!</Link>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu" className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-2xl xl:hidden">{open ? <HiOutlineXMark /> : <HiOutlineBars3 />}</button>
        </div>
      </div>
      {open && <div className="border-t border-slate-100 bg-white xl:hidden"><nav className="container-site grid py-4 sm:grid-cols-2">{links.map(([label, href]) => <Link key={href} href={href} className="border-b border-slate-100 px-2 py-4 text-sm font-bold">{label}</Link>)}<Link href="/donate" className="donate-cta mt-4 px-6 py-4 text-center text-sm sm:col-span-2">Donate now!</Link></nav></div>}
    </header>
    <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
  </>;
}
