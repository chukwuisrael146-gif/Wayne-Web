import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/profile';

const inputClasses = 'mt-3 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-accent';

export default function Contact() {
  const [draft, setDraft] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');

  function prepareMessage(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const subject = `${fields.get('subject')} — ${fields.get('name').trim()}`;
    const body = `Name: ${fields.get('name').trim()}\nEmail: ${fields.get('email').trim()}\n\n${fields.get('message').trim()}`;
    setDraft({ subject, body });
    setCopyStatus('');
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(`Subject: ${draft.subject}\n\n${draft.body}`);
      setCopyStatus('Copied. Your message is ready to paste.');
    } catch {
      setCopyStatus('Select and copy the message below.');
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 py-20">
      <SectionHeading Icon={Mail} label="Contact">Let’s build something <span className="text-accent">together.</span></SectionHeading>
      <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400">Have a website in mind or a project you’d like to discuss? Tell me a little about it.</p>
      {profile.email && <a href={`mailto:${profile.email}`} className="mt-6 inline-block text-xl break-all text-accent hover:underline">{profile.email}</a>}
      <form onSubmit={prepareMessage} onChange={() => { setDraft(null); setCopyStatus(''); }} className="mt-10 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block text-xs tracking-widest text-neutral-300">FULL NAME <span className="text-accent">*</span><input name="name" autoComplete="name" required maxLength={100} placeholder="Your name" className={inputClasses} /></label>
          <label className="block text-xs tracking-widest text-neutral-300">EMAIL <span className="text-accent">*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className={inputClasses} /></label>
        </div>
        <label className="block text-xs tracking-widest text-neutral-300">SUBJECT <span className="text-accent">*</span><select name="subject" className={`${inputClasses} bg-[#202020]`} defaultValue="Website project"><option>Website project</option><option>Frontend development</option><option>Backend development</option><option>Website improvement</option><option>Other enquiry</option></select></label>
        <label className="block text-xs tracking-widest text-neutral-300">MESSAGE <span className="text-accent">*</span><textarea name="message" required minLength={20} maxLength={5000} rows={5} placeholder="What would you like to build?" className={`${inputClasses} resize-y leading-7`} /></label>
        <p className="text-xs leading-6 text-neutral-400">Prepare a message to review and copy. This form does not send messages directly.</p>
        <button type="submit" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-accent bg-accent px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-transparent hover:text-accent">Prepare message <ArrowUpRight size={18} /></button>
      </form>
      {draft && (
        <div className="mt-8 rounded-[24px] border border-white/20 bg-[#1f1f1f]/95 p-6">
          <h3 className="text-lg font-medium">Your message is ready to review</h3>
          <p className="mt-4 text-sm text-accent">{draft.subject}</p>
          <textarea aria-label="Prepared message" value={draft.body} readOnly rows={7} className={`${inputClasses} text-sm leading-7`} />
          <div className="mt-5 flex flex-wrap gap-4">
            <button type="button" onClick={copyMessage} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm hover:border-accent">{copyStatus.startsWith('Copied') ? <Check size={16} /> : <Copy size={16} />}Copy message</button>
            {profile.email && <a href={`mailto:${profile.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm text-black">Open email app <ArrowUpRight size={16} /></a>}
          </div>
          <p role="status" className="mt-3 text-sm text-neutral-400">{copyStatus}</p>
        </div>
      )}
    </section>
  );
}
