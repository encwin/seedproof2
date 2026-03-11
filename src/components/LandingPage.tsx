import React from 'react';
import { Rocket, ArrowRight, Play, TrendingUp, ShieldCheck, CheckCircle2, Users, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

import { LOGO_URL } from '../constants';

export default function LandingPage({ onStart }: { onStart: () => void }) {
  const [logoError, setLogoError] = React.useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 font-sans">
      {/* SVG Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="blue-emerald-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#2563eb" offset="0%" />
            <stop stopColor="#34d399" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-200">
        <div 
          className="cursor-pointer flex items-center gap-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          {!logoError ? (
            <img 
              src={LOGO_URL} 
              alt="Seedproof" 
              className="h-8 w-auto" 
              referrerPolicy="no-referrer" 
              onError={() => setLogoError(true)}
            />
          ) : (
            <Rocket className="w-6 h-6 text-blue-600" />
          )}
          <span className="font-bold text-xl tracking-tight text-slate-900">Seedproof</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[15px] font-medium text-slate-500 hover:text-slate-900 transition-colors">Features</a>
          <a href="#how-it-works" className="text-[15px] font-medium text-slate-500 hover:text-slate-900 transition-colors">How it Works</a>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onStart}
            className="text-[15px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={onStart}
            className="bg-[#29b6f6] text-white px-5 py-2.5 rounded-lg text-[15px] font-medium hover:bg-[#1fa5e5] transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/50 border border-blue-100 rounded-full text-sm font-semibold text-blue-700 mb-12">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            Now supporting 50+ Universities
          </div>
          
          <h1 className="text-[60px] font-bold tracking-tight text-[#11141d] mb-6 leading-[1.1]">
            Build proof. Earn trust.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-400">Unlock capital.</span>
          </h1>
          
          <p className="text-[16px] text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed">
            The proof-first venture platform where early-stage founders validate traction, connect with university ecosystems, and match with investors who value execution over slide decks.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto bg-[#29b6f6] text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-[#1fa5e5] transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group"
            >
              Create Venture Canvas
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onStart}
              className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5 fill-slate-700 text-slate-700" />
              Watch Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Trusted By */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">
            Trusted by leading university ecosystems
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <span className="text-xl font-bold text-slate-300">CMU</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <span className="text-xl font-bold text-slate-300">CU</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <span className="text-xl font-bold text-slate-300">KU</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <span className="text-xl font-bold text-slate-300">CMU BUILDS</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <span className="text-xl font-bold text-slate-300">Thammasat</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[40px] font-bold tracking-tight text-[#11141d] mb-6">More than just a pitch deck</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Seedproof replaces static slides with a dynamic, living system of record for your startup's progress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
                <TrendingUp className="w-6 h-6 text-blue-600" style={{ stroke: 'url(#blue-emerald-gradient)' }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Venture Canvas</h3>
              <p className="text-slate-500 leading-relaxed text-[15px]">
                A living dashboard that evolves with your startup. Track key metrics and milestones in real-time.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
                <ShieldCheck className="w-6 h-6 text-emerald-500" style={{ stroke: 'url(#blue-emerald-gradient)' }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Verifiable Proof</h3>
              <p className="text-slate-500 leading-relaxed text-[15px]">
                Connect GitHub, Stripe, and Analytics to automatically verify your traction and progress.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-blue-500" style={{ stroke: 'url(#blue-emerald-gradient)' }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">AI Pitch Coach</h3>
              <p className="text-slate-500 leading-relaxed text-[15px]">
                Get instant, unbiased feedback on your value prop, market sizing, and business model.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
                <Users className="w-6 h-6 text-purple-500" style={{ stroke: 'url(#blue-emerald-gradient)' }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Smart Matching</h3>
              <p className="text-slate-500 leading-relaxed text-[15px]">
                Find the right co-founders, mentors, and investors based on skills, stage, and sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/20 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              From idea to investment in three steps
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A structured path to validate your startup and connect with the right investors
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              { 
                step: "01", 
                title: "Build your Canvas", 
                desc: "Map out your business model, team, and goals on our structured framework.",
                icon: <TrendingUp className="h-8 w-8" />,
                color: "blue"
              },
              { 
                step: "02", 
                title: "Log Proof Points", 
                desc: "Update your progress weekly. Verify milestones with integrations.",
                icon: <Shield className="h-8 w-8" />,
                color: "emerald"
              },
              { 
                step: "03", 
                title: "Get Matched", 
                desc: "Unlock intros to investors and mentors once your proof score hits the threshold.",
                icon: <Users className="h-8 w-8" />,
                color: "blue"
              }
            ].map((item, idx) => (
              <div 
                key={item.step} 
                className="relative group"
              >
                {/* Connector Line */}
                {idx < 2 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-emerald-200 z-0"></div>
                )}
                
                {/* Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 h-full">
                  {/* Step Number Badge */}
                  <div className={`absolute -top-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-br ${
                    item.color === 'blue' ? 'from-blue-500 to-blue-600' : 'from-emerald-500 to-emerald-600'
                  } flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold font-mono">{item.step}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`h-16 w-16 rounded-xl ${
                    item.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                  } flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  
                  {/* Progress Indicator */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className={`h-1 flex-1 rounded-full ${
                      item.color === 'blue' ? 'bg-blue-200' : 'bg-emerald-200'
                    }`}>
                      <div className={`h-full w-2/3 rounded-full ${
                        item.color === 'blue' ? 'bg-blue-600' : 'bg-emerald-600'
                      } group-hover:w-full transition-all duration-500`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button 
              className="h-14 px-8 bg-gradient-to-r from-blue-600 to-emerald-400 hover:from-blue-700 hover:to-emerald-500 text-white rounded-xl font-bold shadow-xl shadow-blue-200 flex items-center justify-center mx-auto transition-all" 
              onClick={onStart}
            >
              Start Building Your Canvas
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
