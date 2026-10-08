import { useEffect, useState } from 'react';
import {
  Home,
  UserRound,
  BriefcaseBusiness,
  Layers,
  Shapes,
  LayoutGrid,
  MessageSquare,
  Mail,
  GitBranch,
} from 'lucide-react';

export const navigationItems = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'about', label: 'About', Icon: UserRound },
  { id: 'resume', label: 'Resume', Icon: BriefcaseBusiness },
  { id: 'services', label: 'Services', Icon: Layers },
  { id: 'skills', label: 'Skills', Icon: Shapes },
  { id: 'projects', label: 'Portfolio', Icon: LayoutGrid },
  { id: 'contributions', label: 'GitHub contributions', Icon: GitBranch },
  { id: 'testimonials', label: 'Testimonials', Icon: MessageSquare },
  { id: 'contact', label: 'Contact', Icon: Mail },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let frame;

    function updateActiveSection() {
      let current = 'home';

      for (const { id } of navigationItems) {
        const section = document.getElementById(id);

        if (
          section &&
          section.getBoundingClientRect().top <= window.innerHeight * 0.35
        ) {
          current = id;
        }
      }

      setActiveSection(current);
    }

    function scheduleUpdate() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="
        fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-24px)]
        -translate-x-1/2 rounded-full border border-white/30
        bg-[#171717]/95 p-1 backdrop-blur-md overflow-x-auto
        lg:top-1/2 lg:right-8 lg:bottom-auto lg:left-auto
        lg:max-h-[90svh] lg:translate-x-0 lg:-translate-y-1/2
        lg:flex-col lg:py-4 lg:overflow-visible
      "
    >
      {navigationItems.map(({ id, label, Icon }) => {
        const active = activeSection === id;

        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={active ? 'location' : undefined}
            className={`
              group relative flex h-11 w-8 shrink-0 items-center min-[375px]:w-9 sm:w-10
              justify-center rounded-full transition-colors lg:h-11 lg:w-12
              ${active ? 'text-accent' : 'text-neutral-400 hover:text-accent'}
            `}
          >
            <Icon size={19} strokeWidth={1.5} />

            <span
              className="
                pointer-events-none absolute right-full mr-4 hidden
                rounded-md bg-neutral-800 px-3 py-1.5 text-xs text-white
                opacity-0 transition-opacity
                lg:block lg:group-hover:opacity-100
                lg:group-focus-visible:opacity-100
              "
            >
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
