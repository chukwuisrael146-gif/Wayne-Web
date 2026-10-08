import { useEffect, useState } from 'react';
import { Settings, X } from 'lucide-react';

const colours = [
  { name: 'Green', value: '#28e98c' },
  { name: 'Teal', value: '#71e4cc' },
  { name: 'Purple', value: '#b28cff' },
  { name: 'Orange', value: '#ffad66' },
];

export default function SettingsButton() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('#28e98c');

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') setOpen(false);
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  function changeColour(colour) {
    setSelected(colour);
    document.documentElement.style.setProperty('--color-accent', colour);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Appearance settings"
        aria-expanded={open}
        aria-controls="appearance-settings"
        onClick={() => setOpen(!open)}
        className="
          fixed top-[50px] left-0 z-50 grid size-10 place-items-center
          rounded-r-md bg-[#262626] text-[#999]
          transition-colors hover:text-accent
          focus-visible:outline-2 focus-visible:outline-accent
        "
      >
        <Settings size={19} strokeWidth={1.5} />
      </button>

      {open && (
        <section
          id="appearance-settings"
          aria-label="Appearance settings"
          className="
            fixed top-[100px] left-3 z-50 w-64 rounded-2xl
            border border-white/20 bg-[#202020] p-5 shadow-2xl
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Appearance</h2>

            <button
              type="button"
              aria-label="Close settings"
              onClick={() => setOpen(false)}
              className="grid size-8 place-items-center rounded-full hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <p className="mt-5 text-sm text-neutral-400">
            Accent colour
          </p>

          <div className="mt-3 flex gap-3">
            {colours.map(({ name, value }) => (
              <button
                key={value}
                type="button"
                aria-label={name}
                aria-pressed={selected === value}
                onClick={() => changeColour(value)}
                style={{ backgroundColor: value }}
                className={`
                  size-9 rounded-full border-2
                  ${selected === value ? 'border-white' : 'border-transparent'}
                  focus-visible:outline-2 focus-visible:outline-offset-4
                  focus-visible:outline-white
                `}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}