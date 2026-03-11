import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <h1 className="text-4xl font-bold text-slate-900 mb-10">Settings</h1>

      <div className="space-y-8">
        {/* Profile Information Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm"
        >
          <h2 className="text-xl font-medium text-slate-900 mb-8">Profile Information</h2>
          
          <div className="space-y-6">
            {/* Profile Picture Section */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Profile Picture</label>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                  <span className="text-2xl font-bold text-slate-400">AF</span>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Upload New Photo
                  </button>
                  <button className="text-sm text-red-500 font-medium hover:text-red-600 text-left px-1">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input 
                type="text" 
                defaultValue="Alex Founder"
                className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 text-slate-900 focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input 
                type="email" 
                placeholder="alex.cmu.ac.th"
                className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 text-slate-500 focus:ring-2 focus:ring-blue-500 transition-shadow placeholder:text-slate-400"
              />
            </div>

            {/* University / Organization */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">University / Organization</label>
              <input 
                type="text" 
                placeholder="Chiang Mai University"
                className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 text-slate-900 focus:ring-2 focus:ring-blue-500 transition-shadow placeholder:text-slate-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Notifications Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm"
        >
          <h2 className="text-xl font-medium text-slate-900 mb-8">Notifications</h2>
          
          <div className="space-y-6">
            {/* Email Notifications Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">Email Notifications</span>
              <button 
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifications ? 'bg-slate-900' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Product Updates Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">Product Updates</span>
              <button 
                onClick={() => setProductUpdates(!productUpdates)}
                className={`w-12 h-6 rounded-full transition-colors relative ${productUpdates ? 'bg-slate-900' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${productUpdates ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-[#29b6f6] text-white rounded-xl font-medium hover:bg-[#1fa5e5] transition-colors shadow-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
