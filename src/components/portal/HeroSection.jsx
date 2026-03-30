import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, GitBranch, ArrowRight, Cloud, Server, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection({ onUploadClick, onPipelinesClick }) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background gradient glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-medium mb-6 border border-primary/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              CI/CD Automation Platform
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Upload. Deploy.{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Track
              </span>{" "}
              —{" "}
              <span className="text-muted-foreground font-semibold">
                All in One Place
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Streamline your deployment workflow with automated CI/CD pipelines.
              Upload your package, and we handle the build, test, and deploy stages seamlessly.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                size="lg"
                onClick={onUploadClick}
                className="h-12 px-6 text-base font-semibold bg-primary text-white shadow-md hover:shadow-lg hover:bg-primary/90 transition-all"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Package
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={onPipelinesClick}
                className="h-12 px-6 text-base font-semibold border-gray-200 hover:bg-gray-50"
              >
                <GitBranch className="w-4 h-4 mr-2" />
                View Pipelines
              </Button>
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl" />

              {/* Main card */}
              <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

                {/* Pipeline Icons */}
                <div className="flex items-center justify-between gap-3">
                  {[
                    { icon: Code2, label: "Code", color: "bg-blue-500/10 text-blue-600" },
                    { icon: Upload, label: "Upload", color: "bg-primary/10 text-primary" },
                    { icon: Server, label: "Build", color: "bg-amber-500/10 text-amber-600" },
                    { icon: Cloud, label: "Deploy", color: "bg-emerald-500/10 text-emerald-600" },
                  ].map((step, i) => (
                    <React.Fragment key={step.label}>
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center`}>
                          <step.icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {step.label}
                        </span>
                      </div>

                      {i < 3 && (
                        <ArrowRight className="w-4 h-4 text-gray-300 mt-[-20px]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Terminal */}
                <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  </div>

                  <div className="font-mono text-xs space-y-1.5 text-gray-500">
                    <p><span className="text-green-500">✓</span> Package uploaded successfully</p>
                    <p><span className="text-green-500">✓</span> Build pipeline triggered</p>
                    <p><span className="text-green-500">✓</span> Tests passed (42/42)</p>
                    <p className="text-primary font-medium">→ Deploying to production...</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}