'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Heart, 
  Bookmark, 
  Eye, 
  VolumeX, 
  Volume2, 
  Play, 
  Pause,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export default function ShortsSection() {
  const { shorts } = useApp();
  
  const [likesState, setLikesState] = useState<Record<string, { count: number; active: boolean }>>({
    s1: { count: 8420, active: false },
    s2: { count: 6710, active: false },
    s3: { count: 15400, active: false }
  });

  const [bookmarksState, setBookmarksState] = useState<Record<string, boolean>>({});
  const [mutedState, setMutedState] = useState(true);
  const [playingState, setPlayingState] = useState<Record<string, boolean>>({
    s1: true,
    s2: false,
    s3: false
  });

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handleLike = (shortId: string) => {
    setLikesState(prev => {
      const current = prev[shortId] || { count: 0, active: false };
      const isActive = current.active;
      return {
        ...prev,
        [shortId]: {
          count: isActive ? current.count - 1 : current.count + 1,
          active: !isActive
        }
      };
    });
  };

  const handleBookmark = (shortId: string) => {
    setBookmarksState(prev => ({
      ...prev,
      [shortId]: !prev[shortId]
    }));
  };

  const handlePlayToggle = (shortId: string) => {
    const video = videoRefs.current[shortId];
    if (!video) return;
    
    if (playingState[shortId]) {
      video.pause();
    } else {
      video.play();
    }
    
    setPlayingState(prev => ({
      ...prev,
      [shortId]: !prev[shortId]
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-4 z-10 relative">
      
      {/* Page Header */}
      <div className="text-center mb-6 space-y-1">
        <h2 className="font-heading text-2xl font-black text-white tracking-tight uppercase flex items-center justify-center gap-2">
          Design Shorts ⚡️
        </h2>
        <p className="text-xs text-gray-400 font-light">
          60-second Photoshop tricks and design speed hacks. Scroll vertically.
        </p>
      </div>

      {/* Snap Scroll Wrapper */}
      <div className="w-full max-w-[340px] h-[550px] overflow-y-scroll snap-y snap-mandatory border border-card-border rounded-3xl bg-black relative shadow-2xl no-scrollbar ps-glow">
        
        {shorts.map((short) => {
          const isLiked = likesState[short.id]?.active || false;
          const likesCount = likesState[short.id]?.count || short.likes;
          const isBookmarked = bookmarksState[short.id] || false;
          const isPlaying = playingState[short.id] || false;

          return (
            <div 
              key={short.id}
              className="w-full h-full snap-start snap-always relative flex items-center justify-center flex-shrink-0 bg-[#0B0B0C]"
            >
              <video 
                ref={el => { videoRefs.current[short.id] = el; }}
                src={short.videoUrl}
                loop
                muted={mutedState}
                autoPlay={short.id === 's1'}
                playsInline
                onClick={() => handlePlayToggle(short.id)}
                className="w-full h-full object-cover cursor-pointer"
              />

              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/35 cursor-pointer"
                  onClick={() => handlePlayToggle(short.id)}
                >
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-100 animate-pulse">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
              )}

              {/* Sidebar Action Controls */}
              <div className="absolute right-4 bottom-20 flex flex-col gap-5 z-20 items-center">
                
                {/* Mute button */}
                <button 
                  onClick={() => setMutedState(!mutedState)}
                  className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/90 transition-colors shadow-lg"
                >
                  {mutedState ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* Like button */}
                <div className="flex flex-col items-center gap-1">
                  <button 
                    onClick={() => handleLike(short.id)}
                    className={`w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all shadow-lg ${
                      isLiked ? 'text-red-500 scale-110' : 'text-white hover:text-red-400'
                    }`}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                  <span className="text-[10px] text-white font-bold">{likesCount.toLocaleString()}</span>
                </div>

                {/* Bookmark button */}
                <div className="flex flex-col items-center gap-1">
                  <button 
                    onClick={() => handleBookmark(short.id)}
                    className={`w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all shadow-lg ${
                      isBookmarked ? 'text-ps-blue scale-110' : 'text-white hover:text-ps-blue/80'
                    }`}
                  >
                    <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                  <span className="text-[10px] text-white font-bold">
                    {isBookmarked ? (short.bookmarks + 1).toLocaleString() : short.bookmarks.toLocaleString()}
                  </span>
                </div>

                {/* View Counter */}
                <div className="flex flex-col items-center text-gray-400">
                  <Eye size={14} />
                  <span className="text-[9px] font-bold mt-1">{short.views}</span>
                </div>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-black/60 to-transparent text-left z-10 flex flex-col gap-1 pr-16">
                <span className="text-[9px] text-ps-blue font-bold uppercase tracking-widest">
                  @psmastery.hacks
                </span>
                <h3 className="text-xs font-bold text-white leading-tight font-heading">
                  {short.title}
                </h3>
              </div>
            </div>
          );
        })}

        {/* Floating Scroll Guide */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-bold text-gray-400 pointer-events-none uppercase tracking-widest border border-white/5">
          <ChevronUp size={10} className="animate-bounce" /> Swipe Up <ChevronDown size={10} className="animate-bounce" />
        </div>
      </div>
    </div>
  );
}
