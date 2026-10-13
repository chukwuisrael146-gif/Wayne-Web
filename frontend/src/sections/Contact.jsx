import { useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle, Mail } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/profile';
import { submitEnquiry } from '../services/api';

const inputClasses = 'mt-3 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-accent disabled:opacity-60';
const subjects = ['Website project', 'Frontend development', 'Backend development', 'Website improvement', 'Other enquiry'];

function FieldError({ name, errors }) {
  if (!errors[name]) return null;
  return <span id={`${name}-error`} className="mt-2 block text-sm tracking-normal text-red-300">{[].concat(errors[name]).join(' ')}</span>;
}

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState({});
  const inFlight = useRef(false);
  const submission = useRef(null);
  const statusRef = useRef(null);
  const sending = status === 'sending';

  async function sendMessage(event) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = Object.fromEntries(['name', 'email', 'subject', 'message', 'website'].map((name) => [name, String(fields.get(name) || '').trim()]));
    const validation = {};
    if (!payload.name) validation.name = ['Enter your name.'];
    if (payload.message.length < 20) validation.message = ['Please use at least 20 characters.'];
    if (Object.keys(validation).length) {
      setErrors(validation);
      setStatus('error');
      setFeedback('Please check the highlighted fields.');
      form.elements.namedItem(Object.keys(validation)[0])?.focus();
      return;
    }
    // Reuse the ID on a network retry so a lost response does not create duplicates.
    const fingerprint = JSON.stringify(payload);
    if (submission.current?.fingerprint !== fingerprint) {
      submission.current = { fingerprint, id: crypto.randomUUID() };
    }
    inFlight.current = true;
    setStatus('sending');
    setFeedback('Sending your enquiry…');
    setErrors({});
    try {
      const result = await submitEnquiry({ ...payload, submission_id: submission.current.id });
      form.reset();
      submission.current = null;
      setStatus('success');
      setFeedback(result.message);
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (error) {
      setStatus('error');
      setFeedback(error.message);
      setErrors(error.fields || {});
      const first = ['name', 'email', 'subject', 'message'].find((name) => error.fields?.[name]);
      requestAnimationFrame(() => first ? form.elements.namedItem(first)?.focus() : statusRef.current?.focus());
    } finally {
      inFlight.current = false;
    }
  }

  const fieldProps = (name) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  return (
    <section id="contact" className="scroll-mt-16 py-20">
      <SectionHeading Icon={Mail} label="Contact">Let’s build something <span className="text-accent">together.</span></SectionHeading>
      <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400">Have a website in mind or a project you’d like to discuss? Tell me a little about it.</p>
      <a href={`mailto:${profile.email}`} className="mt-6 inline-block text-xl break-all text-accent hover:underline">{profile.email}</a>
      <form onSubmit={sendMessage} aria-busy={sending} className="mt-10 space-y-6">
        <fieldset disabled={sending} className="min-w-0 space-y-6">
          <legend className="sr-only">Send a project enquiry</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-xs tracking-widest text-neutral-300">FULL NAME <span className="text-accent">*</span>
              <input name="name" autoComplete="name" required maxLength={100} placeholder="Your name" className={inputClasses} {...fieldProps('name')} />
              <FieldError name="name" errors={errors} />
            </label>
            <label className="block text-xs tracking-widest text-neutral-300">EMAIL <span className="text-accent">*</span>
              <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className={inputClasses} {...fieldProps('email')} />
              <FieldError name="email" errors={errors} />
            </label>
          </div>
          <label className="block text-xs tracking-widest text-neutral-300">SUBJECT <span className="text-accent">*</span>
            <select name="subject" required className={`${inputClasses} bg-[#202020]`} defaultValue={subjects[0]} {...fieldProps('subject')}>
              {subjects.map((subject) => <option key={subject}>{subject}</option>)}
            </select>
            <FieldError name="subject" errors={errors} />
          </label>
          <label className="block text-xs tracking-widest text-neutral-300">MESSAGE <span className="text-accent">*</span>
            <textarea name="message" required minLength={20} maxLength={5000} rows={5} placeholder="What would you like to build?" className={`${inputClasses} resize-y leading-7`} {...fieldProps('message')} />
            <FieldError name="message" errors={errors} />
          </label>
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" maxLength={200} /></label>
          </div>
          <p className="text-xs leading-6 text-neutral-400">Your name, email, and message are saved so I can respond to your enquiry. Please avoid including passwords or sensitive information.</p>
          <button type="submit" disabled={sending} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-accent bg-accent px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-transparent hover:text-accent disabled:cursor-wait disabled:opacity-60">
            {sending ? 'Sending…' : 'Send message'}
            {sending ? <LoaderCircle size={18} className="animate-spin" /> : <ArrowUpRight size={18} />}
          </button>
        </fieldset>
        <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true" className={`rounded-xl text-sm leading-7 outline-none ${feedback ? 'border p-4' : ''} ${status === 'error' ? 'border-red-300/30 text-red-200' : 'border-accent/30 text-accent'}`}>
          {status === 'success' && <CheckCircle2 size={18} className="mr-2 inline-block" />}{feedback}
          {status === 'error' && <a href={`mailto:${profile.email}`} className="mt-2 block underline underline-offset-4">Email me directly instead</a>}
        </div>
      </form>
    </section>
  );
}
