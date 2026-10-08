import { UserRound } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 py-20">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs">
        <UserRound size={14} strokeWidth={1.5} />
        ABOUT
      </div>

      <h2 className="mt-10 max-w-2xl text-4xl leading-tight font-light tracking-tight sm:text-5xl">
        Bringing ideas to life,
        <span className="text-accent"> from interface to backend.</span>
      </h2>

      <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-neutral-400">
        <p>
          I’m Chukwu Israel, a full stack web developer working with
          React and Django. I enjoy turning ideas into websites,
          connecting the interfaces people interact with to the
          systems behind them.
        </p>

        <p>
          With five completed projects, I’m continuing to develop
          my craft through hands-on work, focusing on responsive
          design, useful features, and a consistent user experience.
        </p>
      </div>

      <a
        href="#projects"
        className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm text-accent underline-offset-8 hover:underline"
      >
        Explore my projects ↗
      </a>
    </section>
  );
}