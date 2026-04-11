/**
 * Docs template: remounts on each in-docs navigation so client layout + RSC
 * children do not reuse a stale subtree (see Next.js template behavior).
 */
export default function DocsTemplate({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
