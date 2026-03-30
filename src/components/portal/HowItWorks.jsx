import React from "react";
import { Upload, Search, GitBranch, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Upload,
    label: "Upload Package",
    desc: "Drop your JAR, WAR, or ZIP file",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Search,
    label: "Auto Detect",
    desc: "Platform and version detected instantly",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: GitBranch,
    label: "Trigger Pipeline",
    desc: "CI/CD stages execute automatically",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: BarChart3,
    label: "Deploy & Track",
    desc: "Monitor progress in real time",
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mt-3">
            Four simple steps to deploy your application
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex items-start justify-center gap-2">
          {steps.map((step, i) => (
            <React.Fragment key={step.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex flex-col items-center text-center w-44 relative"
              >
                {/* Icon */}
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto`}
                  >
                    <step.icon className="w-7 h-7" />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2">
                    <div
                      className="w-7 h-7 rounded-full bg-white text-primary text-xs font-semibold flex items-center justify-center 
                      shadow-[0_4px_14px_rgba(99,102,241,0.25)] border border-primary/20"
                    >
                      {i + 1}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-bold text-sm mt-3">{step.label}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>

              {/* Arrow */}
              {i < steps.length - 1 && (
                <div className="flex items-center mt-7 px-2">
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    <ArrowRight className="w-5 h-5 text-muted-foreground/70" />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden grid grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Icon */}
              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mx-auto`}
                >
                  <step.icon className="w-6 h-6" />
                </div>

                {/* Step Badge */}
                <div className="absolute -top-2 -right-2">
                  <div
                    className="w-6 h-6 rounded-full bg-white text-primary text-[10px] font-semibold flex items-center justify-center 
                    shadow-[0_4px_10px_rgba(99,102,241,0.25)] border border-primary/20"
                  >
                    {i + 1}
                  </div>
                </div>
              </div>

              {/* Text */}
              <h3 className="font-bold text-sm mt-3">{step.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}