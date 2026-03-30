import React, { useEffect, useRef, useState } from 'react';
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
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!showSuccessBanner) return undefined;

    const timeoutId = window.setTimeout(() => {
      setShowSuccessBanner(false);
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [showSuccessBanner]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  // 🚀 REAL BACKEND INTEGRATION
  const handleUpload = async () => {
    if (!file) return toast.error('Please select a file first');
    if (!environment) return toast.error('Please select an environment');

    try {
      setIsUploading(true);

      // Detect extension
      const getExtension = (name) => {
        if (name.endsWith(".tar.gz")) return ".tar.gz";
        return "." + name.split(".").pop().toLowerCase();
      };

      // Detect version
      const detectVersion = (name) => {
        const match = name.match(/(\d+\.\d+[\.\d]*)/);
        return match ? "v" + match[1] : "v1.0";
      };

      const extension = getExtension(file.name);
      const detectedVersion = detectVersion(file.name);

      // Convert file to base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // 🔥 CALL NETLIFY FUNCTION
      const res = await fetch("/.netlify/functions/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fileName: file.name,
          fileContent: base64,
          environment,
          branch: branch || "main",
          version: detectedVersion,
          extension
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      toast.success("Pipeline triggered successfully!");
      setShowSuccessBanner(true);

      onUploadTrigger?.({
        fileName: file.name,
        environment,
        branch: branch || "main",
        platform: extension,
      });

      // Reset
      setFile(null);
      setEnvironment('');
      setBranch('');

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-16">
      <AnimatePresence>
        {showSuccessBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-4 z-[70] flex justify-center px-4"
          >
            <div className="animate-slide-down rounded-xl bg-emerald-500 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg">
              Pipeline triggered successfully 🚀
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">

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
                    : 'border-gray-300 hover:border-indigo-300 hover:bg-slate-50'
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
                <Badge key={p.label} className={`${p.color} text-xs px-3 py-1 border`}>
                  {p.label}
                </Badge>
              ))}
            </div>

            {/* DROPDOWNS */}
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <Select value={environment} onValueChange={setEnvironment}>
                <SelectTrigger className="h-11 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <SelectValue placeholder="Select Environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dev">Development</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="uat">UAT</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>

              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger className="h-11 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <SelectValue placeholder="Branch (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">main</SelectItem>
                  <SelectItem value="develop">develop</SelectItem>
                  <SelectItem value="release">release</SelectItem>
                  <SelectItem value="hotfix">hotfix</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* BUTTON */}
            <Button
              className="w-full h-12 mt-6 text-base font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700"
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
