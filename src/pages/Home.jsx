import React, { useState } from 'react';
import Navbar from '../components/portal/Navbar';
import HeroSection from '../components/portal/HeroSection';
import QuickStats from '../components/portal/QuickStats';
import UploadSection from '../components/portal/UploadSection';
import PipelineTracker from '../components/portal/PipelineTracker';
import ProjectsOverview from '../components/portal/ProjectsOverview';
import RecentActivity from '../components/portal/RecentActivity';
import HowItWorks from '../components/portal/HowItWorks';
import IllustrationSection from '../components/portal/IllustrationSection';
import PortalFooter from '../components/portal/PortalFooter';

export default function Home() {
  const [pipelineRun, setPipelineRun] = useState(0);

  // ✅ Unified scroll function (cleaner)
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ✅ Upload trigger → scroll to pipelines after action
  const handleUploadTrigger = () => {
    setPipelineRun((prev) => prev + 1);

    setTimeout(() => {
      scrollTo('pipelines');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* NAVBAR */}
      <Navbar
        onUploadClick={() => scrollTo('upload')}
        onPipelinesClick={() => scrollTo('pipelines')}
        onProjectsClick={() => scrollTo('projects')}
      />

      {/* HERO */}
      <HeroSection
        onUploadClick={() => scrollTo('upload')}
        onPipelinesClick={() => scrollTo('pipelines')}
      />

      {/* STATS */}
      <QuickStats />

      {/* UPLOAD */}
      <UploadSection
        id="upload"
        onUploadTrigger={handleUploadTrigger}
      />

      {/* PIPELINE */}
      <PipelineTracker
        id="pipelines"
        triggerRun={pipelineRun}
      />

      {/* PROJECTS */}
      <ProjectsOverview id="projects" />

      {/* ACTIVITY */}
      <RecentActivity />

      {/* ILLUSTRATION */}
      <IllustrationSection />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* FOOTER */}
      <PortalFooter />
    </div>
  );
}