export function DocsContent({ children }: { children: React.ReactNode }) {
  return (
    <article data-docs-content className="mx-auto w-full max-w-4xl overflow-x-hidden py-6 md:py-8">
      {children}
    </article>
  );
}
