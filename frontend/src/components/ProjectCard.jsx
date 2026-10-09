import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project }) {
  const [failedImage, setFailedImage] = useState("");
  const showImage = project.image && failedImage !== project.image;

  return (
    <article className="flex h-full min-w-0 flex-col">
      <div className="motion-card group relative aspect-[16/10] shrink-0 overflow-hidden rounded-[28px] border border-white/15 bg-[#242424]">
        {showImage ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            onError={() => setFailedImage(project.image)}
            className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-[1200ms] motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-safe:group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center bg-linear-to-br from-[#29352f] to-[#171717]">
            <span className="text-7xl font-light text-white/15">
              {String(project.id).padStart(2, "0")}
            </span>
          </div>
        )}

        {project.technologies.length > 0 && (
          <ul className="absolute right-5 bottom-5 left-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full bg-white px-4 py-2 text-xs text-black"
              >
                {technology}
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="mt-5 min-h-16 line-clamp-2 text-2xl leading-8 font-light">
        {project.title}
      </h3>

      <p className="mt-3 min-h-21 line-clamp-3 text-sm leading-7 text-neutral-400">
        {project.description || ""}
      </p>

      <div className="mt-auto flex min-h-15 flex-wrap items-center gap-x-6 pt-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline"
          >
            Live demo
            <ArrowUpRight size={16} />
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-neutral-300 hover:text-accent"
          >
            Source code
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </article>
  );
}
