import React from 'react';
import { motion } from 'motion/react';

export default function CampusHub() {
  return (
    <div className="max-w-6xl mx-auto pb-20">
      <h1 className="text-4xl font-bold text-slate-900 mb-10">Campus Hub</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Gradient Boxes */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Box 1: CMU Venture Challenge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[2rem] p-10 text-white min-h-[300px] flex flex-col justify-center shadow-sm"
          >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://picsum.photos/seed/pitch/800/400" 
                alt="Venture Challenge" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 to-cyan-400/90"></div>
            </div>
            
            <div className="relative z-10 max-w-md">
              <h2 className="text-2xl font-medium mb-4">CMU Venture Challenge</h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Submit your Venture Canvas by Oct 15 to compete for $50k in grants.
              </p>
              <button className="bg-white text-blue-600 px-8 py-3.5 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto">
                Apply Now
              </button>
            </div>
          </motion.div>

          {/* Box 2: Hackathon Announcement */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] p-10 text-white min-h-[300px] flex flex-col justify-center shadow-sm"
          >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://picsum.photos/seed/hackathon/800/400" 
                alt="Hackathon" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/90 to-pink-500/90"></div>
            </div>
            
            <div className="relative z-10 max-w-md">
              <h2 className="text-2xl font-medium mb-4">Spring Hackathon 2026</h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Build the next big thing in 48 hours. Join us this weekend for coding, pizza, and prizes.
              </p>
              <button className="bg-white text-purple-600 px-8 py-3.5 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto">
                Register Now
              </button>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Upcoming Workshops */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm h-full">
            <h3 className="text-xl font-medium text-slate-900 mb-8">Upcoming Workshops</h3>
            
            <div className="space-y-8">
              <div className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                <h4 className="text-lg font-bold text-slate-900 mb-1">Fundraising 101</h4>
                <p className="text-slate-500 text-sm">Tomorrow, 4 PM • Building 20</p>
              </div>
              
              <div className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                <h4 className="text-lg font-bold text-slate-900 mb-1">Legal Basics for Startups</h4>
                <p className="text-slate-500 text-sm">Oct 12, 2 PM • Zoom</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
