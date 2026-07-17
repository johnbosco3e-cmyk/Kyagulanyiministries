import { cn } from '@/lib/utils';
export function SectionHeading({ eyebrow, title, text, align='left', light=false }: { eyebrow: string; title: string; text?: string; align?: 'left'|'center'; light?: boolean }) {
  return <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}><p className={cn('eyebrow', light && '!text-[#e6bf71]')}>{eyebrow}</p><h2 className={cn('display mt-3 text-4xl font-semibold sm:text-5xl', light ? 'text-white' : 'text-[#071b33]')} style={{fontFamily:'var(--font-display)'}}>{title}</h2>{text && <p className={cn('mt-5 text-[15px] leading-7', light ? 'text-white/65' : 'text-[#657184]')}>{text}</p>}</div>;
}
