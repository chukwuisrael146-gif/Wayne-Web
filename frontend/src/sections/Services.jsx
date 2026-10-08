import { ArrowUpRight, Code2, Layers, Monitor, Wrench } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const services = [
  { Icon: Monitor, title: 'Frontend Development', detail: 'Responsive React interfaces that bring your design to life across phones, tablets, and desktops.', tag: 'REACT · TAILWIND CSS' },
  { Icon: Code2, title: 'Backend Development', detail: 'Django applications and APIs that connect your interface to data and business functionality.', tag: 'DJANGO · PYTHON' },
  { Icon: Wrench, title: 'Website Improvements', detail: 'Interface refinements, responsive fixes, and updates that make an existing website easier to use.', tag: 'REFINE · IMPROVE · MAINTAIN' },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 py-20">
      <SectionHeading Icon={Layers} label="Services">What I can <span className="text-accent">build for you</span></SectionHeading>
      <div className="mt-10 space-y-5">
        {services.map(({ Icon, title, detail, tag }) => (
          <a key={title} href="#contact" className="motion-card group block rounded-[24px] border border-white/25 bg-[#1f1f1f]/65 p-7 transition-colors hover:border-accent sm:p-9">
            <div className="flex items-start justify-between gap-5"><h3 className="text-2xl font-light">{title}</h3><Icon className="shrink-0 text-accent" size={27} strokeWidth={1.3} /></div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-400">{detail}</p>
            <div className="mt-7 flex items-center justify-between gap-4"><span className="text-[11px] tracking-widest text-neutral-300">{tag}</span><ArrowUpRight size={18} className="text-neutral-400 group-hover:text-accent" /></div>
          </a>
        ))}
      </div>
    </section>
  );
}
