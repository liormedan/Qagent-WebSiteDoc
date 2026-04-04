import Link from "next/link";
import { notFound } from "next/navigation";
import { AutoAdvanceOnBottom } from "@/components/layout/AutoAdvanceOnBottom";
import { DocsContent } from "@/components/layout/DocsContent";
import { CodeExample } from "@/components/ui/CodeExample";
import { PageTitle } from "@/components/ui/PageTitle";
import { getDocPage } from "@/lib/docs";
import { getGroupBySlug, getGroupHubHref, getGroupNeighbors, getGroupSlug, getNavigationByGroup, getNavigationGroups } from "@/lib/navigation";

function anchorIdFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0590-\u05ff\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function generateStaticParams() {
  return getNavigationGroups().map((group) => ({ group: getGroupSlug(group) }));
}

export default async function GroupSectionPage({ params }: { params: Promise<{ group: string }> }) {
  const { group: groupParam } = await params;
  const group = getGroupBySlug(groupParam);
  if (!group) return notFound();

  const items = getNavigationByGroup(group);
  if (!items.length) return notFound();
  const neighbors = getGroupNeighbors(group);
  const nextHref = neighbors.next ? getGroupHubHref(neighbors.next) : undefined;
  const previousHref = neighbors.previous ? getGroupHubHref(neighbors.previous) : undefined;

  return (
    <DocsContent>
      <AutoAdvanceOnBottom nextHref={nextHref} />
      <PageTitle
        title={group}
        description={`Unified long-form page for ${group}. Scroll through sections and use the right menu to jump between subtopics.`}
      />

      <div className="space-y-8">
        {items.map((item) => {
          const slug = item.href.replace(/^\/docs\//, "");
          const page = getDocPage(slug);
          const sectionId = anchorIdFromTitle(item.title);

          return (
            <section key={item.href} id={sectionId} className="rounded-xl bg-[var(--panel)] p-4 md:p-6">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="text-sm text-[var(--muted)]">{item.description}</p>
                {page ? <p className="text-sm text-slate-300">{page.description}</p> : null}
                <Link href={item.href} className="inline-block text-sm text-[var(--accent)] hover:underline">
                  Open dedicated page
                </Link>
              </div>

              {page?.sections?.length ? (
                <div className="mt-4 space-y-3">
                  {page.sections.map((section) => (
                    <details key={`${item.href}-${section.title}`} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3">
                      <summary className="cursor-pointer text-sm font-semibold text-slate-200">{section.title}</summary>
                      <div className="mt-3 space-y-2">
                        {section.body.map((line, idx) => (
                          <p key={`${section.title}-${idx}`} className="text-sm text-slate-300">
                            {line}
                          </p>
                        ))}
                        {section.code ? <CodeExample code={section.code} /> : null}
                      </div>
                    </details>
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-[var(--border)] pt-6">
        {previousHref ? (
          <Link href={previousHref} className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">
            Previous Topic
          </Link>
        ) : (
          <span />
        )}
        {nextHref ? (
          <Link href={nextHref} className="text-sm font-semibold text-[var(--accent)] hover:underline">
            Next Topic
          </Link>
        ) : null}
      </div>
    </DocsContent>
  );
}
