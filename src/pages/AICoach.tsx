import React from 'react';
import AIChat from '../components/AIChat';
import { Venture } from '../types';

export default function AICoach({ venture }: { venture: Venture | null }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">AI Venture Coach</h2>
        <p className="text-sm text-slate-500">Get strategic advice and next steps for your startup.</p>
      </div>
      <AIChat context={venture} />
    </div>
  );
}
