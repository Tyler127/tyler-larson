import { CodeBlock } from "@/components/components/code-block";

interface ComponentPreviewProps {
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
}

export function ComponentPreview({ title, description, preview, code }: ComponentPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Preview */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Preview
        </h3>
        <div className="p-8 rounded-lg border-2">
          {preview}
        </div>
      </div>

      {/* Code */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Code
        </h3>
        <CodeBlock code={code} />
      </div>
    </div>
  );
}

