'use client';

import Image from 'next/image';
import { useState } from 'react';

const panels = {
  Purpose: 'Kyagulanyi Ministries exists to provide hope and practical resources that foster sustainable development. We serve vulnerable communities through safe water, education, health, livelihoods, leadership, and compassionate outreach—equipping local people to thrive.',
  Reach: 'We work alongside communities across Uganda, prioritising places where safe water, education, health support, and sustainable opportunity are most needed. The BUKIMU water project is one example of this community-led reach.',
  Approach: 'We listen first, work with local leaders, and combine practical service with accountability and faith in action. Each initiative is designed to strengthen local ownership and create outcomes that last.',
};

export function PurposeTabs() {
  const [active, setActive] = useState<keyof typeof panels>('Purpose');
  return <div className="grid border border-[#dce8df] bg-white md:grid-cols-3">
    {(Object.keys(panels) as Array<keyof typeof panels>).map((tab) => <button type="button" key={tab} onClick={() => setActive(tab)} className={`px-6 py-5 text-center text-sm font-extrabold uppercase tracking-wide transition ${active === tab ? 'bg-[#3fad3c] text-white' : 'text-[#075b3a] hover:bg-[#c7e67a]/30'}`}>{tab}</button>)}
    <div className="grid overflow-hidden bg-[#075b3a] text-white md:col-span-3 md:grid-cols-[.7fr_1.3fr]"><div className="relative min-h-[320px] md:min-h-[390px]"><Image src="/pictures/unnamed (16).webp" alt="Kyagulanyi Ministries community leader" fill className="object-cover"/></div><div className="flex flex-col justify-center p-8 sm:p-12"><p className="font-serif text-5xl italic text-[#c7e67a]">{active.toLowerCase()}</p><p className="mt-5 max-w-xl text-sm leading-7 text-white/85">{panels[active]}</p></div></div>
  </div>;
}
