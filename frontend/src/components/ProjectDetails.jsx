import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export default function ProjectDetails({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!project || !dialog) return undefined;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, [project]);

  if (!project) return null;
  return (
    <dialog ref={dialogRef} aria-labelledby="project-detail-title" onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="m-auto max-h-[85svh] w-[calc(100%-32px)] max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-[#202020] p-0 text-white shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm">
      <div className="p-6 sm:p-9">
        <div className="flex items-start justify-between gap-5">
          <h2 id="project-detail-title" className="text-3xl leading-tight font-light">{project.title}</h2>
          <button type="button" autoFocus onClick={onClose} aria-label="Close project details" className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 hover:border-accent hover:text-accent"><X size={20} /></button>
        </div>
        <p className="mt-6 whitespace-pre-wrap break-words text-sm leading-8 text-neutral-300">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2">{project.technologies.map((technology) => <li key={technology} className="rounded-full border border-white/20 px-4 py-2 text-xs text-accent">{technology}</li>)}</ul>
        <div className="mt-7 flex flex-wrap gap-6">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-accent hover:underline">Live demo <ArrowUpRight size={17} /></a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-accent">Source code <ArrowUpRight size={17} /></a>}
        </div>
      </div>
    </dialog>
  );
}
