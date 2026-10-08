import { Braces, Code2, Database, Layers, Monitor, Shapes } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const skills = [
  { name: 'React', category: 'INTERFACES', mark: 'Re', Icon: Monitor },
  { name: 'Django', category: 'BACKEND', mark: 'Dj', Icon: Database },
  { name: 'JavaScript', category: 'FRONTEND LOGIC', mark: 'JS', Icon: Braces },
  { name: 'Python', category: 'BACKEND LOGIC', mark: 'Py', Icon: Code2 },
  { name: 'Tailwind CSS', category: 'STYLING', mark: 'Tw', Icon: Layers },
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 py-20">
      <SectionHeading Icon={Shapes} label="My skills">The tools behind <span className="text-accent">my work</span></SectionHeading>
      <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400">From the first interface to the backend behind it, these are the technologies I work with.</p>
      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {skills.map(({ name, category, mark, Icon }) => (
          <div key={name} className="group text-center">
            <div className="motion-card flex min-h-44 flex-col items-center justify-center gap-4 rounded-[32px] border border-white/25 bg-[#1f1f1f]/65 p-5 transition-colors group-hover:border-accent">
              <Icon size={27} strokeWidth={1.3} className="text-neutral-400" />
              <span className="text-4xl font-light text-accent">{mark}</span>
            </div>
            <h3 className="mt-4 text-base">{name}</h3><p className="mt-2 text-[10px] tracking-widest text-neutral-500">{category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
