'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlayCircle, 
  Compass, 
  LogOut, 
  Menu, 
  X, 
  Award,
  BookOpen,
  ArrowLeft,
  Tv
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, modules } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (isMounted && !user) {
      router.push('/');
    }
  }, [user, isMounted, router]);

  if (!isMounted || !user) {
    return (
      <div className="min-h-screen bg-rich-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ps-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate overall course progress
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = user.completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Learning Area', path: '/dashboard/learn', icon: PlayCircle },
    { name: 'Short Hacks', path: '/dashboard/shorts', icon: Tv },
  ];

  const handleLogoutClick = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#050506] flex text-light-gray font-jakarta relative overflow-hidden">
      {/* Background Decorative Mesh & Blob */}
      <div className="absolute inset-0 grid-mesh opacity-10 pointer-events-none z-0" />
      <div className="absolute top-[-300px] left-[-200px] w-[500px] h-[500px] bg-ps-blue/5 rounded-full filter blur-[120px] pointer-events-none z-0" />

      {/* 1. Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#09090B]/90 backdrop-blur-md border-r border-card-border/80 flex-shrink-0 z-10 relative">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-card-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-ps-blue flex items-center justify-center font-bold text-black shadow-lg shadow-ps-blue/20">
              Ps
            </div>
            <span className="font-heading font-extrabold text-white tracking-tight text-base">PS Mastery</span>
          </div>
        </div>

        {/* User Stats Card */}
        <div className="p-6 border-b border-card-border/50 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ps-blue/15 border border-ps-blue/30 flex items-center justify-center text-ps-blue font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="overflow-hidden text-left">
              <div className="text-sm font-bold text-white truncate">{user.name}</div>
              <div className="text-[9px] text-ps-blue font-extrabold uppercase tracking-wider">
                {user.subscription !== 'none' ? `${user.subscription} access` : 'no active plan'}
              </div>
            </div>
          </div>

          {user.role === 'student' && (
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Course Progress</span>
                <span className="font-bold text-white">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-ps-blue transition-all duration-500 rounded-full shadow-[0_0_10px_#31A8FF]" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[9px] text-gray-500 text-right">
                {completedLessons}/{totalLessons} lessons completed
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Navigation Options */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all border ${
                  isActive 
                    ? 'bg-ps-blue/10 border-ps-blue/20 text-ps-blue shadow-lg shadow-ps-blue/5' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <Icon size={16} />
                {item.name}
              </Link>
            );
          })}

          {user.role === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-bold text-purple-400 hover:bg-purple-500/5 hover:text-purple-300 transition-all border border-transparent"
            >
              <Award size={16} />
              Admin Panel
            </Link>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-card-border/50 flex flex-col gap-2">
          <Link 
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Web
          </Link>
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/5 hover:text-red-300 transition-colors"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* 2. Main Page Container */}
      <div className="flex-grow flex flex-col min-w-0 overflow-y-auto z-10 relative">
        {/* Mobile Header */}
        <header className="md:hidden glass-navbar flex items-center justify-between px-6 h-16 flex-shrink-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-ps-blue flex items-center justify-center font-bold text-black text-sm">
              Ps
            </div>
            <span className="font-heading font-extrabold text-white tracking-tight">PS Mastery</span>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-400 hover:text-white"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {isSidebarOpen && (
            <div className="fixed inset-0 z-40 bg-black/70 md:hidden" onClick={() => setIsSidebarOpen(false)}>
              <motion.div 
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                exit={{ x: -260 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-64 h-full bg-[#09090B] border-r border-card-border flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <div className="p-6 border-b border-card-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-ps-blue flex items-center justify-center font-bold text-black">
                        Ps
                      </div>
                      <span className="font-heading font-extrabold text-white tracking-tight">PS Mastery</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="p-6 border-b border-card-border/50 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-ps-blue/15 border border-ps-blue/30 flex items-center justify-center text-ps-blue font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold text-white">{user.name}</div>
                        <div className="text-[10px] text-ps-blue font-bold uppercase tracking-wider">{user.subscription} access</div>
                      </div>
                    </div>
                  </div>

                  <nav className="px-4 py-6 space-y-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.path;
                      return (
                        <Link
                          key={item.name}
                          href={item.path}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                            isActive 
                              ? 'bg-ps-blue/10 border border-ps-blue/20 text-ps-blue' 
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon size={16} />
                          {item.name}
                        </Link>
                      );
                    })}
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-bold text-purple-400 hover:bg-purple-500/5 hover:text-purple-300 transition-all border border-transparent"
                      >
                        <Award size={16} />
                        Admin Panel
                      </Link>
                    )}
                  </nav>
                </div>

                <div className="p-4 border-t border-card-border/50 flex flex-col gap-2">
                  <Link 
                    href="/"
                    className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-300"
                  >
                    <ArrowLeft size={14} /> Website
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/5"
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Child Route content */}
        <main className="flex-grow p-6 md:p-10 max-w-7xl w-full mx-auto relative z-10">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
