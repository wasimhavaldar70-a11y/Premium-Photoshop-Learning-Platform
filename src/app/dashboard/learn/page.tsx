'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  Check, 
  ArrowRight, 
  Download, 
  BookOpen, 
  FileText, 
  ListVideo, 
  RotateCcw,
  Volume2, 
  Maximize2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function LearningArea() {
  const { 
    user, 
    modules, 
    activeLesson, 
    activeModule, 
    toggleLessonComplete, 
    setActiveLessonById 
  } = useApp();
  const router = useRouter();

  // Tab control in Sidebar
  const [activeTab, setActiveTab] = useState<'syllabus' | 'notes' | 'resources'>('syllabus');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Video Custom Controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync expanded modules to active lesson
  useEffect(() => {
    if (activeLesson) {
      setExpandedModules(prev => ({
        ...prev,
        [activeLesson.moduleId]: true
      }));
    }
  }, [activeLesson]);

  if (!user || !activeLesson) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-400 italic font-light">No lessons available or loaded. Back to dashboard.</p>
        <button onClick={() => router.push('/dashboard')} className="px-6 py-3 bg-ps-blue text-black font-bold text-xs uppercase tracking-wider rounded-full">
          Go to Dashboard
        </button>
      </div>
    );
  }

  // Toggle Play / Pause
  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Video Time updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setProgress(dur > 0 ? (current / dur) * 100 : 0);

    const format = (time: number) => {
      const mins = Math.floor(time / 60);
      const secs = Math.floor(time % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    setCurrentTime(format(current));
    if (dur) setDuration(format(dur));
  };

  // Skip progress bar
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration || 0;
    const skipTo = (parseFloat(e.target.value) / 100) * dur;
    videoRef.current.currentTime = skipTo;
    setProgress(parseFloat(e.target.value));
  };

  // Speed adjustment
  const handleSpeedChange = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  // Full screen toggle
  const handleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Confetti Completion celebration
  const isLessonCompleted = user.completedLessons.includes(activeLesson.id);

  const handleMarkComplete = () => {
    if (!isLessonCompleted) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#31A8FF', '#8B5CF6', '#06B6D4', '#ffffff']
      });
    }
    toggleLessonComplete(activeLesson.id);
  };

  // Navigate to next lesson
  const allLessons = modules.flatMap(m => m.lessons);
  const activeIdx = allLessons.findIndex(l => l.id === activeLesson.id);
  const nextLesson = activeIdx !== -1 && activeIdx < allLessons.length - 1 
    ? allLessons[activeIdx + 1] 
    : null;

  const handleNextLesson = () => {
    if (nextLesson) {
      setActiveLessonById(nextLesson.id);
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime('00:00');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12">
      
      {/* LEFT COLUMN: Main player and Lesson metadata */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Custom Video Player Wrapper */}
        <div className="relative rounded-2xl overflow-hidden bg-black border border-card-border shadow-2xl ps-glow group">
          
          <video 
            ref={videoRef}
            src={activeLesson.videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => { setIsPlaying(false); setProgress(100); }}
            className="w-full aspect-video object-cover cursor-pointer"
            onClick={handlePlayToggle}
          />

          {/* Custom Overlay Controls */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3">
            
            {/* Progress Slider */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-white/20 hover:h-1.5 rounded-lg appearance-none cursor-pointer accent-ps-blue transition-all"
            />

            {/* Control buttons row */}
            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-4">
                <button onClick={handlePlayToggle} className="hover:text-ps-blue transition-colors">
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>
                
                <span className="font-mono text-[11px]">{currentTime} / {duration}</span>
                
                <button 
                  onClick={() => { if (videoRef.current) videoRef.current.currentTime = 0; }}
                  className="hover:text-ps-blue transition-colors flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider"
                >
                  <RotateCcw size={14} /> Restart
                </button>
              </div>

              {/* Speed, Volume, Fullscreen */}
              <div className="flex items-center gap-4">
                {/* Playback speed selector */}
                <div className="flex items-center gap-1 border border-white/10 rounded-lg px-2 py-0.5 bg-black/40 text-[10px]">
                  {[1, 1.25, 1.5, 2].map((speed) => (
                    <button 
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`px-1.5 rounded font-bold ${playbackSpeed === speed ? 'text-ps-blue bg-ps-blue/15' : 'text-gray-500 hover:text-white'}`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                <button className="hover:text-ps-blue transition-colors"><Volume2 size={16} /></button>
                <button onClick={handleFullScreen} className="hover:text-ps-blue transition-colors"><Maximize2 size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Metadata Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 rounded-2xl bg-dark-gray border border-card-border text-left">
          <div>
            <h2 className="font-heading text-xl font-bold text-white tracking-tight">{activeLesson.title}</h2>
            <p className="text-[10px] text-ps-blue font-bold uppercase tracking-widest mt-1">
              {activeModule?.title || 'Photoshop Masterclass'}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleMarkComplete}
              className={`flex-1 md:flex-none px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                isLessonCompleted 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                  : 'bg-ps-blue hover:bg-ps-blue/90 text-black shadow-lg shadow-ps-blue/10'
              }`}
            >
              {isLessonCompleted ? (
                <>Completed <Check size={14} /></>
              ) : (
                <>Mark Complete <Check size={14} /></>
              )}
            </button>

            {nextLesson && (
              <button 
                onClick={handleNextLesson}
                className="flex-1 md:flex-none px-6 py-3.5 bg-[#17171A] hover:bg-gray-800 border border-card-border text-white rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                Next Lesson <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Tabbed Sidebar Workspace */}
      <div className="lg:col-span-4 glass-card rounded-2xl overflow-hidden bg-[#0D0D0F] border border-card-border h-[620px] flex flex-col z-10">
        
        {/* Tab Headers */}
        <div className="flex border-b border-card-border bg-black/60 backdrop-blur-md">
          {[
            { id: 'syllabus', label: 'Lessons', icon: ListVideo },
            { id: 'notes', label: 'Notes', icon: FileText },
            { id: 'resources', label: 'Resources', icon: Download }
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 flex flex-col items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all ${
                  isTabActive 
                    ? 'border-ps-blue text-ps-blue bg-ps-blue/5' 
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4">
          
          {/* TAB 1: Syllabus Catalog */}
          {activeTab === 'syllabus' && (
            <div className="space-y-3">
              {modules.map((mod) => (
                <div key={mod.id} className="border border-card-border/50 rounded-xl overflow-hidden bg-black/20">
                  <button
                    onClick={() => setExpandedModules(prev => ({ ...prev, [mod.id]: !prev[mod.id] }))}
                    className="w-full p-3 hover:bg-white/5 transition-colors flex items-center justify-between text-left text-[11px] font-bold text-gray-300"
                  >
                    <span className="truncate pr-4 uppercase tracking-wider">{mod.title.split(' — ')[1] || mod.title}</span>
                    {expandedModules[mod.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  
                  {expandedModules[mod.id] && (
                    <div className="bg-black/40 border-t border-card-border/30 p-2 space-y-1">
                      {mod.lessons.map((lesson) => {
                        const isCurrent = activeLesson.id === lesson.id;
                        const isDone = user.completedLessons.includes(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => {
                              setActiveLessonById(lesson.id);
                              setIsPlaying(false);
                              setProgress(0);
                            }}
                            className={`w-full p-2.5 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-colors ${
                              isCurrent 
                                ? 'bg-ps-blue/15 border border-ps-blue/20 text-ps-blue font-bold' 
                                : 'hover:bg-white/5 border border-transparent text-gray-400'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate pr-4 text-left">
                              <span className={`w-2 h-2 rounded-full ${isDone ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : isCurrent ? 'bg-ps-blue shadow-[0_0_8px_#31A8FF]' : 'bg-gray-600'}`} />
                              <span className="truncate">{lesson.title.split('. ')[1] || lesson.title}</span>
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono flex-shrink-0">{lesson.duration}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Lesson Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-gray-300 font-light text-left">
              <div className="flex items-center gap-2 border-b border-card-border/60 pb-2">
                <BookOpen size={15} className="text-ps-blue" />
                <span className="font-heading font-bold text-white text-[10px] uppercase tracking-widest">Lesson Notes</span>
              </div>
              <p className="text-xs bg-dark-gray p-4 rounded-xl border border-card-border text-gray-400 leading-relaxed italic">
                "{activeLesson.notes}"
              </p>
              <div className="space-y-2 text-xs">
                <div className="font-bold text-white uppercase tracking-wider text-[10px]">Hotkeys Covered:</div>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-400 font-light">
                  <li><code className="text-ps-blue font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5">Ctrl/Cmd + L</code> — Levels Adjust panel</li>
                  <li><code className="text-ps-blue font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5">Alt/Opt + Drag</code> — Clip Layer Mask</li>
                  <li><code className="text-ps-blue font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5">[</code> and <code className="text-ps-blue font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5">]</code> — Scale Brush Size</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Downloads */}
          {activeTab === 'resources' && (
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 border-b border-card-border/60 pb-2">
                <Download size={15} className="text-ps-blue" />
                <span className="font-heading font-bold text-white text-[10px] uppercase tracking-widest">Project Files</span>
              </div>
              
              {activeLesson.resources && activeLesson.resources.length > 0 ? (
                <div className="space-y-2.5">
                  {activeLesson.resources.map((res, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded-xl bg-black/40 border border-card-border flex items-center justify-between text-xs"
                    >
                      <div className="overflow-hidden pr-4">
                        <div className="font-bold text-white truncate">{res.name}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{res.size}</div>
                      </div>
                      
                      <button 
                        onClick={() => alert(`Mock file download triggered for: ${res.name}`)}
                        className="w-8 h-8 rounded-full bg-ps-blue/15 hover:bg-ps-blue hover:text-black text-ps-blue flex items-center justify-center transition-all flex-shrink-0"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic text-center py-4 font-light">No assets require download for this lesson.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
