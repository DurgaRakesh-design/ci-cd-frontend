import React from 'react';
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  { action: 'Deployed', project: 'auth-service', env: 'Production', status: 'success', time: '2 min ago', user: 'Sarah K.' },
  { action: 'Pipeline started', project: 'payment-gateway', env: 'Staging', status: 'running', time: '5 min ago', user: 'James L.' },
  { action: 'Uploaded', project: 'user-portal', env: 'UAT', status: 'success', time: '1 hr ago', user: 'Maria R.' },
  { action: 'Build failed', project: 'notification-svc', env: 'Dev', status: 'failed', time: '3 hr ago', user: 'Tom H.' },
  { action: 'Deployed', project: 'analytics-engine', env: 'Production', status: 'success', time: '6 hr ago', user: 'Alice W.' },
];

const statusIcons = {
  success: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
  running: <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />,
  failed: <XCircle className="w-4 h-4 text-red-500" />,
};

const statusDotColors = {
  success: 'bg-emerald-500',
  running: 'bg-indigo-500',
  failed: 'bg-red-500',
};

export default function RecentActivity() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Recent Activity
          </h2>
          <p className="text-gray-500 mt-3">
            Latest pipeline executions and deployments
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gray-200" />

            <div className="space-y-5">
              {activities.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex items-start gap-4 pl-12"
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-[14px] top-4 w-3 h-3 rounded-full ${statusDotColors[activity.status]} ring-4 ring-white`}
                  />

                  {/* Card */}
                  <div
                    className="
                      w-full 
                      bg-white 
                      border border-gray-100 
                      rounded-2xl 
                      p-4 
                      shadow-md 
                      transition-all duration-300 
                      hover:-translate-y-1 
                      hover:shadow-lg
                    "
                  >
                    {/* Top */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {statusIcons[activity.status]}
                        <span className="font-semibold text-sm text-gray-900">
                          {activity.action}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {activity.time}
                      </span>
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span className="font-medium text-gray-900">
                        {activity.project}
                      </span>
                      <span>•</span>
                      <span>{activity.env}</span>
                      <span>•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
