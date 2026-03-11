import React, { useState } from 'react';
import { Presentation, Sparkles, Download, Loader2, FileText, Layout, PenTool } from 'lucide-react';
import { Venture } from '../types';
import { geminiService } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

export default function PitchBuilder({ venture }: { venture: Venture }) {
  const [loading, setLoading] = useState(false);
  const [pitch, setPitch] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const generatePitch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/canvas/${venture.id}`);
      const canvas = await res.json();
      const content = await geminiService.generatePitchContent(canvas);
      setPitch(content);
      setStep(2);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pitch Builder</h2>
          <p className="text-sm text-slate-500">Create a compelling investor pitch based on your venture proof.</p>
        </div>
        {pitch && (
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        )}
      </div>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-12">
        <StepIndicator num={1} label="Outline" active={step >= 1} />
        <div className="h-px bg-slate-200 flex-1"></div>
        <StepIndicator num={2} label="Structure" active={step >= 2} />
        <div className="h-px bg-slate-200 flex-1"></div>
        <StepIndicator num={3} label="Content" active={step >= 3} />
        <div className="h-px bg-slate-200 flex-1"></div>
        <StepIndicator num={4} label="Review" active={step >= 4} />
      </div>

      {!pitch ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-16 text-center shadow-sm">
          <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Presentation className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to build your pitch?</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
            We'll use your Venture Canvas and Milestones to generate a structured pitch outline that emphasizes your proof of traction.
          </p>
          <button 
            onClick={generatePitch}
            disabled={loading}
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3 mx-auto disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? 'Generating Pitch...' : 'Generate Pitch Outline'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-blue-600" />
                  Generated Slide Structure
                </h4>
                <button className="text-xs font-bold text-blue-600 hover:underline">Edit Outline</button>
              </div>
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown>{pitch}</ReactMarkdown>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-blue-400" />
                Pitch Tips
              </h4>
              <ul className="space-y-4 text-sm text-slate-400 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  Focus on the "Ask" section—be specific about what you need.
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  Use your verified milestones to back up every claim.
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  Keep the problem statement concise and relatable.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ num, label, active }: { num: number, label: string, active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
        active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-200 text-slate-500'
      }`}>
        {num}
      </div>
      <span className={`text-sm font-bold ${active ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
    </div>
  );
}
