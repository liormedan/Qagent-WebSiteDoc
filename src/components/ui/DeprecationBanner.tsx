import Link from "next/link";

type DeprecationBannerProps = {
  replacementHref?: string;
  replacementLabel?: string;
  title?: string;
  body?: string;
};

export function DeprecationBanner({ replacementHref, replacementLabel, title, body }: DeprecationBannerProps) {
  if (replacementHref && replacementLabel) {
    return (
      <div className="rounded-lg border border-amber-700 bg-amber-950/30 p-4">
        <p className="font-semibold text-amber-200">Deprecated Page</p>
        <p className="mt-1 text-sm text-amber-100">
          This page is kept for compatibility. Use{" "}
          <Link className="font-semibold underline hover:text-amber-50" href={replacementHref}>
            {replacementLabel}
          </Link>{" "}
          as the canonical reference.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-amber-700 bg-amber-950/30 p-4">
      <p className="font-semibold text-amber-200">{title ?? "Notice"}</p>
      <p className="mt-1 text-sm text-amber-100">{body ?? "This page contains legacy documentation."}</p>
    </div>
  );
}
