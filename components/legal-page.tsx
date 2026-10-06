import { PageShell } from "@/components/site";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export function LegalPage({
  eyebrow,
  title,
  lastUpdated = "[DATE]",
  sections,
}: {
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  sections: LegalSection[];
}) {
  return (
    <PageShell>
      <header className="page-hero legal-hero">
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>Last updated: {lastUpdated}</p>
        </div>
      </header>
      <article className="legal-page">
        <p className="legal-draft-notice">
          Draft for review. Replace every value in square brackets before publishing and ask a UK solicitor to review this page.
        </p>
        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}
      </article>
    </PageShell>
  );
}
