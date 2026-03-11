import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'motion/react';

const upcomingVideos = [
  {
    id: 1,
    title: 'EcoSync',
    description: 'An AI-driven platform optimizing city-wide waste management routes to reduce carbon emissions by 30%.',
    stage: 'Seed Stage'
  },
  {
    id: 2,
    title: 'NeuroFlow',
    description: 'A brain-computer interface application designed to help individuals with ADHD maintain focus during deep work sessions.',
    stage: 'Seed Stage'
  },
  {
    id: 3,
    title: 'AgriChain',
    description: 'A blockchain-based supply chain solution ensuring fair trade and transparency for small-scale coffee farmers.',
    stage: 'Seed Stage'
  }
];

const historyVideos = [
  {
    id: 4,
    title: 'MediVision AI',
    description: 'Computer vision tool that assists radiologists in detecting early signs of rare diseases from standard MRI scans.',
    stage: 'Seed Stage'
  },
  {
    id: 5,
    title: 'AquaGuard',
    description: 'IoT sensor network for real-time monitoring of water quality in municipal reservoirs, predicting contamination events.',
    stage: 'Seed Stage'
  },
  {
    id: 6,
    title: 'CodeWeaver',
    description: 'An intelligent pair-programming assistant that translates natural language requirements into secure, production-ready code.',
    stage: 'Seed Stage'
  }
];

export default function DemoDay() {
  return (
    <div className="max-w-6xl mx-auto pb-20">
      <h1 className="text-4xl font-bold text-slate-900 mb-10">Always-On Demo Day</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Upcoming Demo Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingVideos.map((video, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={video.id} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="bg-[#11141d] h-[220px] relative flex items-center justify-center group cursor-pointer">
                <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                  <Play className="w-6 h-6 text-white ml-1 fill-white" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#29b6f6] text-white text-xs font-bold px-3 py-1.5 rounded-md">
                    {video.stage}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{video.title}</h3>
                <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed">{video.description}</p>
                <button className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-900 font-medium hover:bg-slate-50 transition-colors">
                  View Pitch
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">History of Lived Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyVideos.map((video, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              key={video.id} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="bg-[#11141d] h-[220px] relative flex items-center justify-center group cursor-pointer">
                <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                  <Play className="w-6 h-6 text-white ml-1 fill-white" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#29b6f6] text-white text-xs font-bold px-3 py-1.5 rounded-md">
                    {video.stage}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{video.title}</h3>
                <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed">{video.description}</p>
                <button className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-900 font-medium hover:bg-slate-50 transition-colors">
                  View Pitch
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
