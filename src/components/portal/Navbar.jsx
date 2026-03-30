import React from 'react';
import { Button } from "@/components/ui/button";
import { GitBranch } from "lucide-react";

export default function Navbar({ onUploadClick, onPipelinesClick, onProjectsClick }) {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight">Maantic CI/CD</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <button onClick={onUploadClick} className="hover:text-foreground transition-colors font-medium">Upload</button>
          <button onClick={onPipelinesClick} className="hover:text-foreground transition-colors font-medium">Pipelines</button>
          <button onClick={onProjectsClick} className="hover:text-foreground transition-colors font-medium">Projects</button>
        </div>
        <Button size="sm" className="h-9 font-semibold" onClick={onUploadClick}>
          Deploy Now
        </Button>
      </div>
    </nav>
  );
}