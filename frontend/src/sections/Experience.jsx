import { useRef } from 'react';
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import useTimelineProgress from '../hooks/useTimelineProgress';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/profile';

const experience = [
  { label: 'PROJECT EXPERIENCE', title: 'Full Stack Web Development', detail: 'Five completed projects, bringing interfaces and backend functionality together.' },
  { label: 'MY FOCUS', title: 'React interfaces. Django backends.', detail: 'Building responsive pages and connecting them to the systems that power a website.' },
  { label: 'CONTINUING DEVELOPMENT', title: 'Learning through building', detail: 'Developing my craft through hands-on projects, with attention to usability, responsive design, and maintainable code.' },
];

export default function Experience() {
  const timelineRef = useRef(null);
  useTimelineProgress(timelineRef);

  return (
    <section id="resume" className="scroll-mt-16 py-20">
      <SectionHeading Icon={BriefcaseBusiness} label="Resume">Experience & <span className="text-accent">growth</span></SectionHeading>
      <div ref={timelineRef} data-scroll-timeline className="experience-timeline relative mt-12">
        <div aria-hidden="true" className="timeline-rail"><span className="timeline-fill" /></div>
        <span aria-hidden="true" className="timeline-traveler" />
        {experience.map((item) => (
          <article key={item.label} className="experience-item relative pb-12 pl-8 last:pb-0 sm:pl-12">
            <span aria-hidden="true" className="timeline-marker" />
            <div className="timeline-entry">
              <p className="text-xs tracking-widest text-accent">{item.label}</p>
              <h3 className="mt-4 text-2xl font-light">{item.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-400">{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
      {profile.resumeUrl && <a href={profile.resumeUrl} download className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm hover:border-accent hover:text-accent">Download my CV <ArrowUpRight size={16} /></a>}
    </section>
  );
}
