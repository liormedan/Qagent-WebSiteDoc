import { DocsContent } from "@/components/layout/DocsContent";
import { NavCard } from "@/components/ui/NavCard";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getNavigationByGroup, getNavigationGroups } from "@/lib/navigation";

export default function DocsIndexPage() {
  const groups = getNavigationGroups();

  return (
    <DocsContent>
      <PageTitle
        title="WaveQ Documentation"
        description="Flow-first documentation: understand one request path before diving into technical references."
      />
      <SectionBlock
        title="Q Operational Flow"
        body={[
          "User Input -> Context Assembly -> Intent Detection -> Reasoning/Clarification -> Planning -> Safety -> DAL Generation -> Validation -> Execution Handoff",
          "Audio Sandbox supports query and analysis before planning or execution decisions.",
        ]}
      />

      {groups.map((group) => {
        const items = getNavigationByGroup(group);
        return (
          <section className="mt-8" key={group}>
            <details>
              <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-[var(--panel)] px-4 py-3">
                <h2 className="text-2xl font-semibold">{group}</h2>
                <span className="text-sm text-[var(--muted)]">{items.length} pages</span>
              </summary>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((item) => (
                  <NavCard
                    key={item.href}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    section={item.group}
                  />
                ))}
              </div>
            </details>
          </section>
        );
      })}
    </DocsContent>
  );
}
