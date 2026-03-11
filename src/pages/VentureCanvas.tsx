import React, { useState, useEffect } from 'react';
import { Save, Sparkles, ArrowLeft, Loader2, Play, CheckCircle2, FileText, TrendingUp, Video, ArrowRight } from 'lucide-react';
import { Venture, Canvas, Milestone } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TEAM_PROFILES } from '../constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function VentureCanvas({ venture, onBack, onNavigate }: { venture: Venture, onBack?: () => void, onNavigate?: (tab: string) => void }) {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    fetchCanvas();
    fetchMilestones();
  }, [venture]);

  const fetchCanvas = async () => {
    const res = await fetch(`/api/canvas/${venture.id}`);
    const data = await res.json();
    setCanvas(data);
    setLoading(false);
  };

  const fetchMilestones = async () => {
    const res = await fetch(`/api/milestones/${venture.id}`);
    const data = await res.json();
    setMilestones(data);
  };

  const handleUpdate = (field: string, value: string) => {
    if (!canvas) return;
    setCanvas({ ...canvas, [field]: value });
  };

  const handleSave = async () => {
    if (!canvas) return;
    setSaving(true);
    try {
      await fetch(`/api/canvas/${venture.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(canvas)
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading canvas...</div>;
  if (!canvas) return <div className="p-8">Error loading canvas.</div>;

  const tabs = ['Overview', 'Problem & Solution', 'Market', 'Business Model', 'Team'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-800 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-lg">Back</span>
          </button>
          <div>
            <h2 className="text-[28px] font-bold text-slate-900 leading-tight">{venture.name || 'EcoPack Innovations'}</h2>
            <p className="text-sm text-slate-500">Last saved 2 mins ago</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate?.('coach')}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl font-medium hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            AI Assist
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#26B5D4] text-white rounded-xl font-medium hover:bg-[#1e9ebc] transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center bg-white rounded-xl border border-slate-200 overflow-hidden">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              activeTab === tab 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-800 hover:bg-slate-50 border-b-2 border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Venture Profile Card */}
            <div className="lg:col-span-3">
              <VentureProfileCard venture={venture} milestonesCount={milestones.length} onEditCanvas={() => setActiveTab('Problem & Solution')} canvas={canvas} onNavigate={onNavigate} />
            </div>

            {/* Center Column: Demo Video */}
            <div className="lg:col-span-6">
              <DemoVideoCard />
            </div>

            {/* Right Column: Milestone Progress */}
            <div className="lg:col-span-3">
              <MilestoneProgressCard milestones={milestones} onNavigate={onNavigate} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Evidence & Proof Section */}
            <div className="lg:col-span-8">
              <EvidenceProofCard onNavigate={onNavigate} />
            </div>
            {/* AI Pitch Coach Card */}
            <div className="lg:col-span-4">
              <AIPitchCoachCard onNavigate={onNavigate} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Problem & Solution' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg text-slate-900 mb-2">Problem</h3>
            <p className="text-sm text-slate-500 mb-4">What pain points are you solving?</p>
            <textarea 
              value={canvas.problem || ''}
              onChange={(e) => handleUpdate('problem', e.target.value)}
              className="w-full h-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              placeholder="Describe the problem..."
            />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg text-slate-900 mb-2">Solution</h3>
            <p className="text-sm text-slate-500 mb-4">What does your product solve for solution?</p>
            <textarea 
              value={canvas.solution || ''}
              onChange={(e) => handleUpdate('solution', e.target.value)}
              className="w-full h-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              placeholder="Describe your solution..."
            />
          </div>
        </div>
      )}

      {activeTab === 'Market' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg text-slate-900 mb-2">Target Audience</h3>
            <p className="text-sm text-slate-500 mb-4">Who are your primary customer?</p>
            <textarea 
              value={canvas.targetUsers || ''}
              onChange={(e) => handleUpdate('targetUsers', e.target.value)}
              className="w-full h-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              placeholder="Describe your target audience..."
            />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg text-slate-900 mb-2">Market Size (TAM, SAM, SOM)</h3>
            <p className="text-sm text-slate-500 mb-4">What is the market potential?</p>
            <textarea 
              value={canvas.marketSize || ''}
              onChange={(e) => handleUpdate('marketSize', e.target.value)}
              className="w-full h-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              placeholder="Describe the market size..."
            />
          </div>
        </div>
      )}

      {activeTab === 'Business Model' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg text-slate-900 mb-2">Revenue Stream</h3>
            <p className="text-sm text-slate-500 mb-4">How do you make money?</p>
            <textarea 
              value={canvas.revenueModel || ''}
              onChange={(e) => handleUpdate('revenueModel', e.target.value)}
              className="w-full h-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              placeholder="Describe your revenue streams..."
            />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg text-slate-900 mb-2">Cost Structure</h3>
            <p className="text-sm text-slate-500 mb-4">What are your major expenses?</p>
            <textarea 
              value={canvas.costStructure || ''}
              onChange={(e) => handleUpdate('costStructure', e.target.value)}
              className="w-full h-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              placeholder="Describe your cost structure..."
            />
          </div>
        </div>
      )}

      {activeTab === 'Team' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg text-slate-900 mb-2">Founding Team</h3>
            <p className="text-sm text-slate-500 mb-4">Who are building this?</p>
            <textarea 
              value={canvas.foundingTeam || ''}
              onChange={(e) => handleUpdate('foundingTeam', e.target.value)}
              className="w-full h-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              placeholder="Describe your founding team..."
            />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg text-slate-900 mb-2">Advisors and Key Hires</h3>
            <p className="text-sm text-slate-500 mb-4">Who else is supporting you?</p>
            <textarea 
              value={canvas.advisors || ''}
              onChange={(e) => handleUpdate('advisors', e.target.value)}
              className="w-full h-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              placeholder="Describe your advisors and key hires..."
            />
          </div>
        </div>
      )}
    </div>
  );
}

function VentureProfileCard({ venture, milestonesCount, onEditCanvas, canvas, onNavigate }: { venture: Venture | null, milestonesCount: number, onEditCanvas: () => void, canvas: any, onNavigate?: (tab: string) => void }) {
  const teamMembersCount = TEAM_PROFILES.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="h-24 bg-gradient-to-br from-primary-blue to-teal-400 relative">
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white p-1.5 rounded-2xl shadow-lg border border-slate-50">
          <div className="bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden">
             <img 
               src={`https://api.dicebear.com/7.x/initials/svg?seed=${venture?.name || 'EcoPack'}&backgroundColor=dbeafe&textColor=1e40af`} 
               alt={venture?.name}
               className="w-full h-full"
             />
          </div>
        </div>
      </div>
      <div className="pt-12 pb-6 px-6 text-center">
        <h3 className="text-xl font-bold text-slate-900 mb-1">{venture?.name || 'EcoPack Innovations'}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          {venture?.description || "Sustainable packaging made from biodegradable materials."}
        </p>
        
        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Green Tech</span>
          <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Consumer</span>
        </div>

        <div className="space-y-4 text-left border-t border-slate-50 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">Team Members</span>
            <span className="text-sm font-bold text-slate-900">{teamMembersCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">Milestones</span>
            <span className="text-sm font-bold text-slate-900">{milestonesCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">Evidence Items</span>
            <span className="text-sm font-bold text-slate-900">11</span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button 
            onClick={onEditCanvas}
            className="w-full bg-primary-blue text-white py-3 rounded-xl text-sm font-bold hover:bg-dark-blue transition-all shadow-md shadow-blue-100"
          >
            Edit Canvas
          </button>
          <button 
            onClick={() => onNavigate?.('matching')}
            className="w-full bg-white border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
          >
            Find Collaborators
          </button>
        </div>
      </div>
    </div>
  );
}

function DemoVideoCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Latest Demo Video</h3>
      <div className="relative rounded-xl overflow-hidden group aspect-video bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1589939705384-5185138a04b9?auto=format&fit=crop&q=80&w=1000" 
          alt="Demo Preview"
          className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 mb-6">
            <h4 className="text-white text-lg font-bold">EcoPack Demo Prototype v2.1</h4>
          </div>
          <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-primary-blue fill-primary-blue ml-1" />
          </button>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500 leading-relaxed">
        "Prototype walk-through of our new biodegradable packaging material showing water resistance tests."
      </p>
    </div>
  );
}

function MilestoneProgressCard({ milestones, onNavigate }: { milestones: Milestone[], onNavigate?: (tab: string) => void }) {
  const displayMilestones = milestones.length > 0 ? milestones.slice(0, 4).map(m => ({
    title: m.title,
    date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    progress: m.status === 'Verified' ? 100 : 50
  })) : [
    { title: 'Prototype Developed', date: 'Mar 2023', progress: 100 },
    { title: 'Market Test Completed', date: 'May 2023', progress: 100 },
    { title: 'Secured Initial Funding', date: 'Jul 2023', progress: 40 },
    { title: 'Launch Beta', date: 'Oct 2023', progress: 0 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Milestone Progress</h3>
      <div className="space-y-6 flex-1">
        {displayMilestones.map((m, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-white",
                  m.progress === 100 ? "bg-emerald-500" : m.progress > 0 ? "bg-primary-blue" : "bg-slate-200"
                )}>
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span className="text-sm font-bold text-slate-800">{m.title}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">{m.date}</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500",
                  m.progress === 100 ? "bg-emerald-500" : "bg-primary-blue"
                )} 
                style={{ width: `${m.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={() => onNavigate?.('milestones')}
        className="mt-6 text-sm font-bold text-primary-blue hover:text-dark-blue transition-colors flex items-center gap-1"
      >
        View All Milestones <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function EvidenceProofCard({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Evidence & Proof</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-4 group hover:bg-white hover:shadow-md transition-all cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-primary-blue">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Market Research Report</h4>
            <p className="text-xs text-slate-500">Download PDF • View Insights</p>
          </div>
        </div>

        <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-4 group hover:bg-white hover:shadow-md transition-all cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-primary-blue">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Prototype Expenses</h4>
            <p className="text-xs text-slate-500">Material Costs $15,000</p>
          </div>
        </div>

        <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-4 group hover:bg-white hover:shadow-md transition-all cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-primary-blue">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">User Feedback Videos</h4>
            <p className="text-xs text-slate-500">12 Videos • Open Content</p>
          </div>
        </div>
      </div>
      <button 
        onClick={() => onNavigate?.('evidence')}
        className="mt-6 text-sm font-bold text-primary-blue hover:text-dark-blue transition-colors flex items-center gap-1"
      >
        Manage Integrations & Uploads <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function AIPitchCoachCard({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-900 mb-4">AI Pitch Coach</h3>
      <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100/50">
        <h4 className="text-primary-blue font-bold mb-3">Improve Your Pitch</h4>
        <ul className="space-y-3 mb-6">
          {['Refine your value proposition', 'Strengthen your financials', 'Get funding tips'].map((text, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
              <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mt-1.5 shrink-0"></div>
              {text}
            </li>
          ))}
        </ul>
        <button 
          onClick={() => onNavigate?.('coach')}
          className="w-full bg-primary-blue text-white py-3 rounded-xl text-sm font-bold hover:bg-dark-blue transition-all shadow-lg shadow-blue-100"
        >
          Get AI Suggestions
        </button>
      </div>
    </div>
  );
}
