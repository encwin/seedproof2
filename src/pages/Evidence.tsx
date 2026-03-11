import React, { useState } from 'react';
import { Venture } from '../types';
import { Check, UploadCloud, FileText } from 'lucide-react';

export default function Evidence({ venture }: { venture: Venture }) {
  const [integrations, setIntegrations] = useState([
    { id: 'github', name: 'GitHub', status: 'connected', lastSynced: 'Synced 10 mins ago', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { id: 'hubspot', name: 'HubSpot', status: 'disconnected', lastSynced: 'Not connected', icon: 'https://cdn.worldvectorlogo.com/logos/hubspot.svg' },
    { id: 'notion', name: 'Notion', status: 'connected', lastSynced: 'Synced 2 hours ago', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
    { id: 'mixpanel', name: 'Mixpanel', status: 'disconnected', lastSynced: 'Not connected', icon: 'https://cdn.worldvectorlogo.com/logos/mixpanel.svg' },
    { id: 'slack', name: 'Slack', status: 'connected', lastSynced: 'Synced 5 mins ago', icon: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg' },
    { id: 'google-analytics', name: 'Google Analytics', status: 'connected', lastSynced: 'Synced 1 hour ago', icon: 'https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg' },
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations(integrations.map(int => {
      if (int.id === id) {
        return {
          ...int,
          status: int.status === 'connected' ? 'disconnected' : 'connected',
          lastSynced: int.status === 'connected' ? 'Not connected' : 'Synced just now'
        };
      }
      return int;
    }));
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Evidence & Integrations</h1>
        <p className="text-slate-500 text-lg">Connect data sources to automatically verify your traction.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {integrations.map(integration => (
          <div key={integration.id} className="bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-5 mb-8 w-full justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0">
                <img src={integration.icon} alt={integration.name} className="w-8 h-8 object-contain" />
              </div>
              <div className="text-left min-w-[140px]">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{integration.name}</h3>
                <p className="text-sm text-slate-500">{integration.lastSynced}</p>
              </div>
            </div>
            
            {integration.status === 'connected' ? (
              <button 
                onClick={() => toggleConnection(integration.id)}
                className="flex items-center justify-center gap-2 w-48 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 font-medium hover:bg-emerald-100 transition-colors"
              >
                <Check className="w-5 h-5" />
                Connected
              </button>
            ) : (
              <button 
                onClick={() => toggleConnection(integration.id)}
                className="w-48 py-3 rounded-xl bg-[#26B5D4] text-white font-medium hover:bg-[#1e9ebc] shadow-sm transition-colors"
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
            <UploadCloud className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Manual Uploads</h3>
            <p className="text-slate-500">Upload contracts, Patents, and other Documents</p>
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
          <FileText className="w-10 h-10 text-slate-400 mb-4" />
          <p className="text-slate-600 font-medium mb-1">Click to upload or drag and drop</p>
          <p className="text-sm text-slate-400">PDF, DOCX, or Images (max 10MB)</p>
        </div>
      </div>
    </div>
  );
}
