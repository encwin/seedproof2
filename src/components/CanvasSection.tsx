import React, { useState } from 'react';
import { Sparkles, Save, History, Info } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

interface CanvasSectionProps {
  title: string;
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
  ventureName: string;
}

export default function CanvasSection({ title, field, value, onChange, ventureName }: CanvasSectionProps) {
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getAISuggestions = async () => {
    setLoading(true);
    try {
      const res = await geminiService.getCanvasSuggestions(title, value, ventureName);
      setSuggestions(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <button className="text-slate-400 hover:text-blue-500 transition-colors">
            <Info className="w-4 h-4" />
          </button>
        </div>
        <button 
          onClick={getAISuggestions}
          disabled={loading}
          className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {loading ? 'Thinking...' : 'AI Suggest'}
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={`Describe your ${title.toLowerCase()}...`}
        className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
      />

      <AnimatePresence>
        {suggestions && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">AI Recommendations</span>
              <button 
                onClick={() => setSuggestions(null)}
                className="text-xs text-blue-600 hover:underline"
              >
                Dismiss
              </button>
            </div>
            <div className="text-xs text-slate-700 leading-relaxed prose prose-sm max-w-none">
              {suggestions}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
