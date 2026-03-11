import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  userName: string;
  onMenuClick: () => void;
  onNotificationClick?: () => void;
}

export default function Header({ userName, onMenuClick, onNotificationClick }: HeaderProps) {
  return (
    <header className="h-[72px] bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button 
          onClick={onMenuClick}
          className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="relative group flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-blue transition-colors" />
          <input 
            type="text" 
            placeholder="Search ventures, investors, or resources..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/10 focus:border-primary-blue transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-primary-blue text-white text-sm font-bold rounded-xl hover:bg-dark-blue transition-all shadow-md shadow-blue-100">
          Upgrade Plan
        </button>
        
        <button 
          onClick={onNotificationClick}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-slate-100 cursor-pointer group">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} 
            alt={userName}
            className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200"
          />
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
}
