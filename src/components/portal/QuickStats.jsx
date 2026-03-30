import { motion } from "framer-motion";
import { FolderKanban, GitBranch, CheckCircle2, Server } from "lucide-react";

const stats = [
  { label: "Total Projects", value: "24", icon: FolderKanban, color: "bg-indigo-500/10 text-indigo-600" },
  { label: "Active Pipelines", value: "7", icon: GitBranch, color: "bg-cyan-500/10 text-cyan-600" },
  { label: "Successful Deploys", value: "142", icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-600" },
  { label: "Environments", value: "5", icon: Server, color: "bg-orange-500/10 text-orange-600" },
];

const QuickStats = () => (
  <section className="py-12">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="rounded-2xl bg-white border border-gray-100 
             shadow-md 
             hover:shadow-lg 
             transition-all p-6 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default QuickStats;
