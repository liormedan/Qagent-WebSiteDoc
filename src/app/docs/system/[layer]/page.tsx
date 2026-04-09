import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";

const layerTitles: Record<string, string> = {
  "client-frontend-layer": "Client / Frontend Layer",
  "qagent-layer": "QAgent Layer",
  "api-server-layer": "API Server Layer",
  "dsp-processing-layer": "DSP / Processing Layer",
  "data-layer": "Data Layer",
  "infrastructure-layer": "Infrastructure Layer",
  "auth-security-layer": "Auth & Security Layer",
  "end-to-end-flow": "End-to-End Flow (cross-layer flow)",
};

const layerCanonicalLinks: Record<string, string> = {
  "client-frontend-layer": "/docs/client",
  "qagent-layer": "/docs/q-agent",
  "api-server-layer": "/docs/api",
  "dsp-processing-layer": "/docs/dsp-layer",
  "data-layer": "/docs/data-layer",
  "infrastructure-layer": "/docs/infrastructure-layer",
  "auth-security-layer": "/docs/auth-security",
  "end-to-end-flow": "/docs/system-flow",
};

export default async function SystemLayerPage({ params }: { params: Promise<{ layer: string }> }) {
  const { layer } = await params;
  const title = layerTitles[layer];
  const canonicalHref = layerCanonicalLinks[layer];

  if (!title || !canonicalHref) {
    notFound();
  }

  return (
    <DocsContent>
      <PageTitle title={title} description="This page is intentionally empty and ready for content." />
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>
      <div className="rounded-md border border-[var(--border)] bg-slate-900/30 px-4 py-3 text-sm text-slate-300">
        This layer is documented in its dedicated section.
        <br />
        <Link href={canonicalHref} className="mt-1 inline-block font-medium text-[var(--accent)] hover:underline">
          Open canonical page
        </Link>
      </div>
    </DocsContent>
  );
}
