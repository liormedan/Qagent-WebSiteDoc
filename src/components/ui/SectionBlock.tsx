"use client";

import { ChevronRight } from "lucide-react";
import { linkConcepts } from "@/lib/docs/auto-link";

function renderLines(lines: readonly string[], keyPrefix: string, muted = false) {
  type Block = { type: "p" | "ul" | "ol"; lines: string[] };

  const blocks: Block[] = [];
  const pushLine = (type: Block["type"], value: string) => {
    const last = blocks[blocks.length - 1];
    if (last && last.type === type) {
      last.lines.push(value);
      return;
    }
    blocks.push({ type, lines: [value] });
  };

  lines.forEach((raw) => {
    let line = raw.trim();
    if (!line) return;

    const orderedInsideBullet = line.match(/^[-*•]\s*(\d+[.)]\s+.+)$/);
    if (orderedInsideBullet) {
      line = orderedInsideBullet[1];
    }

    const ordered = line.match(/^(\d+)[.)]\s+(.+)$/);
    if (ordered) {
      pushLine("ol", ordered[2]);
      return;
    }

    const unordered = line.match(/^[-*•]\s*(?:[-*•]\s*)?(.+)$/);
    if (unordered) {
      pushLine("ul", unordered[1]);
      return;
    }

    pushLine("p", line);
  });

  return blocks.map((block, blockIndex) => {
    const key = `${keyPrefix}-${block.type}-${blockIndex}`;

    if (block.type === "ul") {
      return (
        <ul key={key} className={muted ? "list-disc space-y-1 pl-5 text-sm leading-6 text-slate-300" : "list-disc space-y-1 pl-5 text-sm leading-6 text-slate-100"}>
          {block.lines.map((item, itemIndex) => (
            <li key={`${key}-li-${itemIndex}`}>{linkConcepts(item)}</li>
          ))}
        </ul>
      );
    }

    if (block.type === "ol") {
      return (
        <ol key={key} className={muted ? "list-decimal space-y-1 pl-5 text-sm leading-6 text-slate-300" : "list-decimal space-y-1 pl-5 text-sm leading-6 text-slate-100"}>
          {block.lines.map((item, itemIndex) => (
            <li key={`${key}-li-${itemIndex}`}>{linkConcepts(item)}</li>
          ))}
        </ol>
      );
    }

    return (
      <div key={key} className="space-y-2">
        {block.lines.map((item, itemIndex) => (
          <p key={`${key}-p-${itemIndex}`} className={muted ? "text-sm leading-7 text-slate-300" : "break-words text-sm leading-6 text-slate-100"}>
            {linkConcepts(item)}
          </p>
        ))}
      </div>
    );
  });
}

export function SectionBlock({
  id,
  title,
  body,
  children,
  childrenFirst = false,
  collapsible = false,
  tocHidden = false,
  plainStructured = false,
}: {
  id?: string;
  title: string;
  body: readonly string[];
  children?: React.ReactNode;
  childrenFirst?: boolean;
  collapsible?: boolean;
  tocHidden?: boolean;
  plainStructured?: boolean;
}) {
  const hasStructuredHeadings = body.some((line) => line.startsWith("### "));
  const summaryLines = body;

  const heading = (
    <h2 data-toc-title={title} data-toc-hidden={tocHidden ? "true" : undefined} className="break-words text-lg font-semibold leading-tight md:text-xl">
      {linkConcepts(title, 1)}
    </h2>
  );

  const content = (
    <>
      {hasStructuredHeadings ? (
        <div className="space-y-2">
          {childrenFirst && children ? <div className="pb-2">{children}</div> : null}
          {(() => {
            const groups: Array<{ heading: string; lines: string[] }> = [];
            let current: { heading: string; lines: string[] } | null = null;

            body.forEach((line) => {
              if (line.startsWith("### ")) {
                if (current) groups.push(current);
                current = { heading: line.replace(/^###\s+/, "").trim(), lines: [] };
                return;
              }
              if (!current) {
                current = { heading: "", lines: [] };
              }
              current.lines.push(line);
            });

            if (current) groups.push(current);

            if (plainStructured) {
              return groups.map((group, index) => (
                <div key={`${title}-group-${index}`} className="rounded-lg border border-[var(--border)] bg-slate-950/30 px-3 py-2">
                  {group.heading ? (
                    <h3 data-toc-title={group.heading} className="text-sm font-semibold text-slate-100 md:text-base">
                      {linkConcepts(group.heading, 1)}
                    </h3>
                  ) : null}
                  <div className="mt-2 space-y-2">{renderLines(group.lines, `${title}-structured-plain-${index}`)}</div>
                </div>
              ));
            }

            return groups.map((group, index) => {
              if (!group.heading) {
                return (
                  <div key={`${title}-group-${index}`} className="space-y-2">
                    {renderLines(group.lines, `${title}-structured-${index}`)}
                  </div>
                );
              }

              return (
                <details key={`${title}-group-${index}`} className="group/details rounded-lg border border-[var(--border)] bg-slate-950/30 px-3 py-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                    <h3 data-toc-title={group.heading} className="text-sm font-semibold text-slate-100 md:text-base">
                      {linkConcepts(group.heading, 1)}
                    </h3>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open/details:rotate-90" />
                  </summary>
                  <div className="mt-2 space-y-2">{renderLines(group.lines, `${title}-structured-${index}`)}</div>
                </details>
              );
            });
          })()}
          {!childrenFirst && children ? <div className="pt-2">{children}</div> : null}
        </div>
      ) : summaryLines.length > 0 ? (
        <div className="space-y-2">{renderLines(summaryLines, `${title}-summary`)}</div>
      ) : children ? (
        <div className="space-y-2">{children}</div>
      ) : null}
    </>
  );

  return (
    <section id={id} className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
      <div className="space-y-3">
        {collapsible ? (
          <details className="group/details" name="docs-primary-accordion">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
              {heading}
              <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open/details:rotate-90" />
            </summary>
            <div className="mt-3 space-y-3">{content}</div>
          </details>
        ) : (
          <>
            {heading}
            {content}
          </>
        )}
      </div>
    </section>
  );
}
