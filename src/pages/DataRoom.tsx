import React, { useState, useEffect } from 'react';
import { FolderLock, Upload, FileText, FileSpreadsheet, Image as ImageIcon, Link as LinkIcon, Share2, MoreVertical, Shield, Eye, Download, Trash2, Loader2, Users, Video } from 'lucide-react';
import { Venture, DataRoomFile } from '../types';
import { motion } from 'motion/react';

export default function DataRoom({ venture }: { venture: Venture }) {
  const [files, setFiles] = useState<DataRoomFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, [venture]);

  const fetchFiles = async () => {
    const res = await fetch(`/api/dataroom/${venture.id}`);
    const data = await res.json();
    
    const examples = [
      { fileName: 'Financial_Projections_2024.xlsx', fileType: 'XLS', uploadedAt: '2 days ago', fileUrl: '#' },
      { fileName: 'Product_Demo_Video.mp4', fileType: 'VID', uploadedAt: '1 week ago', fileUrl: '#' },
      { fileName: 'Cap_Table_Current.csv', fileType: 'CSV', uploadedAt: '3 weeks ago', fileUrl: '#' }
    ];
    
    setFiles([...data, ...examples]);
    setLoading(false);
  };

  const handleUpload = async () => {
    setUploading(true);
    // Mock upload
    setTimeout(async () => {
      await fetch('/api/dataroom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ventureId: venture.id,
          fileName: 'Pitch_Deck_v2.pdf',
          fileType: 'PDF',
          fileUrl: '#'
        })
      });
      fetchFiles();
      setUploading(false);
    }, 1500);
  };

  const getFileIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'PDF': return <FileText className="w-6 h-6 text-red-500" />;
      case 'XLS':
      case 'CSV': return <FileSpreadsheet className="w-6 h-6 text-green-500" />;
      case 'IMG':
      case 'PNG': return <ImageIcon className="w-6 h-6 text-blue-500" />;
      case 'VID': return <Video className="w-6 h-6 text-purple-500" />;
      default: return <LinkIcon className="w-6 h-6 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Secure Data Room</h2>
          <p className="text-sm text-slate-500">Manage and share your venture proof with investors.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Share2 className="w-4 h-4" />
            Share Access
          </button>
          <button 
            onClick={handleUpload}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
            <h3 className="font-bold mb-4">Activity Log</h3>
            <div className="space-y-4">
              <ActivityItem user="Sarah Chen" action="viewed Pitch Deck" time="2h ago" />
              <ActivityItem user="Marcus Thorne" action="downloaded Financials" time="5h ago" />
              <ActivityItem user="You" action="uploaded v2 Deck" time="1d ago" />
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Files & Assets</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{files.length} Items</span>
            </div>
            
            {files.length === 0 ? (
              <div className="p-20 text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <FolderLock className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Your data room is empty</h4>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">Upload your pitch deck, financials, and product demos to share with investors.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {files.map((file, i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200 group-hover:bg-white transition-colors">
                        {getFileIcon(file.fileType)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{file.fileName}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          {file.fileType} • {file.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                        <Users className="w-3.5 h-3.5" />
                        Manage Access
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ user, action, time }: { user: string, action: string, time: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 bg-white/10 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold">
        {user.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <p className="text-xs leading-tight">
          <span className="font-bold text-white">{user}</span> <span className="text-slate-400">{action}</span>
        </p>
        <p className="text-[10px] text-slate-500 mt-1">{time}</p>
      </div>
    </div>
  );
}
