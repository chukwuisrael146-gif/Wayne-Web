import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, LayoutGrid } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { fetchProjects } from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchProjects(controller.signal);

        if (!controller.signal.aborted) {
          setProjects(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof TypeError
              ? "Unable to reach the server. Please try again."
              : err.message,
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => controller.abort();
  }, [attempt]);

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

      {loading && (
        <p role="status" className="mt-10 text-neutral-400">
          Loading projects…
        </p>
      )}

      {!loading && error && (
        <div className="mt-10 rounded-2xl border border-white/20 p-6">
          <p role="alert" className="text-neutral-300">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setAttempt((value) => value + 1)}
            className="mt-4 min-h-11 rounded-full border border-accent px-6 text-sm text-accent hover:bg-accent hover:text-black"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="mt-10 text-neutral-400">
          Projects will appear here soon.
        </p>
      )}

      {!loading && !error && projects.length > 0 && (
        <>
          <div
            id="project-list"
            className="mt-10 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2"
          >
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
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
                {showAll ? "View fewer projects" : "View more projects"}
                {showAll ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
