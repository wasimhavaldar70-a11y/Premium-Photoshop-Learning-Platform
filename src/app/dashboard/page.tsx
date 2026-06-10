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
  Star
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
  // If activeLesson is set, use it. Otherwise find first incomplete lesson.
  let continueLesson = activeLesson;
  if (!continueLesson && modules.length > 0) {
    for (const mod of modules) {
      const incomplete = mod.lessons.find(l => !user.completedLessons.includes(l.id));
      if (incomplete) {
        continueLesson = incomplete;
        break;
      }
    }
    // Fallback to absolute first lesson
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

  // Get a list of all lessons to display as recommendations
  const allLessons = modules.flatMap(m => m.lessons);
  const recommendedLessons = allLessons
    .filter(l => !user.completedLessons.includes(l.id))
    .slice(0, 3); // recommend up to 3 incomplete lessons

  // Fallback to first few if all completed
  const displayRecommendations = recommendedLessons.length > 0 
    ? recommendedLessons 
    : allLessons.slice(0, 3);

  return (
    <div className="space-y-10 pb-12">
      {/* 1. Header Welcome Greeting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {user.name.split(' ')[0]} 🎨
          </h1>
          <p className="text-gray-400 text-sm font-light mt-1">
            Keep learning, keep growing. Your design career is loading.
          </p>
        </div>
        
        {/* Streak Counter / Badge preview */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-dark-gray border border-card-border">
          <Flame className="text-orange-500 fill-orange-500 animate-pulse" size={20} />
          <div className="text-left">
            <div className="text-xs text-gray-400 font-medium">Daily Streak</div>
            <div className="text-sm font-bold text-white">4 Days Active</div>
          </div>
        </div>
      </div>

      {/* 2. Top Row Progress Overview & Continue Watching */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Continue Watching */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden bg-[#0D0D0F]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ps-blue/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="space-y-4">
            <span className="text-[10px] text-ps-blue font-bold uppercase tracking-wider bg-ps-blue/10 px-2.5 py-1 rounded-full border border-ps-blue/20">
              Continue Learning
            </span>
            {continueLesson ? (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{continueLesson.title}</h2>
                  <p className="text-xs text-gray-400 font-light mt-1 line-clamp-2 max-w-xl">
                    {continueLesson.description}
                  </p>
                </div>
                
                {/* Mock Video player Thumbnail Preview */}
                <div className="relative aspect-video max-w-md rounded-xl overflow-hidden border border-card-border shadow-md group">
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors cursor-pointer" onClick={handleContinueClick}>
                    <div className="w-12 h-12 rounded-full bg-ps-blue flex items-center justify-center text-white shadow-lg shadow-ps-blue/30 scale-100 group-hover:scale-110 transition-transform">
                      <Play size={20} fill="white" />
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
                    <div className="h-full bg-ps-blue w-1/3" /> {/* Mock 33% progress */}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No active lesson loaded. Start with Module 1!</p>
            )}
          </div>

          <div className="pt-6 border-t border-card-border/50 mt-6 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Next up: {continueLesson ? 'Complete this lesson' : 'Pick a module'}
            </span>
            <button 
              onClick={handleContinueClick}
              className="px-5 py-2.5 text-xs font-bold bg-ps-blue hover:bg-ps-blue/90 text-white rounded-full transition-colors flex items-center gap-1.5 shadow-lg shadow-ps-blue/10"
            >
              Resume Lesson <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Circular Progress Gauge */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-6 flex flex-col justify-between items-center text-center bg-[#0D0D0F]">
          <h3 className="text-sm font-bold text-white self-start">Overall Status</h3>
          
          <div className="relative w-36 h-36 my-6 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background track */}
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                className="stroke-white/5" 
                strokeWidth="8"
                fill="none" 
              />
              {/* Highlight track */}
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                className="stroke-ps-blue" 
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionRate / 100)}`}
                strokeLinecap="round"
                fill="none" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-white">{completionRate}%</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Complete</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full border-t border-card-border/50 pt-4 text-left">
            <div>
              <div className="text-xs text-gray-500 font-medium">Completed</div>
              <div className="text-base font-bold text-white">{completedCount} lessons</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Remaining</div>
              <div className="text-base font-bold text-white">{remainingCount} lessons</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Recommended Next Lessons Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayRecommendations.map((lesson) => {
            const mod = modules.find(m => m.id === lesson.moduleId);
            return (
              <div 
                key={lesson.id} 
                className="glass-card rounded-xl p-5 hover:border-ps-blue/30 transition-all duration-300 flex flex-col justify-between h-[180px] cursor-pointer group"
                onClick={() => {
                  setActiveLessonById(lesson.id);
                  router.push('/dashboard/learn');
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-medium">{mod?.title.split('—')[0]}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      lesson.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                      lesson.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-ps-blue transition-colors line-clamp-2">{lesson.title}</h4>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-card-border/40 pt-3">
                  <span className="flex items-center gap-1"><Clock size={12} /> {lesson.duration}</span>
                  <span className="text-ps-blue font-semibold group-hover:underline flex items-center gap-0.5">
                    Start <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Achievements & Badges Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Unlocked Designer Badges</h3>
        
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
          
          <div className="glass-card p-4 rounded-xl flex items-center gap-4 opacity-40">
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
