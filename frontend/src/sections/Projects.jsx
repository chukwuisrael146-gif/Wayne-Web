import { useState } from 'react';
import { ArrowDown, ArrowUp, LayoutGrid } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="scroll-mt-16 py-20">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs">
        <LayoutGrid size={14} strokeWidth={1.5} />
        PORTFOLIO
      </div>

      <h2 className="mt-10 text-4xl font-light tracking-tight sm:text-5xl">
        Featured <span className="text-accent">Projects</span>
      </h2>

      <div id="project-list" className="mt-10 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={index === 0}
          />
        ))}
      </div>

      {projects.length > 3 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls="project-list"
            onClick={() => setShowAll((expanded) => !expanded)}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-accent px-7 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {showAll ? 'View fewer projects' : 'View more projects'}
            {showAll ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          </button>
        </div>
      )}
    </section>
  );
}
