import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, GitBranch } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  { name: 'auth-service', platform: 'Java', env: 'Production', status: 'success', lastDeploy: '2 min ago', branch: 'main' },
  { name: 'payment-gateway', platform: '.NET', env: 'Staging', status: 'running', lastDeploy: '5 min ago', branch: 'develop' },
  { name: 'user-portal', platform: 'Node.js', env: 'UAT', status: 'success', lastDeploy: '1 hr ago', branch: 'release' },
  { name: 'notification-svc', platform: 'Java', env: 'Dev', status: 'failed', lastDeploy: '3 hr ago', branch: 'hotfix' },
  { name: 'analytics-engine', platform: 'Python', env: 'Production', status: 'success', lastDeploy: '6 hr ago', branch: 'main' },
  { name: 'api-gateway', platform: '.NET', env: 'Staging', status: 'success', lastDeploy: '12 hr ago', branch: 'develop' },
];

const statusStyles = {
  success: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  running: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
  failed: 'bg-red-50 text-red-600 border border-red-200',
};

const platformColors = {
  'Java': 'bg-orange-50 text-orange-600',
  '.NET': 'bg-purple-50 text-purple-600',
  'Node.js': 'bg-emerald-50 text-emerald-600',
  'Python': 'bg-blue-50 text-blue-600',
};

export default function ProjectsOverview({ id }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Projects Overview
          </h2>
          <p className="text-gray-500 mt-3">
            All your deployment projects at a glance
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="
                bg-white 
                border border-purple-100 
                rounded-2xl 
                p-5 
                shadow-md shadow-purple-100/40
                transition-all duration-300 
                hover:-translate-y-1 
                hover:shadow-purple-200/50 
                group 
                cursor-pointer
              "
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                    <GitBranch className="w-3 h-3" />
                    {project.branch}
                  </div>
                </div>

                <Badge className={`text-[10px] font-medium ${statusStyles[project.status]}`}>
                  {project.status === 'running' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse mr-1" />
                  )}
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Badge className={`text-[10px] ${platformColors[project.platform]}`}>
                    {project.platform}
                  </Badge>
                  <Badge className="text-[10px] bg-gray-100 text-gray-600">
                    {project.env}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <Clock className="w-3 h-3" />
                  {project.lastDeploy}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
