import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import { HiOutlineArrowRight, HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2';

export function Footer() {
  return <footer className="bg-[#06172b] text-white">
    <div className="border-b border-white/10 bg-[#0b2542]">
      <div className="container-site grid gap-7 py-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div><p className="eyebrow !text-[#e2bd70]">Stay connected</p><h2 className="mt-2 font-serif text-3xl font-semibold">Stories of hope, delivered monthly.</h2></div>
        <form className="flex overflow-hidden rounded-full bg-white p-1.5"><label htmlFor="newsletter" className="sr-only">Email address</label><input id="newsletter" type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent px-5 text-sm text-slate-900 outline-none"/><button className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#d5a84b] text-xl text-[#071b33]" aria-label="Subscribe"><HiOutlineArrowRight /></button></form>
      </div>
    </div>
    <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_.8fr_1.2fr]">
      <div><Image src="/kyagulanyi-logo.webp" alt="Kyagulanyi Ministries" width={220} height={135} className="h-auto w-[205px] rounded-md bg-white"/><p className="mt-6 max-w-sm text-sm leading-7 text-white/65">An indigenous Ugandan Christian non-profit established in 2010 to advance evangelism, community health, clean water, education, and self-sustaining communities.</p><div className="mt-6 flex gap-3">{[FaFacebookF, FaInstagram, FaYoutube, FaXTwitter].map((Icon, i) => <a href={i===2 ? 'https://www.youtube.com/@KyagulanyiMinistries' : '#'} target={i===2 ? '_blank' : undefined} rel={i===2 ? 'noreferrer' : undefined} aria-label={i===2 ? 'Kyagulanyi Ministries on YouTube' : `Social network ${i+1}`} key={i} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-sm hover:border-[#d5a84b] hover:text-[#d5a84b]"><Icon /></a>)}</div></div>
      <div><h3 className="font-serif text-xl">Explore</h3><div className="mt-5 grid gap-3 text-sm text-white/65">{[['About us','/about'],['Our programs','/programs'],['Projects','/projects'],['Impact stories','/news']].map(([a,b])=><Link key={b} href={b} className="hover:text-[#d5a84b]">{a}</Link>)}</div></div>
      <div><h3 className="font-serif text-xl">Get involved</h3><div className="mt-5 grid gap-3 text-sm text-white/65">{[['Donate','/donate'],['Volunteer','/volunteer'],['Partner with us','/partners'],['Prayer request','/prayer-request'],['Events','/events']].map(([a,b])=><Link key={b} href={b} className="hover:text-[#d5a84b]">{a}</Link>)}</div></div>
      <div><h3 className="font-serif text-xl">Contact</h3><div className="mt-5 grid gap-4 text-sm leading-6 text-white/65"><p className="flex gap-3"><HiOutlineMapPin className="mt-1 shrink-0 text-lg text-[#d5a84b]"/> Kampala, Uganda<br/>East Africa</p><a href="tel:+256701234567" className="flex gap-3"><HiOutlinePhone className="text-lg text-[#d5a84b]"/> +256 701 234 567</a><a href="mailto:hello@kyagulanyiministries.org" className="flex gap-3 break-all"><HiOutlineEnvelope className="shrink-0 text-lg text-[#d5a84b]"/> hello@kyagulanyiministries.org</a></div></div>
    </div>
    <div className="border-t border-white/10"><div className="container-site flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Kyagulanyi Ministries. All rights reserved.</p><div className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/transparency">Transparency</Link></div></div></div>
  </footer>;
}
