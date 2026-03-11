import React from 'react';
import { TrendingUp, Briefcase, Globe, Filter, Search, ArrowUpRight, BarChart3, PieChart } from 'lucide-react';
import { motion } from 'motion/react';

const investors = [
  { name: 'Blue Horizon Ventures', stage: 'Seed', industry: 'SaaS', location: 'San Francisco', checkSize: '$250k - $1M' },
  { name: 'Green Seed Fund', stage: 'Pre-Seed', industry: 'EcoTech', location: 'Berlin', checkSize: '$100k - $500k' },
  { name: 'Future Capital', stage: 'Series A', industry: 'FinTech', location: 'London', checkSize: '$2M - $5M' },
  { name: 'NextGen Partners', stage: 'Seed', industry: 'AI/ML', location: 'New York', checkSize: '$500k - $2M' },
];

export default function FundingInsights() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Funding Insights</h2>
          <p className="text-sm text-slate-500">Discover investors and track market trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search investors..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Market Trends */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <BarChart3 className="w-24 h-24 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Market Sentiment</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">Bullish</p>
              <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +14% increase in early-stage deals
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <PieChart className="w-24 h-24 text-emerald-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Top Industry</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">Generative AI</p>
              <p className="text-xs text-slate-500 font-medium">Accounting for 32% of total seed funding</p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Investor Database</h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">1,240 Found</span>
            </div>
            <div className="divide-y divide-slate-100">
              {investors.map((inv, i) => (
                <div key={i} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200 group-hover:bg-white transition-colors">
                      <Briefcase className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{inv.name}</h4>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                        <Globe className="w-3 h-3" /> {inv.location} • {inv.stage}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{inv.checkSize}</p>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{inv.industry}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-slate-50 text-center">
              <button className="text-sm font-bold text-blue-600 hover:underline">View Full Database</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <h4 className="text-xl font-bold mb-4 relative z-10">Funding Tips</h4>
            <div className="space-y-6 relative z-10">
              <TipItem 
                title="Proof is everything" 
                desc="Investors are moving away from hype and towards verified traction." 
              />
              <TipItem 
                title="Know your numbers" 
                desc="Be ready to discuss your CAC, LTV, and burn rate in detail." 
              />
              <TipItem 
                title="Build relationships" 
                desc="Start connecting with mentors before you need the money." 
              />
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-6">Demo Day Feed</h4>
            <div className="space-y-4">
              <DemoDayItem title="Y Combinator W26" date="Mar 24, 2026" />
              <DemoDayItem title="Techstars Berlin" date="Apr 12, 2026" />
              <DemoDayItem title="Seedproof Virtual Demo" date="May 05, 2026" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TipItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div>
      <p className="font-bold text-sm mb-1">{title}</p>
      <p className="text-xs text-blue-100 leading-relaxed">{desc}</p>
    </div>
  );
}

function DemoDayItem({ title, date }: { title: string, date: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <div>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="text-[10px] text-slate-500 font-medium">{date}</p>
      </div>
      <button className="text-blue-600">
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
}
