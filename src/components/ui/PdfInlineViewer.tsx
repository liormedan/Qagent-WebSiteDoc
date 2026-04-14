"use client";

type PdfInlineViewerLabels = {
  prevPage?: string;
  nextPage?: string;
  pageXofY?: (current: number, total: number) => string;
};

export function PdfInlineViewer({ fileUrl }: { fileUrl: string; labels?: PdfInlineViewerLabels }) {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-md border border-[var(--border)] bg-white">
        <object data={fileUrl} type="application/pdf" className="h-[70vh] min-h-[520px] w-full">
          <iframe src={fileUrl} title="PDF Preview" className="h-[70vh] min-h-[520px] w-full" />
        </object>
      </div>
    </div>
  );
}
