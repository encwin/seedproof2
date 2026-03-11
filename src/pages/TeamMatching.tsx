import React from 'react';
import { motion } from 'motion/react';

import { TEAM_PROFILES } from '../constants';

export default function TeamMatching() {
  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Co-founder & Team Matching</h1>
        <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity shadow-sm">
          Post a Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAM_PROFILES.map((profile, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={profile.id} 
            className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col text-center"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-1">{profile.name}</h3>
            <p className="text-slate-500 text-sm mb-6">{profile.role}</p>
            
            <p className="text-slate-600 text-sm mb-8 min-h-[40px] leading-relaxed">
              {profile.bio}
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8 mt-auto">
              {profile.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity shadow-sm">
                Connect
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
