'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  BookOpen, 
  FileText, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Percent, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Lock, 
  ShieldAlert,
  Menu,
  ChevronRight,
  Database
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    user, 
    modules, 
    tips, 
    transactions, 
    analytics, 
    login, 
    addModule, 
    addLesson, 
    deleteLesson, 
    addTip 
  } = useApp();
  
  const router = useRouter();

  // Admin Tab State
  const [activeTab, setActiveTab] = useState<'analytics' | 'courses' | 'tips' | 'users'>('analytics');

  // Input Form States
  const [newModTitle, setNewModTitle] = useState('');
  const [newModDesc, setNewModDesc] = useState('');

  const [selectedModId, setSelectedModId] = useState('');
  const [newLessTitle, setNewLessTitle] = useState('');
  const [newLessDuration, setNewLessDuration] = useState('15:00');
  const [newLessDesc, setNewLessDesc] = useState('');
  const [newLessDiff, setNewLessDiff] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [newLessVideo, setNewLessVideo] = useState('https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-stylus-over-a-graphics-tablet-34282-large.mp4');
  const [newLessResourceName, setNewLessResourceName] = useState('');
  const [newLessResourceSize, setNewLessResourceSize] = useState('2.4 MB');

  const [newTipTitle, setNewTipTitle] = useState('');
  const [newTipCategory, setNewTipCategory] = useState('');
  const [newTipReadTime, setNewTipReadTime] = useState('2 min read');
  const [newTipContent, setNewTipContent] = useState('');
  const [newTipStep1, setNewTipStep1] = useState('');
  const [newTipStep2, setNewTipStep2] = useState('');

  // Unofficial quick login for demo
  const [authEmail, setAuthEmail] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login('admin@psmastery.com')) {
      router.refresh();
    }
  };

  // Guard Clause: Check if user is Admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#070708] text-light-gray flex items-center justify-center p-6">
        <div className="w-full max-w-md glass-card bg-[#0B0B0C] p-8 rounded-3xl shadow-2xl border-red-500/25 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto shadow-lg shadow-red-500/5">
            <Lock size={28} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Admin Access Required</h2>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              You are currently logged in as a student or guest. Please sign in with administrator credentials to view business metrics, user transaction details, and curriculum editors.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-3">
            <button 
              type="submit"
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/10"
            >
              Sign In as Admin (Sarah Connor)
            </button>
            <button 
              type="button"
              onClick={() => router.push('/dashboard')}
              className="w-full py-2.5 bg-dark-gray hover:bg-gray-800 border border-card-border text-xs text-gray-300 rounded-full font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={12} /> Back to Student Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Handle Form Submissions
  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModTitle.trim()) return;
    addModule(newModTitle, newModDesc);
    setNewModTitle('');
    setNewModDesc('');
    alert('New course module added successfully!');
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModId || !newLessTitle.trim()) {
      alert('Please select a target module and enter a lesson title.');
      return;
    }
    
    const resources = newLessResourceName.trim() 
      ? [{ name: newLessResourceName, size: newLessResourceSize, downloadUrl: '#' }] 
      : [];

    addLesson(selectedModId, {
      title: newLessTitle,
      duration: newLessDuration,
      description: newLessDesc,
      difficulty: newLessDiff,
      videoUrl: newLessVideo,
      resources,
      notes: 'Custom lesson details added by administration panel.'
    });

    setNewLessTitle('');
    setNewLessDesc('');
    setNewLessResourceName('');
    alert('Lesson added successfully to module!');
  };

  const handleCreateTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTipTitle.trim() || !newTipContent.trim()) return;
    
    const steps = [];
    if (newTipStep1.trim()) steps.push(newTipStep1);
    if (newTipStep2.trim()) steps.push(newTipStep2);

    addTip({
      title: newTipTitle,
      category: newTipCategory || 'General',
      readTime: newTipReadTime,
      content: newTipContent,
      steps
    });

    setNewTipTitle('');
    setNewTipCategory('');
    setNewTipContent('');
    setNewTipStep1('');
    setNewTipStep2('');
    alert('New Photoshop design tip published!');
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. Header Navigation Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Database size={12} /> Management Engine
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Control Panel</h1>
        </div>

        <button 
          onClick={() => router.push('/dashboard')}
          className="px-5 py-2.5 bg-dark-gray hover:bg-gray-800 border border-card-border rounded-full text-xs font-bold text-gray-300 transition-all flex items-center gap-1.5"
        >
          <ArrowLeft size={12} /> Exit to Student View
        </button>
      </div>

      {/* 2. Top-Level Metric Analytical Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Users', val: analytics.totalUsers.toLocaleString(), icon: Users, color: 'text-blue-400' },
          { label: 'Active Subscribers', val: analytics.activeSubscribers.toLocaleString(), icon: TrendingUp, color: 'text-green-400' },
          { label: 'Total Revenue', val: `$${analytics.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-yellow-400' },
          { label: 'Total Watch Time', val: `${analytics.watchTimeHours.toLocaleString()}h`, icon: Clock, color: 'text-purple-400' },
          { label: 'Avg Completion', val: `${analytics.completionRate}%`, icon: Percent, color: 'text-cyan-400' }
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="glass-card p-5 rounded-2xl flex flex-col justify-between h-[110px] bg-[#0D0D0F]">
              <div className="flex justify-between items-center text-gray-500">
                <span className="text-[10px] font-bold uppercase tracking-wider">{card.label}</span>
                <Icon size={14} className={card.color} />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight">{card.val}</div>
            </div>
          );
        })}
      </div>

      {/* 3. Tab Navigation Links */}
      <div className="flex border-b border-card-border/80 text-sm font-semibold text-gray-400">
        {[
          { id: 'analytics', label: 'Analytics & Logs', icon: BarChart3 },
          { id: 'courses', label: 'Course Catalog Editor', icon: BookOpen },
          { id: 'tips', label: 'Tips & Hacks', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          const isTabActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3.5 px-6 border-b-2 transition-all ${
                isTabActive 
                  ? 'border-purple-500 text-purple-400 bg-purple-500/5' 
                  : 'border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Tab Context Content Blocks */}

      {/* TAB 1: Analytics and Transaction Logs */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Interactive Revenue Analytics Graph Mockup */}
          <div className="lg:col-span-8 glass-card rounded-2xl p-6 bg-[#0D0D0F] space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-base">Monthly Revenue Breakdown</h3>
              <span className="text-xs text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">+18% this month</span>
            </div>
            
            {/* Custom CSS Line Graph */}
            <div className="h-64 flex items-end justify-between gap-4 pt-10 border-b border-card-border/60 pb-2 relative">
              {/* Horizontal Help lines */}
              <div className="absolute top-10 left-0 w-full h-[1px] bg-white/5" />
              <div className="absolute top-28 left-0 w-full h-[1px] bg-white/5" />
              <div className="absolute top-44 left-0 w-full h-[1px] bg-white/5" />
              
              {[
                { month: 'Jan', revenue: 4500, height: 'h-24' },
                { month: 'Feb', revenue: 6200, height: 'h-32' },
                { month: 'Mar', revenue: 8400, height: 'h-40' },
                { month: 'Apr', revenue: 9800, height: 'h-48' },
                { month: 'May', revenue: 11450, height: 'h-52' },
                { month: 'Jun', revenue: analytics.totalRevenue, height: 'h-60' }
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 z-10 group">
                  <div className="text-[10px] text-gray-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity mb-1">${bar.revenue.toLocaleString()}</div>
                  <div className={`w-full ${bar.height} bg-gradient-to-t from-purple-600/60 to-purple-400 rounded-t-lg transition-all group-hover:brightness-110 shadow-lg shadow-purple-500/10`} />
                  <div className="text-xs text-gray-500 font-bold mt-1">{bar.month}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stripe/Razorpay Recent Subscriptions List */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 bg-[#0D0D0F] space-y-6">
            <h3 className="font-bold text-white text-base">Recent Payments (Stripe)</h3>
            
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-3 rounded-xl bg-black border border-card-border flex items-center justify-between text-xs">
                  <div className="overflow-hidden pr-3 text-left">
                    <div className="font-bold text-white truncate">{tx.email}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{tx.plan} • {tx.date}</div>
                  </div>
                  <div className="font-mono font-bold text-green-400">+${tx.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Course Catalog Syllabus Editor */}
      {activeTab === 'courses' && (
        <div className="space-y-8 text-left">
          
          {/* Create Module & Add Lesson Form Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Form 1: Create Module */}
            <div className="glass-card rounded-2xl p-6 bg-[#0D0D0F] space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Plus size={16} className="text-purple-400" /> Create New Course Module
              </h3>
              
              <form onSubmit={handleCreateModule} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Module Title</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Module 9 — AI Tools Integration"
                    value={newModTitle}
                    onChange={(e) => setNewModTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Module Description</label>
                  <textarea 
                    rows={2}
                    placeholder="Master Photoshop Generative Fill, expand canvas, and generate assets..."
                    value={newModDesc}
                    onChange={(e) => setNewModDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold transition-all shadow-lg"
                >
                  Create Module
                </button>
              </form>
            </div>

            {/* Form 2: Create Lesson inside Module */}
            <div className="glass-card rounded-2xl p-6 bg-[#0D0D0F] space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Plus size={16} className="text-purple-400" /> Add Lesson to Module
              </h3>
              
              <form onSubmit={handleCreateLesson} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Select Module</label>
                  <select 
                    required 
                    value={selectedModId}
                    onChange={(e) => setSelectedModId(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">-- Choose Module --</option>
                    {modules.map(m => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Lesson Title</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="13. Generative Fill Mastery"
                    value={newLessTitle}
                    onChange={(e) => setNewLessTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Duration</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="18:30"
                      value={newLessDuration}
                      onChange={(e) => setNewLessDuration(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500 text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Difficulty</label>
                    <select 
                      value={newLessDiff}
                      onChange={(e) => setNewLessDiff(e.target.value as any)}
                      className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Resource File Name</label>
                    <input 
                      type="text" 
                      placeholder="Asset_Pack.zip"
                      value={newLessResourceName}
                      onChange={(e) => setNewLessResourceName(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Resource Size</label>
                    <input 
                      type="text" 
                      placeholder="12.4 MB"
                      value={newLessResourceSize}
                      onChange={(e) => setNewLessResourceSize(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500 text-center"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold transition-all shadow-lg mt-2"
                >
                  Add Lesson
                </button>
              </form>
            </div>
          </div>

          {/* Current Catalog List with Delete Controls */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base">Current Modules & Lessons Catalog</h3>
            
            <div className="space-y-4">
              {modules.map((mod) => (
                <div key={mod.id} className="glass-card rounded-2xl p-6 bg-[#0D0D0F]">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-bold text-white text-base">{mod.title}</h4>
                      <p className="text-xs text-gray-400 font-light mt-0.5">{mod.description}</p>
                    </div>
                    <span className="text-xs font-semibold bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20">
                      {mod.lessons.length} Lessons
                    </span>
                  </div>

                  <div className="space-y-2">
                    {mod.lessons && mod.lessons.length > 0 ? (
                      mod.lessons.map((lesson) => (
                        <div key={lesson.id} className="p-3 rounded-xl bg-black border border-card-border/60 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-white">{lesson.title}</span>
                            <span className="text-gray-500 font-mono ml-4">({lesson.duration})</span>
                            <span className="ml-3 text-[10px] bg-white/5 border border-white/5 text-gray-400 px-1.5 py-0.5 rounded font-mono">{lesson.difficulty}</span>
                          </div>

                          <button 
                            onClick={() => {
                              if (confirm(`Delete lesson: "${lesson.title}"?`)) {
                                deleteLesson(mod.id, lesson.id);
                              }
                            }}
                            className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 flex items-center justify-center transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-gray-500 italic">No lessons in this module yet. Add one above!</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Tips & Hacks Creator */}
      {activeTab === 'tips' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left: Publish Tip form */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 bg-[#0D0D0F] space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Plus size={16} className="text-purple-400" /> Publish Design Tip
            </h3>
            
            <form onSubmit={handleCreateTip} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase font-bold">Tip Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="3-Step Skin Smooth hack"
                  value={newTipTitle}
                  onChange={(e) => setNewTipTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Category</label>
                  <input 
                    type="text" 
                    placeholder="Skin Retouching"
                    value={newTipCategory}
                    onChange={(e) => setNewTipCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Read Time</label>
                  <input 
                    type="text" 
                    placeholder="3 min read"
                    value={newTipReadTime}
                    onChange={(e) => setNewTipReadTime(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500 text-center"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase font-bold">Intro Summary</label>
                <textarea 
                  rows={2}
                  required
                  placeholder="Frequency separation allows skin texture smoothing without destroying pores..."
                  value={newTipContent}
                  onChange={(e) => setNewTipContent(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase font-bold">Step 1 Details</label>
                <input 
                  type="text" 
                  placeholder="Duplicate layer and blur colors..."
                  value={newTipStep1}
                  onChange={(e) => setNewTipStep1(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase font-bold">Step 2 Details</label>
                <input 
                  type="text" 
                  placeholder="Isolate high frequency texture detail..."
                  value={newTipStep2}
                  onChange={(e) => setNewTipStep2(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold transition-all shadow-lg mt-2"
              >
                Publish Tip
              </button>
            </form>
          </div>

          {/* Right: Current Active Tips list */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-bold text-white text-base">Active Design Tips</h3>
            
            <div className="space-y-3">
              {tips.map((tip) => (
                <div key={tip.id} className="glass-card p-5 rounded-2xl bg-[#0D0D0F] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">{tip.category}</span>
                    <span className="text-xs text-gray-500">{tip.readTime}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{tip.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{tip.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
