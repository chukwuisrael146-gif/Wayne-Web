import { GitHubCalendar } from 'react-github-calendar';
import { ArrowUpRight, GitBranch } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const username = 'chukwuisrael146-gif';

const calendarTheme = {
  dark: [
    '#282e2b',
    '#145738',
    '#1b8956',
    '#21bd73',
    '#28e98c',
  ],
};

export default function Contributions() {
  return (
    <section
      id="contributions"
      className="scroll-mt-16 py-20"
    >
      <SectionHeading
        Icon={GitBranch}
        label="GitHub contributions"
      >
        Building, one{' '}
        <span className="text-accent">commit at a time</span>
      </SectionHeading>

      <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400">
        My GitHub activity over the past year—a look at the work
        behind my projects.
      </p>

      <div className="mt-10 min-w-0 rounded-[28px] border border-white/20 bg-[#1f1f1f]/85 p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-neutral-300">
            @{username}
          </p>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline"
          >
            View GitHub
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-6 overflow-x-auto pb-3 text-sm text-neutral-300">
          <GitHubCalendar
            username={username}
            year="last"
            colorScheme="dark"
            theme={calendarTheme}
            blockSize={11}
            blockMargin={4}
            blockRadius={3}
            fontSize={12}
            errorMessage="GitHub activity is temporarily unavailable. You can still visit my GitHub profile above."
          />
        </div>
      </div>
    </section>
  );
}