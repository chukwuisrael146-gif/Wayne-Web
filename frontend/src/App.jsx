import AbstractBallBackground from './components/AbstractBallBackground';
import ProfileCard from './components/ProfileCard';
import SettingsButton from './components/SettingsButton';
import Navigation, {
  navigationItems,
} from './components/Navigation';
import Hero from './sections/Hero';

export default function App() {
  return (
    <>
      <AbstractBallBackground />
      <SettingsButton />
      <Navigation />

      <div
        className="
          portfolio-layout relative z-10 grid items-start gap-12
          px-5 pt-16 pb-24
          lg:grid-cols-[350px_minmax(0,1fr)] lg:pr-36
          xl:grid-cols-[400px_minmax(0,1fr)]
        "
      >
        <ProfileCard />

        <main className="min-w-0">
          <div className="mx-auto max-w-[770px]">
            <Hero />

            {navigationItems
              .filter(({ id }) => id !== 'home')
              .map(({ id, label, Icon }) => (
                <section
                  key={id}
                  id={id}
                  className="min-h-[60svh] scroll-mt-16 py-20"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs uppercase">
                    <Icon size={14} strokeWidth={1.5} />
                    {label}
                  </div>

                  <h2 className="mt-10 text-4xl font-light tracking-tight sm:text-5xl">
                    {label}
                  </h2>

                  <p className="mt-6 leading-8 text-neutral-400">
                    This section’s content will be added next.
                  </p>
                </section>
              ))}
          </div>
        </main>
      </div>
    </>
  );
}
