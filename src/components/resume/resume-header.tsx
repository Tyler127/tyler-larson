"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResumeHeaderProps {
  onDownload: () => void;
}

export function ResumeHeader({ onDownload }: ResumeHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
    >
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">Resume</h1>
        <p className="text-muted-foreground">
          Download or view my professional resume
        </p>
      </div>
      <Button onClick={onDownload} size="lg" className="group">
        <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
        Download Resume
      </Button>
    </motion.div>
  );
}

