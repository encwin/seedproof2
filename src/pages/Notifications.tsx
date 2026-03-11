import React from 'react';
import { CheckCircle2, TrendingUp, AlertCircle, UserPlus, Info, Calendar } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Milestone Approved',
      message: 'Your "MVP Validation" milestone has been approved by your mentor.',
      time: '2 hours ago',
      unread: true,
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      iconBg: 'bg-green-50'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Investor View',
      message: 'Venture Capital firm "Early Stage SEA" viewed your profile.',
      time: '5 hours ago',
      unread: true,
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Upcoming Deadline',
      message: 'Demo Day submission deadline is approaching in 2 days.',
      time: '1 day ago',
      unread: false,
      icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
      iconBg: 'bg-orange-50'
    },
    {
      id: 4,
      type: 'purple',
      title: 'Mentor Request Accepted',
      message: 'Dr. Sarah Johnson has accepted your mentorship request.',
      time: '2 days ago',
      unread: false,
      icon: <UserPlus className="w-5 h-5 text-indigo-500" />,
      iconBg: 'bg-indigo-50'
    },
    {
      id: 5,
      type: 'neutral',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Saturday, Jan 25th from 2:00 AM to 4:00 AM.',
      time: '3 days ago',
      unread: false,
      icon: <Info className="w-5 h-5 text-slate-600" />,
      iconBg: 'bg-slate-50'
    },
    {
      id: 6,
      type: 'purple',
      title: 'New Resource Available',
      message: 'Check out the new "Fundraising 101" guide in the Campus Hub.',
      time: '1 week ago',
      unread: false,
      icon: <Calendar className="w-5 h-5 text-purple-500" />,
      iconBg: 'bg-purple-50'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Notifications</h2>
          <p className="text-slate-500 text-lg">Stay updated with your venture progress and platform activity.</p>
        </div>
        <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`bg-white p-6 rounded-2xl border flex items-start gap-6 transition-all ${
              notification.unread ? 'border-blue-100 shadow-sm shadow-blue-500/5' : 'border-slate-100'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notification.iconBg}`}>
              {notification.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-slate-900">{notification.title}</h3>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm text-slate-500">{notification.time}</span>
                  {notification.unread && (
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  )}
                </div>
              </div>
              <p className="text-slate-600 text-[15px]">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
