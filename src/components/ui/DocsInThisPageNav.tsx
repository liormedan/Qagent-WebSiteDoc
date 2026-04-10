import Link from "next/link";

type NavItem = {
  title: string;
  subtitle: string;
  href: string;
};

export function DocsInThisPageNav({ items }: { items: NavItem[] }) {
  return (
    <div className="grid gap-2 text-sm md:grid-cols-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60">
          <p className="font-semibold text-slate-100 group-hover:text-cyan-200">{item.title}</p>
          <p className="text-xs text-slate-400">{item.subtitle}</p>
        </Link>
      ))}
    </div>
  );
}
