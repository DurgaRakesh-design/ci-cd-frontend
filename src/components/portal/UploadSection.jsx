import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileArchive, X, Rocket, CloudUpload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const FORMATS = ['.jar', '.war', '.zip', '.tar.gz'];

const PLATFORMS = [
  { label: 'Java', color: 'bg-orange-100 text-orange-600 border-orange-200' },
  { label: '.NET', color: 'bg-purple-100 text-purple-600 border-purple-200' },
  { label: 'Node.js', color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
  { label: 'Python', color: 'bg-blue-100 text-blue-600 border-blue-200' },
];

export default function UploadSection({ id, onUploadTrigger }) {
  const [file, setFile] = useState(null);
  const [environment, setEnvironment] = useState('');
  const [branch, setBranch] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a file first');
    if (!environment) return toast.error('Please select an environment');

    setIsUploading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsUploading(false);

    toast.success('Pipeline triggered successfully!');
    onUploadTrigger?.({
      fileName: file.name,
      environment,
      branch: branch || 'main',
      platform: 'Java',
    });

    setFile(null);
    setEnvironment('');
    setBranch('');
  };

  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-16 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Upload & Deploy
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Drop your package and trigger an automated pipeline in seconds
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">

          {/* CARD */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

            {/* DROPZONE */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-indigo-400 bg-indigo-50'
                  : file
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".jar,.war,.zip,.tar.gz"
                onChange={(e) => e.target.files[0] && setFile(e.target.files[0])}
              />

              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div
                    key="file"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <FileArchive className="w-8 h-8 text-emerald-500" />
                    <div className="text-left">
                      <p className="font-semibold text-sm text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500"
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="empty">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                      <CloudUpload className="w-8 h-8 text-indigo-600" />
                    </div>
                    <p className="font-semibold text-gray-900">
                      Drop your package here or{' '}
                      <span className="text-indigo-600">browse</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Supports {FORMATS.join(', ')}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-5">
              {PLATFORMS.map((p) => (
                <Badge
                  key={p.label}
                  className={`${p.color} text-xs px-3 py-1 border`}
                >
                  {p.label}
                </Badge>
              ))}
            </div>

            {/* DROPDOWNS */}
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              
              {/* ENV */}
              <Select value={environment} onValueChange={setEnvironment}>
                <SelectTrigger className="h-11 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <SelectValue placeholder="Select Environment" />
                </SelectTrigger>

                <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
                  <SelectItem value="dev">Development</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="uat">UAT</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>

              {/* BRANCH */}
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger className="h-11 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <SelectValue placeholder="Branch (optional)" />
                </SelectTrigger>

                <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
                  <SelectItem value="main">main</SelectItem>
                  <SelectItem value="develop">develop</SelectItem>
                  <SelectItem value="release">release</SelectItem>
                  <SelectItem value="hotfix">hotfix</SelectItem>
                </SelectContent>
              </Select>

            </div>

            {/* BUTTON */}
            <Button
              className="w-full h-12 mt-6 text-base font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading & Triggering...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Upload & Trigger Pipeline
                </div>
              )}
            </Button>

          </div>
        </div>
      </motion.div>
    </section>
  );
}