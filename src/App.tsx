import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardHome from './pages/DashboardHome';
import VentureCanvas from './pages/VentureCanvas';
import Milestones from './pages/Milestones';
import Evidence from './pages/Evidence';
import AICoach from './pages/AICoach';
import PitchBuilder from './pages/PitchBuilder';
import FundingInsights from './pages/FundingInsights';
import MentorMatching from './pages/MentorMatching';
import TeamMatching from './pages/TeamMatching';
import DataRoom from './pages/DataRoom';
import CampusHub from './pages/CampusHub';
import DemoDay from './pages/DemoDay';
import Settings from './pages/Settings';
import { User, Venture } from './types';
import { motion, AnimatePresence } from 'motion/react';

import Notifications from './pages/Notifications';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'landing' | 'auth' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [venture, setVenture] = useState<Venture | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [ventures, setVentures] = useState<Venture[]>([]);

  useEffect(() => {
    if (user && activeTab === 'dashboard') {
      fetchVentures();
    }
  }, [user, activeTab]);

  const fetchVentures = async () => {
    if (!user) return;
    const res = await fetch(`/api/ventures/${user.id}`);
    const data = await res.json();
    setVentures(data);
    if (data.length > 0 && !venture) {
      setVenture(data[0]);
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setView('app');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setVenture(null);
    setActiveTab('dashboard');
    setIsSidebarOpen(false);
  };

  if (view === 'landing') return <LandingPage onStart={() => setView('auth')} />;
  if (view === 'auth') return <AuthPage onLogin={handleLogin} />;

  const renderContent = () => {
    if (!user) return null;
    
    switch (activeTab) {
      case 'dashboard': return <DashboardHome user={user} ventures={ventures} setVentures={setVentures} setVenture={setVenture} onManageVenture={(v) => { setVenture(v); setActiveTab('canvas'); }} onNavigate={setActiveTab} />;
      case 'canvas': return venture ? <VentureCanvas venture={venture} onBack={() => setActiveTab('dashboard')} onNavigate={setActiveTab} /> : <div className="p-8">Please create a venture first.</div>;
      case 'milestones': return venture ? <Milestones venture={venture} /> : <div className="p-8">Please create a venture first.</div>;
      case 'evidence': return venture ? <Evidence venture={venture} /> : <div className="p-8">Please create a venture first.</div>;
      case 'coach': return <AICoach venture={venture} />;
      case 'pitch': return venture ? <PitchBuilder venture={venture} /> : <div className="p-8">Please create a venture first.</div>;
      case 'funding': return <FundingInsights />;
      case 'matching': return <MentorMatching />;
      case 'team': return <TeamMatching />;
      case 'dataroom': return venture ? <DataRoom venture={venture} /> : <div className="p-8">Please create a venture first.</div>;
      case 'campus': return <CampusHub />;
      case 'demoday': return <DemoDay />;
      case 'settings': return <Settings />;
      case 'notifications': return <Notifications />;
      default: return <DashboardHome user={user} ventures={ventures} setVentures={setVentures} setVenture={setVenture} onManageVenture={(v) => { setVenture(v); setActiveTab('canvas'); }} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-main flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userName={user?.name || 'Alex Founder'} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogoClick={() => setView('landing')}
      />
      
      <div className="flex-1 flex flex-col lg:ml-[260px]">
        <Header 
          userName={user?.name || 'Alex Founder'} 
          onMenuClick={() => setIsSidebarOpen(true)}
          onNotificationClick={() => setActiveTab('notifications')}
        />
        
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-[1400px] mx-auto w-full p-4 lg:p-8"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
