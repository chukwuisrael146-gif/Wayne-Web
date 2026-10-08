import { ArrowDown, Home } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[calc(100svh-64px)] scroll-mt-16 pb-20"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs">
        <Home size={14} strokeWidth={1.5} />
        INTRODUCE
      </div>

      <h1 className="mt-12 text-[clamp(42px,5.8vw,88px)] leading-[1.12] font-light tracking-[-0.045em]">
        Say Hi from
        <span className="text-accent"> Chukwu Israel,</span>
        <br />
        Full Stack Web Developer.
      </h1>

      <p className="mt-8 max-w-lg text-base leading-8 text-neutral-400">
        I build websites from interface to backend, bringing design
        and functionality together with React and Django. I focus on
        creating responsive experiences that look good and work smoothly.
      </p>

      <div className="mt-10 flex justify-end">
        <a
          href="#projects"
          aria-label="Explore my projects"
          className="relative grid size-40 place-items-center rounded-full border border-white/30 transition-colors hover:border-accent hover:text-accent"
        >
          <svg
            viewBox="0 0 144 144"
            aria-hidden="true"
            className="absolute inset-0 size-full motion-safe:animate-[spin_18s_linear_infinite]"
          >
            <defs>
              <path
                id="project-circle"
                d="M72,72 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0"
              />
            </defs>

            <text fill="currentColor" fontSize="11" letterSpacing="3">
              <textPath href="#project-circle">
                MY PROJECTS • EXPLORE MY WORK •
              </textPath>
            </text>
          </svg>

          <ArrowDown size={36} strokeWidth={1.2} />
        </a>
      </div>

      <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12">
        <div>
          <dt className="text-[72px] leading-none font-light tracking-tight text-accent">
            5
          </dt>
          <dd className="mt-5 text-sm leading-6 text-neutral-400">
            COMPLETED
            <br />
            PROJECTS
          </dd>
        </div>

        <div>
          <dt className="text-3xl leading-tight font-light text-accent sm:text-4xl">
            React + Django
          </dt>
          <dd className="mt-5 text-sm leading-6 text-neutral-400">
            MY DEVELOPMENT
            <br />
            STACK
          </dd>
        </div>
      </dl>
    </section>
  );
}