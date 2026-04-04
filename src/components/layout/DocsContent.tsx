export function DocsContent({ children }: { children: React.ReactNode }) {
  return (
    <article data-docs-content className="mx-auto w-full max-w-4xl py-6 md:py-8">
      {children}
    </article>
  );
}
