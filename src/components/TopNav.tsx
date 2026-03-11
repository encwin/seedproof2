import React, { useState } from 'react';
import { ChevronDown, UserCircle, Rocket } from 'lucide-react';

import { LOGO_URL } from '../constants';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userName: string;
  onLogout: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'mentors', label: 'Mentors' },
  { id: 'investors', label: 'Investors' },
  { id: 'matching', label: 'Matching' },
  { id: 'resources', label: 'Resources' },
];

export default function TopNav({ activeTab, setActiveTab, userName, onLogout }: TopNavProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <nav className="h-16 bg-gradient-to-r from-primary-blue to-dark-blue text-white flex items-center justify-between px-8 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          {!logoError ? (
            <img 
              src={LOGO_URL} 
              alt="Seedproof" 
              className="h-8 w-auto" 
              referrerPolicy="no-referrer" 
              onError={() => setLogoError(true)}
            />
          ) : (
            <Rocket className="w-6 h-6 text-white" />
          )}
          <span className="font-bold text-xl tracking-tight">Seedproof</span>
        </div>

        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-sm font-medium transition-all relative py-5 ${
                activeTab === item.id 
                  ? "text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white" 
                  : "text-blue-100 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="px-5 py-1.5 border border-white/40 rounded-full text-sm font-medium hover:bg-white/10 transition-all">
          Upgrade
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/20 group cursor-pointer relative">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} 
            alt={userName}
            className="w-8 h-8 rounded-full bg-white/20 border border-white/40"
          />
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{userName}</span>
            <ChevronDown className="w-4 h-4 text-blue-200" />
          </div>

          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 hidden group-hover:block text-slate-900 overflow-hidden">
            <div className="px-4 py-2 border-bottom border-slate-50">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Account</p>
            </div>
            <button 
              onClick={onLogout}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 text-red-600 font-semibold flex items-center gap-2"
            >
              <UserCircle className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
