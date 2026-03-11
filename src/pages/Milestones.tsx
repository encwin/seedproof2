import React, { useState, useEffect } from 'react';
import { Plus, X, Link, Calendar, FileText, Loader2 } from 'lucide-react';
import { Venture, Milestone } from '../types';
import MilestoneTimeline from '../components/MilestoneTimeline';
import { motion, AnimatePresence } from 'motion/react';

export default function Milestones({ venture }: { venture: Venture }) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    evidenceLink: ''
  });

  useEffect(() => {
    fetchMilestones();
  }, [venture]);

  const fetchMilestones = async () => {
    const res = await fetch(`/api/milestones/${venture.id}`);
    const data = await res.json();
    setMilestones(data);
    setLoading(false);
  };

  const handleEdit = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setFormData({
      title: milestone.title,
      description: milestone.description,
      date: milestone.date,
      evidenceLink: milestone.evidenceLink || ''
    });
    setShowAdd(true);
  };

  const resetForm = () => {
    setShowAdd(false);
    setEditingMilestone(null);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      evidenceLink: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingMilestone) {
        await fetch(`/api/milestones/${editingMilestone.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch('/api/milestones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ventureId: venture.id, ...formData })
        });
      }
      resetForm();
      fetchMilestones();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading milestones...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <MilestoneTimeline milestones={milestones} onAdd={() => { resetForm(); setShowAdd(true); }} onEdit={handleEdit} />

      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative"
            >
              <button 
                onClick={resetForm}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{editingMilestone ? 'Edit Milestone' : 'New Milestone'}</h3>
              <p className="text-slate-500 mb-8">Document your progress with evidence.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Milestone Title</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      required
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. First 10 Beta Users"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What did you achieve and how?"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-32 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Evidence Link</label>
                    <div className="relative">
                      <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="url"
                        value={formData.evidenceLink}
                        onChange={e => setFormData({ ...formData, evidenceLink: e.target.value })}
                        placeholder="https://..."
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingMilestone ? null : <Plus className="w-5 h-5" />)}
                  {saving ? 'Saving...' : (editingMilestone ? 'Save Changes' : 'Add Milestone')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
