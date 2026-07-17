'use client';

import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const churches = [
  { name: 'Wakiso Community Church', district: 'Wakiso District', position: [0.4044, 32.4594] as [number, number], focus: 'Community outreach and children’s support' },
  { name: 'Mukono Hope Church', district: 'Mukono District', position: [0.3533, 32.7553] as [number, number], focus: 'Clean water and enterprise' },
  { name: 'Kampala Ministry Centre', district: 'Kampala', position: [0.3476, 32.5825] as [number, number], focus: 'Leadership, partnerships, and training' },
  { name: 'Bukimu Outreach Church', district: 'Bukimu', position: [0.8, 32.7] as [number, number], focus: 'Water access and local discipleship' },
];

const marker = (active: boolean) => L.divIcon({ className: '', html: `<span style="display:block;width:${active ? 24 : 18}px;height:${active ? 24 : 18}px;border-radius:50%;background:${active ? '#075b3a' : '#3fad3c'};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3)"></span>`, iconSize: [24, 24], iconAnchor: [12, 12] });

export function ChurchMap() {
  const [selected, setSelected] = useState(churches[0]);
  return <section className="bg-[#f7f7f5] py-20"><div className="container-site"><div className="mb-10 max-w-2xl"><p className="eyebrow">Church planting</p><h2 className="mt-3 font-serif text-4xl font-semibold text-[#075b3a] sm:text-5xl">Growing local churches across Uganda.</h2><p className="mt-4 text-sm leading-7 text-[#5f6f66]">Explore the communities where our church-planting and outreach teams serve.</p></div><div className="grid overflow-hidden rounded-2xl border border-[#dce8df] bg-white shadow-sm lg:grid-cols-[1.4fr_.6fr]"><div className="h-[420px] lg:h-[520px]"><MapContainer center={[1.2, 32.4]} zoom={7} scrollWheelZoom={false} className="h-full w-full"><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />{churches.map((church) => <Marker key={church.name} position={church.position} icon={marker(selected.name === church.name)} eventHandlers={{ click: () => setSelected(church) }}><Popup><strong>{church.name}</strong><br/>{church.district}</Popup></Marker>)}</MapContainer></div><div className="flex flex-col justify-center p-7 sm:p-9"><p className="eyebrow">Selected location</p><h3 className="mt-3 font-serif text-3xl font-semibold text-[#075b3a]">{selected.name}</h3><p className="mt-2 text-sm font-semibold text-[#3fad3c]">{selected.district}</p><p className="mt-5 text-sm leading-7 text-[#5f6f66]">{selected.focus}</p><div className="mt-7 grid gap-2">{churches.map((church) => <button type="button" key={church.name} onClick={() => setSelected(church)} className={`rounded-lg px-4 py-3 text-left text-xs font-bold transition ${selected.name === church.name ? 'bg-[#075b3a] text-white' : 'bg-[#f7f7f5] text-[#075b3a] hover:bg-[#c7e67a]/40'}`}>{church.name}</button>)}</div></div></div></div></section>;
}
