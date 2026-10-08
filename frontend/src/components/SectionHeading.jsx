export default function SectionHeading({ Icon, label, children }) {
  return (
    <>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs uppercase">
        <Icon size={14} strokeWidth={1.5} />{label}
      </div>
      <h2 className="mt-10 text-4xl leading-tight font-light tracking-tight sm:text-5xl">{children}</h2>
    </>
  );
}
