type LegalSection = {
  heading: string;
  body: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, title, intro, lastUpdated, sections }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="glass-panel rounded-[36px] p-6 sm:p-8 md:p-12">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300/80">{eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">{title}</h1>
          <p className="mt-6 text-sm leading-7 text-white/70 sm:text-base">{intro}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/45">Last updated: {lastUpdated}</p>
        </div>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.heading} className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <h2 className="font-display text-2xl text-white">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-white/70 sm:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
