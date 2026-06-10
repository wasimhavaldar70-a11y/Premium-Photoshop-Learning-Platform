'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { 
  Play, 
  BookOpen, 
  Clock, 
  Award, 
  Trophy, 
  ChevronRight, 
  Flame,
  Star,
  Sparkles
} from 'lucide-react';

export default function StudentDashboardHome() {
  const { user, modules, activeLesson, setActiveLessonById } = useApp();
  const router = useRouter();

  if (!user) return null;

  // Calculate stats
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = user.completedLessons.length;
  const remainingCount = Math.max(totalLessons - completedCount, 0);
  const completionRate = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Determine continue lesson
  let continueLesson = activeLesson;
  if (!continueLesson && modules.length > 0) {
    for (const mod of modules) {
      const incomplete = mod.lessons.find(l => !user.completedLessons.includes(l.id));
      if (incomplete) {
        continueLesson = incomplete;
        break;
      }
    }
    if (!continueLesson && modules[0].lessons.length > 0) {
      continueLesson = modules[0].lessons[0];
    }
  }

  const handleContinueClick = () => {
    if (continueLesson) {
      setActiveLessonById(continueLesson.id);
      router.push('/dashboard/learn');
    } else if (modules.length > 0 && modules[0].lessons.length > 0) {
      setActiveLessonById(modules[0].lessons[0].id);
      router.push('/dashboard/learn');
    }
  };

  const allLessons = modules.flatMap(m => m.lessons);
  const recommendedLessons = allLessons
    .filter(l => !user.completedLessons.includes(l.id))
    .slice(0, 3);

  const displayRecommendations = recommendedLessons.length > 0 
    ? recommendedLessons 
    : allLessons.slice(0, 3);

  return (
    <div className="space-y-10 pb-12">
      {/* 1. Header Welcome Greeting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="font-heading text-3xl font-black text-white tracking-tight uppercase">
            Welcome back, {user.name.split(' ')[0]} 🎨
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm font-light mt-0.5">
            Keep learning, keep growing. Your design career is loading.
          </p>
        </div>
        
        {/* Streak Counter */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-dark-gray border border-card-border">
          <Flame className="text-orange-500 fill-orange-500 animate-pulse" size={18} />
          <div className="text-left">
            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Daily Streak</div>
            <div className="text-xs font-bold text-white">4 Days Active</div>
          </div>
        </div>
      </div>

      {/* 2. Top Row Progress Overview & Continue Watching */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Continue Watching */}
        <div className="lg:col-span-8 neon-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ps-blue/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex">
              <span className="text-[9px] text-ps-blue font-bold uppercase tracking-widest bg-ps-blue/10 px-3 py-1 rounded-full border border-ps-blue/20">
                Continue Learning
              </span>
            </div>
            {continueLesson ? (
              <div className="space-y-4 text-left">
                <div>
                  <h2 className="font-heading text-xl font-bold text-white tracking-tight">{continueLesson.title}</h2>
                  <p className="text-xs text-gray-400 font-light mt-1 line-clamp-2 max-w-xl">
                    {continueLesson.description}
                  </p>
                </div>
                
                {/* Video Preview */}
                <div className="relative aspect-video max-w-md rounded-xl overflow-hidden border border-card-border shadow-md group">
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors cursor-pointer" onClick={handleContinueClick}>
                    <div className="w-12 h-12 rounded-full bg-ps-blue flex items-center justify-center text-black shadow-lg shadow-ps-blue/30 scale-100 group-hover:scale-110 transition-transform">
                      <Play size={18} fill="currentColor" />
                    </div>
                  </div>
                  <video 
                    muted
                    loop
                    playsInline
                    src={continueLesson.videoUrl}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                    <div className="h-full bg-ps-blue w-1/3" />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No active lesson loaded. Start with Module 1!</p>
            )}
          </div>

          <div className="pt-6 border-t border-card-border/50 mt-6 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-light">
              Next up: {continueLesson ? 'Complete this lesson' : 'Pick a module'}
            </span>
            <button 
              onClick={handleContinueClick}
              className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider bg-ps-blue hover:bg-ps-blue/90 text-black rounded-full transition-colors flex items-center gap-1.5 shadow-lg shadow-ps-blue/10"
            >
              Resume Lesson <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Circular Progress Gauge */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-6 flex flex-col justify-between items-center text-center">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest self-start">Overall Status</h3>
          
          <div className="relative w-36 h-36 my-6 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                className="stroke-white/5" 
                strokeWidth="7"
                fill="none" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                className="stroke-ps-blue" 
                strokeWidth="7"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionRate / 100)}`}
                strokeLinecap="round"
                fill="none" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-heading text-3xl font-black text-white">{completionRate}%</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5 font-bold">Complete</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full border-t border-card-border/50 pt-4 text-left">
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Completed</div>
              <div className="text-sm font-bold text-white">{completedCount} lessons</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Remaining</div>
              <div className="text-sm font-bold text-white">{remainingCount} lessons</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Recommended Next Lessons Grid */}
      <div className="space-y-4 text-left">
        <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayRecommendations.map((lesson) => {
            const mod = modules.find(m => m.id === lesson.moduleId);
            return (
              <div 
                key={lesson.id} 
                className="neon-card rounded-xl p-5 flex flex-col justify-between h-[180px] cursor-pointer group"
                onClick={() => {
                  setActiveLessonById(lesson.id);
                  router.push('/dashboard/learn');
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{mod?.title.split('—')[0]}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      lesson.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                      lesson.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <h4 className="font-heading text-sm font-bold text-white group-hover:text-ps-blue transition-colors line-clamp-2">{lesson.title}</h4>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-card-border/40 pt-3">
                  <span className="flex items-center gap-1 font-mono"><Clock size={12} /> {lesson.duration}</span>
                  <span className="text-ps-blue font-bold uppercase tracking-wider text-[10px] group-hover:underline flex items-center gap-0.5">
                    Start <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Achievements & Badges Grid */}
      <div className="space-y-4 text-left">
        <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider">Unlocked Designer Badges</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "First Interface Workspace", desc: "Completed 1st lesson", icon: Trophy, req: 1 },
            { name: "Masking Champion", desc: "Completed 5 lessons", icon: Flame, req: 5 },
            { name: "Photoshop Master", desc: "Completed all course lessons", icon: Star, req: totalLessons }
          ].map((badge, idx) => {
            const isUnlocked = user.unlockedBadges.includes(badge.name) || completedCount >= badge.req;
            const Icon = badge.icon;
            return (
              <div 
                key={idx}
                className={`glass-card p-4 rounded-xl flex items-center gap-4 transition-opacity ${isUnlocked ? 'opacity-100 border-ps-blue/20' : 'opacity-40'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isUnlocked ? 'bg-ps-blue/10 text-ps-blue border border-ps-blue/20 shadow-lg shadow-ps-blue/5' : 'bg-white/5 text-gray-500'}`}>
                  <Icon size={24} fill={isUnlocked ? 'currentColor' : 'none'} />
                </div>
                <div className="text-left">
                  <div className={`text-xs font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{badge.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{isUnlocked ? 'Unlocked ✓' : `Requires ${badge.req} completed`}</div>
                </div>
              </div>
            );
          })}
          
          <div className="glass-card p-4 rounded-xl flex items-center gap-4 opacity-45">
            <div className="w-12 h-12 rounded-xl bg-white/5 text-gray-500 flex items-center justify-center">
              <Award size={24} />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-gray-500">Certificate of Completion</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Finish 100% of course</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
