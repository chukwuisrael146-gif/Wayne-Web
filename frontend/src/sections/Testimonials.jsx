import { MessageSquare, Quote } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { testimonials } from '../data/profile';

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-16 py-20">
      <SectionHeading Icon={MessageSquare} label="Testimonials">Feedback, in <span className="text-accent">their words</span></SectionHeading>
      <div className="mt-10 space-y-5">
        {testimonials.length ? testimonials.map(({ name, role, quote }, index) => (
          <figure key={`${name}-${index}`} className="rounded-[28px] border border-white/25 bg-[#1f1f1f]/80 p-8">
            <Quote className="text-accent" size={28} strokeWidth={1.5} />
            <blockquote className="mt-6 text-xl leading-9 font-light">{quote}</blockquote>
            <figcaption className="mt-6 text-sm">{name}<span className="mt-1 block text-neutral-400">{role}</span></figcaption>
          </figure>
        )) : (
          <div className="rounded-[28px] border border-white/25 bg-[#1f1f1f]/80 p-8 sm:p-10">
            <Quote className="text-accent" size={32} strokeWidth={1.3} />
            <h3 className="mt-6 text-2xl font-light">Good work starts with a conversation.</h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-400">Feedback will be shared here as it becomes available. In the meantime, explore my projects and see what I’ve been building.</p>
            <a href="#projects" className="mt-6 inline-flex min-h-11 items-center text-sm text-accent hover:underline">Explore my work ↗</a>
          </div>
        )}
      </div>
    </section>
  );
}
