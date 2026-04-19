import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import {
  WAVEQ_STATE_FAILURE_MATRIX,
  WAVEQ_STATE_OWNERSHIP_MATRIX,
  WAVEQ_STATE_TRANSITION_MATRIX,
} from "@/lib/waveq-authority";

function MatrixTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-[var(--border)]">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-[var(--border)] bg-slate-950/70 text-xs uppercase tracking-wide text-slate-300">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-3 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]/80 text-slate-200">
          {rows.map((row, idx) => (
            <tr key={`${row[0]}-${idx}`} className="bg-slate-950/30">
              {row.map((cell, cellIdx) => (
                <td key={`${row[0]}-${cellIdx}`} className="px-3 py-2 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StateMachinePage() {
  return (
    <DocsContent>
      <PageTitle title="State Machine" description="Single Source of Truth" />
      <div className="flex flex-col gap-5">
        <SectionBlock id="ownership-matrix" title="Ownership Matrix" body={[]}>
          <MatrixTable
            headers={["state", "source_of_truth", "writers", "readers"]}
            rows={WAVEQ_STATE_OWNERSHIP_MATRIX.map((row) => [
              row.state,
              row.source_of_truth,
              row.writers.join(", "),
              row.readers.join(", "),
            ])}
          />
        </SectionBlock>

        <SectionBlock id="transition-matrix" title="Transition Matrix" body={[]}>
          <MatrixTable
            headers={["from", "event", "to", "owner"]}
            rows={WAVEQ_STATE_TRANSITION_MATRIX.map((row) => [row.from, row.event, row.to, row.owner])}
          />
        </SectionBlock>

        <SectionBlock id="failure-matrix" title="Failure Matrix" body={[]}>
          <MatrixTable
            headers={["failure", "detected_by", "recovery", "next_state"]}
            rows={WAVEQ_STATE_FAILURE_MATRIX.map((row) => [row.failure, row.detected_by, row.recovery, row.next_state])}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}

