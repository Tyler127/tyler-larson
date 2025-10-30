"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SyntaxHighlightedCodeBlockProps {
  code: string;
  language?: string;
}

export function SyntaxHighlightedCodeBlock({ 
  code, 
  language = "tsx" 
}: SyntaxHighlightedCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-8 w-8 bg-background/80 backdrop-blur-sm border shadow-sm hover:bg-background"
        >
          <div className="relative w-4 h-4">
            <Copy 
              className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
                copied ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'
              }`}
            />
            <Check 
              className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
                copied ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'
              }`}
            />
          </div>
        </Button>
      </div>
      <div className="rounded-lg border overflow-hidden bg-[#1e1e1e]">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            background: "#1e1e1e",
          }}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            userSelect: "none",
            opacity: 0.5,
            color: "#858585",
          }}
          codeTagProps={{
            style: {
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

