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
        <div className="relative rounded-2xl border border-purple-100 bg-white p-12 shadow-md shadow-purple-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-200/50 md:p-16">
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Start Your Deployment Now
            </h2>
            <p className="mt-4 max-w-md mx-auto text-gray-500">
              Upload your first package and experience seamless CI/CD automation in minutes.
            </p>
            <Button
              size="lg"
              className="mt-8 h-12 px-8 text-base font-semibold bg-primary text-white shadow-md shadow-purple-100/40 hover:bg-primary/90 hover:shadow-purple-200/50"
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
