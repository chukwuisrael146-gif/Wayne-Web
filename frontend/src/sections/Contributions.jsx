import { GitBranch, LockKeyhole } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function Contributions() {
  return (
    <section id="contributions" className="scroll-mt-16 py-20">
      <SectionHeading Icon={GitBranch} label="GitHub contributions">Building, one <span className="text-accent">commit at a time</span></SectionHeading>
      <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400">A space for the coding activity behind my projects.</p>
      <div className="relative mt-10 overflow-hidden rounded-[28px] border border-white/20 bg-[#1f1f1f]/85 p-7 sm:p-10">
        <div aria-hidden="true" className="grid grid-flow-col grid-rows-7 gap-1.5 opacity-30">
          {Array.from({ length: 182 }, (_, index) => <span key={index} className="aspect-square min-w-0 rounded-[3px] bg-neutral-600" />)}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1f1f1f]/65 px-5 text-center">
          <LockKeyhole size={24} strokeWidth={1.5} className="text-accent" />
          <h3 className="mt-4 text-xl font-light">GitHub activity coming soon</h3>
          <p className="mt-2 text-sm text-neutral-400">The contribution graph will appear here once connected.</p>
        </div>
      </div>
    </section>
  );
}
