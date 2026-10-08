import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationItems } from './Navigation';

export default function MenuButton() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return (
    <div className="fixed top-5 right-5 z-50 lg:top-16 lg:right-8">
      <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="page-menu" onClick={() => setOpen(!open)} className="grid size-12 place-items-center rounded-full border border-white/30 bg-[#1f1f1f]/95 hover:border-accent hover:text-accent">{open ? <X size={22} /> : <Menu size={22} />}</button>
      {open && <nav id="page-menu" aria-label="Page menu" className="menu-panel absolute top-16 right-0 max-h-[75svh] w-64 overflow-y-auto rounded-2xl border border-white/20 bg-[#202020] p-4 shadow-2xl">
        {navigationItems.map(({ id, label, Icon }) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-neutral-300 hover:bg-white/5 hover:text-accent"><Icon size={17} strokeWidth={1.5} />{label}</a>)}
      </nav>}
    </div>
  );
}
