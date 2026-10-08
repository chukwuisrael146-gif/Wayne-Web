import { ArrowDown, Home } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="min-h-[calc(100svh-64px)] scroll-mt-16 pb-20">
      <div
        className="
          inline-flex items-center gap-2 rounded-full
          border border-white/30 px-5 py-2 text-xs
        "
      >
        <Home size={14} strokeWidth={1.5} />
        INTRODUCE
      </div>

      <h1
        className="
          mt-12 text-[clamp(42px,5.8vw,88px)] leading-[1.12]
          font-light tracking-[-0.045em]
        "
      >
        Say Hi from <span className="text-accent">Israel,</span>
        <br />
        Full Stack Developer
      </h1>

      <p className="mt-8 max-w-lg text-base leading-8 text-neutral-400">
        I build thoughtful interfaces and reliable backends with React and
        Django.
      </p>

      <div className="mt-12 flex justify-end">
        <a
          href="#projects"
          aria-label="Explore my projects"
          className="
            relative grid size-36 place-items-center rounded-full
            border border-white/30 transition-colors
            hover:border-accent hover:text-accent
          "
        >
          <svg
            viewBox="0 0 144 144"
            aria-hidden="true"
            className="
              absolute inset-0 size-full
              motion-safe:animate-[spin_18s_linear_infinite]
            "
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
    </section>
  );
}
