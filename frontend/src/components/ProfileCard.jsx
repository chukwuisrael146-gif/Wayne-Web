import { Mail } from 'lucide-react';
import { profile } from '../data/profile';

const socialLinks = [
  { label: 'Instagram', url: '' },
  { label: 'Twitter', url: '' },
  { label: 'LinkedIn', url: '' },
  { label: 'GitHub', url: '' },
];

function SocialIcon({ label }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {label === 'Instagram' && <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" /></>}
      {label === 'Twitter' && <><path d="M4 3h4l12 18h-4L4 3Z" /><path d="m20 3-16 18" /></>}
      {label === 'LinkedIn' && <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7m4 0v-7m0 3c0-4 6-4 6 0v4" /><circle cx="7" cy="7" r="0.8" fill="currentColor" stroke="none" /></>}
      {label === 'GitHub' && <><path d="M9 20c-5 1-5-3-7-3m14 5v-4c0-1-.3-2-1-2.5 4-.5 6-2 6-6 0-1.5-.5-2.5-1.5-3.5.3-1 .3-2-.2-3-2 0-3 1-4 1.5a13 13 0 0 0-6.6 0C7.7 4 6.7 3 4.7 3c-.5 1-.5 2-.2 3C3.5 7 3 8 3 9.5c0 4 2 5.5 6 6-.7.5-1 1.5-1 2.5v4" /></>}
    </svg>
  );
}

export default function ProfileCard() {
  const logo = `${import.meta.env.BASE_URL}images/ci-logo.png`;
  const email = profile.email;

  return (
    <aside
      aria-label="Profile"
      className="
        profile-card relative z-20 mx-auto flex w-full max-w-[400px]
        flex-col rounded-[30px] border border-[#565656] bg-[#1f1f1f]/95
        px-8 py-10 lg:sticky lg:top-16 lg:mx-0 lg:self-start
        lg:min-h-[calc(100svh-128px)] xl:px-12 xl:py-12
      "
    >
      <header className="flex shrink-0 items-center justify-between gap-4">
        <a href="#home" aria-label="Chukwu Israel — home" className="inline-flex shrink-0 items-center">
          <img src={logo} alt="Chukwu Israel logo" className="h-16 w-20 object-contain" />
        </a>
        <p className="text-right text-sm leading-6">
          Full Stack<br />Developer
        </p>
      </header>

      <div className="profile-card__portrait my-8 aspect-[6/5] w-full shrink-0 overflow-hidden rounded-[30px] bg-neutral-800">
        <img src={logo} alt="Chukwu Israel CI monogram" className="h-full w-full object-contain p-5" />
      </div>

      <div className="text-center">
        {email ? (
          <a href={`mailto:${email}`} className="text-lg break-all hover:text-accent">{email}</a>
        ) : (
          <p className="text-lg text-[#999]">Full Stack Developer</p>
        )}
        <p className="mt-1 text-[22px] leading-8">Based in Nigeria</p>
        <p className="profile-card__copyright mt-7 text-sm leading-6 text-[#999]">
          © {new Date().getFullYear()} Chukwu Israel. All rights reserved.
        </p>
      </div>

      <div className="profile-card__socials mt-6 flex shrink-0 justify-center gap-2">
        {socialLinks.map(({ label }) => {
          const url = profile.socials[label];
          const classes = 'grid size-12 place-items-center rounded-full border-2 border-[#565656] text-[#999] transition-colors';
          return url ? (
            <a key={label} href={url} aria-label={label} target="_blank" rel="noopener noreferrer" className={`${classes} hover:border-accent hover:text-accent`}>
              <SocialIcon label={label} />
            </a>
          ) : (
            <span key={label} aria-label={`${label} link not added yet`} className={classes}>
              <SocialIcon label={label} />
            </span>
          );
        })}
      </div>

      <div className="profile-card__contact mt-auto shrink-0 pt-7">
        <a href="#contact" className="flex h-[52px] items-center justify-center gap-3 rounded-full border border-accent bg-accent text-sm font-medium text-black transition-colors hover:bg-transparent hover:text-accent">
          <Mail size={20} strokeWidth={1.5} />
          HIRE ME!
        </a>
      </div>
    </aside>
  );
}
