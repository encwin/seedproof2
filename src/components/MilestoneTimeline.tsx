import React from 'react';
import { Milestone as MilestoneIcon, CheckCircle2, Clock, ExternalLink, Plus, Edit2 } from 'lucide-react';
import { Milestone } from '../types';
import { motion } from 'motion/react';

interface MilestoneTimelineProps {
  milestones: Milestone[];
  onAdd: () => void;
  onEdit?: (milestone: Milestone) => void;
}

export default function MilestoneTimeline({ milestones, onAdd, onEdit }: MilestoneTimelineProps) {
  return (
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Venture Timeline</h3>
          <p className="text-sm text-slate-500">Track your progress and verify your traction.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all text-sm font-medium shadow-md shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          Add Milestone
        </button>
      </div>

      {milestones.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <MilestoneIcon className="w-6 h-6 text-slate-400" />
          </div>
          <h4 className="font-medium text-slate-900">No milestones yet</h4>
          <p className="text-sm text-slate-500 mt-1">Start documenting your progress to build investor trust.</p>
        </div>
      ) : (
        <div className="relative pl-8 space-y-12 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {milestones.map((m, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={m.id} 
              className="relative"
            >
              <div className={`absolute -left-[31px] top-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${
                m.status === 'Verified' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
              }`}>
                {m.status === 'Verified' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
              </div>
              
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative group">
                {onEdit && (
                  <button 
                    onClick={() => onEdit(m)}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Edit Milestone"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
                <div className="flex items-start justify-between mb-2 pr-10">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{m.date}</span>
                    <h4 className="font-bold text-slate-900 text-lg">{m.title}</h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    m.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {m.status}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{m.description}</p>
                
                {m.evidenceLink && (
                  <a 
                    href={m.evidenceLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-blue-600 bg-slate-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Proof of Traction
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
