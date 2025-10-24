export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative">
      <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
        <code className="text-sm">{code}</code>
      </pre>
    </div>
  );
}

