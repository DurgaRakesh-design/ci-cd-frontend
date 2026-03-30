import React from 'react';
import { GitBranch } from "lucide-react";

export default function PortalFooter() {
  return (
    <footer className="border-t border-border/60 mt-8">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm">Maantic CI/CD</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">API Reference</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Support</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Status</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Maantic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}