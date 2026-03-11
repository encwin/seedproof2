import React, { useState } from 'react';
import { MapPin, Search, Filter, Star } from 'lucide-react';
import { motion } from 'motion/react';

const profiles = [
  {
    id: 1,
    name: 'Sarah',
    role: 'Angel Investor',
    match: 94,
    bio: 'Former SaaS founder. Investing in early-stage',
    interests: ['B2B SaaS', 'Climate / CleanTech'],
    tags: ['B2B', 'Climate', 'SaaS'],
    location: 'Bangkok, Thailand',
    rating: 4.9,
    reviews: 124,
    avatar: 'https://picsum.photos/seed/Sarah/200'
  },
  {
    id: 2,
    name: 'David',
    role: 'Mentor',
    match: 88,
    bio: 'VP of Product at Salesforce. Helping',
    interests: ['B2B SaaS', 'Consumer'],
    tags: ['Product', 'Strategy', 'Enterprise'],
    location: 'Singapore',
    rating: 4.8,
    reviews: 89,
    avatar: 'https://picsum.photos/seed/David/200'
  },
  {
    id: 3,
    name: 'Eleanor Rigby',
    role: 'VC Partner',
    match: 92,
    bio: 'Partner at Greylock. Looking for consumer',
    interests: ['Consumer'],
    tags: ['Consumer', 'Marketplace'],
    location: 'Tokyo, Japan',
    rating: 5.0,
    reviews: 56,
    avatar: 'https://picsum.photos/seed/Eleanor/200'
  },
  {
    id: 4,
    name: 'Michael',
    role: 'Angel Investor',
    match: 91,
    bio: 'Ex-Google. Interested in AI and deep tech',
    interests: ['Fintech', 'Health'],
    tags: ['AI', 'Infra', 'Deep Tech'],
    location: 'Seoul, South Korea',
    rating: 4.7,
    reviews: 112,
    avatar: 'https://picsum.photos/seed/Michael/200'
  },
  {
    id: 5,
    name: 'Jessica',
    role: 'Advisor',
    match: 85,
    bio: 'Go-to-market expert for B2B SaaS startups.',
    interests: ['B2B SaaS'],
    tags: ['GTM', 'Sales', 'Marketing'],
    location: 'Chiang Mai, Thailand',
    rating: 4.9,
    reviews: 78,
    avatar: 'https://picsum.photos/seed/Jessica/200'
  },
  {
    id: 6,
    name: 'Robert',
    role: 'VC Partner',
    match: 89,
    bio: 'Focusing on Climate and CleanTech innovations.',
    interests: ['Climate / CleanTech'],
    tags: ['Hardware', 'Sustainability'],
    location: 'Jakarta, Indonesia',
    rating: 4.6,
    reviews: 45,
    avatar: 'https://picsum.photos/seed/Robert/200'
  }
];

const ROLES = ['Mentor', 'Angel Investor', 'VC Partner', 'Advisor'];
const INTERESTS = ['B2B SaaS', 'Climate / CleanTech', 'Fintech', 'Health', 'Consumer'];

export default function MentorMatching() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          profile.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(profile.role);
    const matchesInterest = selectedInterests.length === 0 || profile.interests.some(i => selectedInterests.includes(i));
    
    return matchesSearch && matchesRole && matchesInterest;
  });

  return (
    <div className="flex flex-col md:flex-row gap-12 pb-20 max-w-6xl mx-auto">
      {/* Filters Sidebar */}
      <div className="w-full md:w-64 shrink-0 space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-6 h-6 text-slate-800" />
          <h2 className="text-2xl font-bold text-slate-900">Filters</h2>
        </div>

        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div>
          <h3 className="font-bold text-slate-900 mb-4 text-lg">Role</h3>
          <div className="space-y-3.5">
            {ROLES.map(role => (
              <label key={role} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={selectedRoles.includes(role)}
                    onChange={() => toggleRole(role)}
                    className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-colors cursor-pointer"
                  />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-slate-700 group-hover:text-slate-900 transition-colors">{role}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 mb-4 text-lg">Interests</h3>
          <div className="space-y-3.5">
            {INTERESTS.map(interest => (
              <label key={interest} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={selectedInterests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                    className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-colors cursor-pointer"
                  />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-slate-700 group-hover:text-slate-900 transition-colors">{interest}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-10">
          <h1 className="text-4xl font-bold text-slate-900 leading-tight">Recommended<br/>Matches</h1>
          <p className="text-slate-500 text-base max-w-[200px] md:text-right mt-2">Showing {filteredProfiles.length} matches based on your canvas</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredProfiles.map((profile, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={profile.id} 
              className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-start gap-5 mb-6">
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-16 h-16 rounded-full object-cover border border-slate-100 shrink-0" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-slate-900">{profile.name}</h3>
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md tracking-wide">{profile.match}% Match</span>
                  </div>
                  <p className="text-indigo-600 text-sm font-medium mb-1">{profile.role}</p>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-700">{profile.rating}</span>
                    <span className="text-slate-400">({profile.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-sm mb-6 min-h-[40px] leading-relaxed">{profile.bio}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {profile.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full text-xs font-medium border border-slate-100">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-6 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </div>

                <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:opacity-90 transition-opacity shadow-md shadow-blue-500/20">
                  Request Intro
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
