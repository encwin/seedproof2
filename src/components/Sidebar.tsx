import React from 'react';
import { 
  LayoutDashboard, 
  Target, 
  Milestone, 
  FileText, 
  MessageSquare, 
  Users, 
  FolderLock, 
  School,
  Presentation,
  Settings,
  ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
  onLogoClick?: () => void;
}

const platformItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'canvas', label: 'Venture Canvas', icon: Target },
  { id: 'milestones', label: 'Milestones', icon: Milestone },
  { id: 'evidence', label: 'Evidence & Proof', icon: FileText },
  { id: 'coach', label: 'AI Coach', icon: MessageSquare },
  { id: 'matching', label: 'Mentors & Investors', icon: Users },
  { id: 'team', label: 'Team Matching', icon: Users },
  { id: 'dataroom', label: 'Data Room', icon: FolderLock },
  { id: 'campus', label: 'Campus Hub', icon: School },
  { id: 'demoday', label: 'Demo Day', icon: Presentation },
];

const accountItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
];

import { LOGO_URL } from '../constants';

export default function Sidebar({ activeTab, setActiveTab, userName, isOpen, onClose, onLogoClick }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={cn(
        "w-[260px] bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-slate-100 z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 mb-2">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <img 
              src={LOGO_URL} 
              className="h-8 w-auto" 
              referrerPolicy="no-referrer" 
            />
            <span className="font-bold text-xl tracking-tight text-slate-900">Seedproof</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
          <div>
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Platform</p>
            <div className="space-y-1">
              {platformItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                      activeTab === item.id 
                        ? "bg-slate-100 text-slate-900" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Icon className={cn(
                      "w-4.5 h-4.5 transition-colors",
                      activeTab === item.id ? "text-primary-blue" : "text-slate-400 group-hover:text-slate-600"
                    )} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Account</p>
            <div className="space-y-1">
              {accountItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                      activeTab === item.id 
                        ? "bg-slate-100 text-slate-900" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Icon className={cn(
                      "w-4.5 h-4.5 transition-colors",
                      activeTab === item.id ? "text-primary-blue" : "text-slate-400 group-hover:text-slate-600"
                    )} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-50">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 group cursor-pointer hover:bg-slate-100 transition-colors">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} 
              alt={userName}
              className="w-10 h-10 rounded-full bg-white border border-slate-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{userName}</p>
              <p className="text-xs text-slate-500 font-medium">Founder</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </>
  );
}
