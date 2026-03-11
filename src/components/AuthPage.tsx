import React, { useState } from 'react';
import { Rocket, Mail, Lock, User, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthPageProps {
  onLogin: (user: any) => void;
}

import { LOGO_URL } from '../constants';

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Founder'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  const demoEmail = "einaychiwin6@gmail.com";
  const demoPassword = "chitte";

  setTimeout(() => {
    if (isLogin) {
      // LOGIN
      if (formData.email === demoEmail && formData.password === demoPassword) {

        const user = {
          name: "Naychi",
          email: demoEmail,
          role: "Founder"
        };

        localStorage.setItem("seedproof_user", JSON.stringify(user));
        onLogin(user);

      } else {
        setError("Invalid demo credentials");
      }

    } else {
      // SIGNUP
      const user = {
        name: formData.name,
        email: formData.email,
        role: formData.role
      };

      localStorage.setItem("seedproof_user", JSON.stringify(user));
      onLogin(user);
    }

    setLoading(false);
  }, 800);
};
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');

  //   const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
  //   try {
  //     const res = await fetch(endpoint, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData)
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       onLogin(data);
  //     } else {
  //       setError(data.error || 'Authentication failed');
  //     }
  //   } catch (e) {
  //     setError('Network error. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 overflow-hidden flex flex-col md:flex-row border border-slate-100">
        {/* Left Side - Visual */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-emerald-400 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="mb-12">
            {!logoError ? (
              <img 
                src={LOGO_URL} 
                alt="Seedproof" 
                className="h-12 w-auto" 
                referrerPolicy="no-referrer" 
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Rocket className="w-10 h-10 text-white" />
                <span className="font-bold text-3xl tracking-tight text-white">Seedproof</span>
              </div>
            )}
          </div>
            
            <h2 className="text-4xl font-extrabold leading-tight mb-6">
              Build your venture <br /> with verified proof.
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
              Join Seedproof now to validate your ideas and attract investors.
            </p>

          <div className="relative space-y-6">
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="bg-white/20 p-2 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium">Verified milestones build investor trust instantly.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-12 md:p-16">
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h3>
            <p className="text-slate-500">
              {isLogin ? 'Enter your credentials to access your dashboard.' : 'Start your founder journey with Seedproof today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">I am a...</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                >
                  <option value="Founder">Founder</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Investor">Investor</option>
                </select>
              </div>
            )}

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-xl border border-red-100"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#29b6f6] text-white py-4 rounded-2xl font-bold hover:bg-[#1fa5e5] transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? 'Sign In' : 'Create Account'}
              {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
