import React from "react";
import { Cloud, Server, GitBranch, Shield, Zap, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function IllustrationSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-indigo-200 rounded-2xl shadow-inner shadow-purple-200/20">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center p-10 md:p-16">

          {/* LEFT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Fully Automated{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Cloud Deployment
              </span>
            </h2>

            <p className="text-gray-500 mt-4 leading-relaxed max-w-md">
              Our CI/CD platform handles the entire lifecycle — from code upload
              to production deployment — with built-in security scans,
              automated testing, and real-time monitoring.
            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Shield, label: "Security Scans" },
                { icon: Zap, label: "Fast Builds" },
                { icon: RefreshCw, label: "Auto Rollback" },
                { icon: Cloud, label: "Multi-Cloud" },
              ].map((feature) => (
                <div key={feature.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-md shadow-purple-100/40 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div>
            <div className="bg-white shadow-xl shadow-purple-200/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">

              <div className="space-y-5">
                {[
                  {
                    label: "Source Control",
                    icon: GitBranch,
                    progress: 100,
                    color: "bg-emerald-500",
                  },
                  {
                    label: "Build Pipeline",
                    icon: Server,
                    progress: 100,
                    color: "bg-indigo-500",
                  },
                  {
                    label: "Testing Suite",
                    icon: Shield,
                    progress: 85,
                    color: "bg-amber-500",
                  },
                  {
                    label: "Cloud Deploy",
                    icon: Cloud,
                    progress: 60,
                    color: "bg-blue-500",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">

                    {/* ICON */}
                    <div className="w-10 h-10 rounded-xl bg-gray-100/80 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-gray-600" />
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-800">
                          {item.label}
                        </span>
                        <span className="text-gray-400">
                          {item.progress}%
                        </span>
                      </div>

                      {/* PROGRESS BAR */}
                      <div className="h-2 bg-gray-200/70 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${item.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
