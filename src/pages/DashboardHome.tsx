import React, { useState, useEffect } from 'react';
import { Plus, ArrowRight, Clock, AlertCircle, TrendingUp, Trash2 } from 'lucide-react';
import { User, Venture } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TEAM_PROFILES } from '../constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DashboardHomeProps {
  user: User;
  ventures: Venture[];
  setVentures: (v: Venture[]) => void;
  setVenture: (v: Venture) => void;
  onManageVenture: (v: Venture) => void;
  onNavigate: (tab: string) => void;
}

export default function DashboardHome({ user, ventures, setVentures, setVenture, onManageVenture, onNavigate }: DashboardHomeProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [newVenture, setNewVenture] = useState({ name: '', description: '' });
  const [milestoneCounts, setMilestoneCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      const counts: Record<number, number> = {};
      for (const v of ventures) {
        try {
          const res = await fetch(`/api/milestones/${v.id}`);
          const data = await res.json();
          counts[v.id] = data.length;
        } catch (e) {
          counts[v.id] = 0;
        }
      }
      setMilestoneCounts(counts);
    };

    if (ventures.length > 0) {
      fetchCounts();
    }
  }, [ventures]);

  const handleCreateVenture = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/ventures', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, ...newVenture })
    });
    const data = await res.json();
    setVentures([...ventures, data]);
    setVenture(data);
    setShowCreate(false);
    onManageVenture(data);
  };

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDeleteVenture = async (id: number) => {
    try {
      const res = await fetch(`/api/ventures/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setVentures(ventures.filter(v => v.id !== id));
        setDeletingId(null);
      }
    } catch (e) {
      console.error('Failed to delete venture', e);
    }
  };

  if (showCreate) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Tell us about your venture</h2>
        <form onSubmit={handleCreateVenture} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Venture Name</label>
            <input 
              required
              value={newVenture.name}
              onChange={e => setNewVenture({...newVenture, name: e.target.value})}
              placeholder="e.g. EcoStream AI"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">One-sentence Pitch</label>
            <textarea 
              required
              value={newVenture.description}
              onChange={e => setNewVenture({...newVenture, description: e.target.value})}
              placeholder="What problem are you solving and for whom?"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-32 resize-none"
            />
          </div>
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => setShowCreate(false)}
              className="flex-1 py-4 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-[#26B5D4] text-white py-4 rounded-2xl font-bold hover:bg-[#1e9ebc] shadow-lg shadow-cyan-600/20"
            >
              Launch Venture
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Mock data for ventures to match screenshot if real data is empty or missing details
  const displayVentures = ventures.length > 0 ? ventures.map((v, i) => ({
    ...v,
    status: i === 0 ? 'Verified' : 'In Progress',
    score: i === 0 ? 72 : 45,
    milestones: milestoneCounts[v.id] || 0,
    evidence: 11,
    team: TEAM_PROFILES.length,
  })) : [
    {
      id: 1,
      userId: user.id,
      name: 'EcoPack Innovations',
      description: 'Sustainable packaging for consumer goods',
      status: 'Verified',
      score: 72,
      milestones: milestoneCounts[1] || 12,
      evidence: 11,
      team: TEAM_PROFILES.length
    },
    {
      id: 2,
      userId: user.id,
      name: 'NeuroFlow Analytics',
      description: 'AI-powered mental health monitoring platform',
      status: 'In Progress',
      score: 45,
      milestones: milestoneCounts[2] || 5,
      evidence: 11,
      team: TEAM_PROFILES.length
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="text-slate-500 text-lg">Here's what's happening with your ventures today.</p>
        </div>
        <button 
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-[#26B5D4] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1e9ebc] transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Create New Venture
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Ventures List */}
        <div className="lg:col-span-8 space-y-6">
          {displayVentures.map((v) => (
            <div key={v.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-8 pb-6">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                      <TrendingUp className="w-8 h-8 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-1">{v.name}</h3>
                      <p className="text-slate-500 text-lg">{v.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {deletingId === v.id ? (
                      <div className="flex items-center gap-2 bg-red-50 p-1.5 rounded-xl border border-red-100">
                        <span className="text-xs font-bold text-red-600 px-2">Delete?</span>
                        <button 
                          onClick={() => handleDeleteVenture(v.id)}
                          className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Yes
                        </button>
                        <button 
                          onClick={() => setDeletingId(null)}
                          className="bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-slate-300 transition-colors"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setDeletingId(v.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Venture"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium",
                      v.status === 'Verified' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                    )}>
                      {v.status}
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-slate-500 font-medium">Proof Score</span>
                    <span className={cn(
                      "font-bold",
                      v.score >= 70 ? "text-indigo-600" : "text-orange-500"
                    )}>{v.score}/100</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        v.score >= 70 ? "bg-[#26B5D4]" : "bg-orange-400"
                      )}
                      style={{ width: `${v.score}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center divide-x divide-slate-100">
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{v.milestones}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Milestones</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{v.evidence}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Evidence Items</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{v.team}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Team Members</div>
                  </div>
                </div>
              </div>

              <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex -space-x-3">
                  {[...Array(Math.min(v.team, 3))].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                </div>
                <button 
                  onClick={() => onManageVenture(v as Venture)}
                  className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                >
                  Manage Venture <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Coach Insights */}
          <div className="bg-gradient-to-br from-[#4facfe] to-[#00f2fe] rounded-[2rem] p-8 text-white shadow-lg">
            <h3 className="text-xl font-medium mb-6">AI Coach Insights</h3>
            <p className="text-blue-50 text-lg leading-relaxed mb-8">
              Your market sizing section needs more evidence. Connect a data source to boost your score.
            </p>
            <button 
              onClick={() => onNavigate('coach')}
              className="w-full bg-white text-indigo-600 py-3.5 rounded-xl font-medium hover:bg-blue-50 transition-colors"
            >
              Review Suggestions
            </button>
          </div>

          {/* Upcoming */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Upcoming</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1">
                  <Clock className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">Demo Day Submission</h4>
                  <p className="text-sm text-slate-500">Due in 2 days</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1">
                  <AlertCircle className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">Mentor Request</h4>
                  <p className="text-sm text-slate-500">Sarah J. requested an intro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
