import Link from "next/link";

type NavItem = {
  title: string;
  subtitle: string;
  href: string;
};

const NAV_CARD_CLASS =
  "group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60";
const NAV_TITLE_TYPO_CLASS = "text-xs font-semibold uppercase tracking-[0.14em] leading-5 text-slate-100 group-hover:text-cyan-200";
const NAV_SUBTITLE_TYPO_CLASS = "mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] leading-5 text-slate-400";

export function DocsInThisPageNav({ items }: { items: NavItem[] }) {
  return (
    <div className="grid gap-2 text-sm md:grid-cols-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={NAV_CARD_CLASS}>
          <p className={NAV_TITLE_TYPO_CLASS}>{item.title}</p>
          <p className={NAV_SUBTITLE_TYPO_CLASS}>{item.subtitle}</p>
        </Link>
      ))}
    </div>
  );
}
