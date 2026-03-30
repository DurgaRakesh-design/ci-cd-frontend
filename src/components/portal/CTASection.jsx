import React from 'react';
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection({ onUploadClick }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative text-center"
      >
        <div className="relative bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl p-12 md:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.1),transparent_50%)]" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-background">
              Start Your Deployment Now
            </h2>
            <p className="text-background/60 mt-4 max-w-md mx-auto">
              Upload your first package and experience seamless CI/CD automation in minutes.
            </p>
            <Button
              size="lg"
              className="mt-8 h-12 px-8 text-base font-semibold bg-background text-foreground hover:bg-background/90 shadow-xl"
              onClick={onUploadClick}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}