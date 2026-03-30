import { motion } from "framer-motion";
import {
  Upload,
  Hammer,
  FlaskConical,
  Rocket,
  CheckCircle2,
  Loader2,
  Circle,
} from "lucide-react";

const stages = [
  {
    label: "Upload",
    icon: Upload,
    status: "success",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    label: "Build",
    icon: Hammer,
    status: "success",
    color: "bg-pink-100 text-pink-600",
  },
  {
    label: "Test",
    icon: FlaskConical,
    status: "running",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    label: "Deploy",
    icon: Rocket,
    status: "pending",
    color: "bg-orange-100 text-orange-500",
  },
];

const statusConfig = {
  success: {
    text: "text-green-500",
    icon: CheckCircle2,
    label: "Success",
  },
  running: {
    text: "text-indigo-500",
    icon: Loader2,
    label: "Running",
  },
  pending: {
    text: "text-gray-400",
    icon: Circle,
    label: "Pending",
  },
};

const PipelineTracker = ({ id }) => {
  return (
    <section id={id} className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Pipeline Progress
          </h2>
          <p className="text-gray-500">
            Track each stage of your deployment in real time
          </p>
        </motion.div>

        {/* Pipeline */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {stages.map((stage, i) => {
            const config = statusConfig[stage.status];
            const StatusIcon = config.icon;

            return (
              <div key={stage.label} className="flex items-center gap-4">

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="
                    w-[180px] 
                    p-6 
                    rounded-2xl 
                    bg-white 
                    border border-gray-200 
                    text-center 
                    flex flex-col items-center gap-3 
                    transition-all duration-300 ease-out 
                    hover:-translate-y-1.5 
                    hover:shadow-[0_12px_30px_rgba(99,102,241,0.15)]
                  "
                >

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stage.color}`}>
                    <stage.icon className="w-5 h-5" />
                  </div>

                  {/* Label */}
                  <p className="font-semibold text-gray-900">
                    {stage.label}
                  </p>

                  {/* Status */}
                  <div className={`flex items-center gap-1.5 text-sm font-medium ${config.text}`}>
                    <StatusIcon
                      className={`w-4 h-4 ${
                        stage.status === "running" ? "animate-spin" : ""
                      }`}
                    />
                    {config.label}
                  </div>
                </motion.div>

                {/* Connector */}
                {i < stages.length - 1 && (
                  <div className="hidden sm:block w-16 h-[2px] bg-gray-200 relative rounded-full overflow-hidden">

                    {stage.status === "success" && (
                      <div className="absolute inset-0 bg-green-400 rounded-full" />
                    )}

                    {stage.status === "running" && (
                      <div className="absolute inset-y-0 left-0 w-1/2 bg-indigo-400 rounded-full animate-pulse" />
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PipelineTracker;