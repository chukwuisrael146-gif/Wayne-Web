import AbstractBallBackground from './components/AbstractBallBackground';
import ProfileCard from './components/ProfileCard';
import SettingsButton from './components/SettingsButton';
import Navigation from './components/Navigation';
import MenuButton from './components/MenuButton';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Services from './sections/Services';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contributions from './sections/Contributions';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

export default function App() {
  return (
    <>
      <AbstractBallBackground />
      <SettingsButton />
      <Navigation />
      <MenuButton />
      <a href="#main-content" className="sr-only fixed top-2 left-12 z-[60] rounded-lg bg-accent px-5 py-3 text-black focus:not-sr-only">Skip to content</a>
      <div className="portfolio-layout relative z-10 grid items-start gap-12 px-5 pt-16 pb-24 lg:grid-cols-[350px_minmax(0,1fr)] lg:pr-36 xl:grid-cols-[400px_minmax(0,1fr)]">
        <ProfileCard />
        <main id="main-content" tabIndex={-1} className="min-w-0">
          <div className="mx-auto max-w-[770px]">
            <Hero />
            <About />
            <Experience />
            <Services />
            <Skills />
            <Projects />
            <Contributions />
            <Testimonials />
            <Contact />
            <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 py-8 text-xs text-neutral-500">
              <p>© {new Date().getFullYear()} Chukwu Israel</p>
              <a href="#home" className="inline-flex min-h-11 items-center hover:text-accent">Back to top ↑</a>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}
