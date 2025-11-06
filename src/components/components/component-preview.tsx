"use client";

import { useState } from "react";
import { SyntaxHighlightedCodeBlock } from "@/components/components/syntax-highlighted-code-block";
import { Button } from "@/components/ui/button";
import { Eye, Code2, RotateCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ComponentPreviewProps {
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
  props?: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
}

export function ComponentPreview({ 
  title, 
  description, 
  preview, 
  code, 
  props 
}: ComponentPreviewProps) {
  const [key, setKey] = useState(0);
  const [rotation, setRotation] = useState(0);

  const handleRerender = () => {
    setKey(prev => prev + 1);
    setRotation(prev => prev + 1080);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
      </div>

      <Separator />

      {/* Preview and Code Tabs */}
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Code
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-6 relative">
          <div className="absolute right-2 top-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRerender}
              className="h-8 w-8 bg-background/80 backdrop-blur-sm border shadow-sm hover:bg-background"
              title="Rerender component"
            >
              <RotateCw 
                className="h-4 w-4 transition-transform duration-500"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </Button>
          </div>
          <div className="rounded-lg border overflow-hidden bg-[#1e1e1e]">
            <div className="p-8" key={key}>
              {preview}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="mt-6">
          <SyntaxHighlightedCodeBlock code={code} />
        </TabsContent>
      </Tabs>

      {/* Props/API Reference (if provided) */}
      {props && props.length > 0 && (
        <>
          <Separator />
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Props</h2>
            <div className="rounded-lg border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Default</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.map((prop, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="px-4 py-3 text-sm font-mono text-primary">
                            {prop.name}
                          </td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
                            {prop.type}
                          </td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
                            {prop.default || "—"}
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {prop.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        </>
      )}
    </div>
  );
}

