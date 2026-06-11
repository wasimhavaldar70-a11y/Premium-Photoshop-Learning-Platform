'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Lesson, 
  Module, 
  Tip, 
  Short, 
  mockModules, 
  mockTips, 
  mockShorts, 
  mockTestimonials 
} from '../data/mockData';

export interface UserProfile {
  name: string;
  email: string;
  role: 'student' | 'admin';
  subscription: 'none' | 'monthly' | 'yearly' | 'lifetime';
  completedLessons: string[]; // List of lesson IDs
  unlockedBadges: string[];
}

export interface Transaction {
  id: string;
  email: string;
  plan: string;
  amount: number;
  date: string;
}

interface AppContextType {
  user: UserProfile | null;
  modules: Module[];
  tips: Tip[];
  shorts: Short[];
  transactions: Transaction[];
  activeLesson: Lesson | null;
  activeModule: Module | null;
  login: (email: string) => boolean;
  logout: () => void;
  purchaseSubscription: (plan: 'monthly' | 'yearly' | 'lifetime') => void;
  toggleLessonComplete: (lessonId: string) => void;
  setActiveLessonById: (lessonId: string) => void;
  addModule: (title: string, description: string) => void;
  addLesson: (moduleId: string, lesson: Omit<Lesson, 'id' | 'moduleId'>) => void;
  deleteLesson: (moduleId: string, lessonId: string) => void;
  addTip: (tip: Omit<Tip, 'id' | 'likes'>) => void;
  addShort: (short: Omit<Short, 'id' | 'views' | 'likes' | 'bookmarks'>) => void;
  analytics: {
    totalUsers: number;
    activeSubscribers: number;
    totalRevenue: number;
    watchTimeHours: number;
    completionRate: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Load initial data from localStorage if exists, otherwise mockData
  const [user, setUser] = useState<UserProfile | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [shorts, setShorts] = useState<Short[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  // Initialize state on client side
  useEffect(() => {
    const localUser = localStorage.getItem('ps_user');
    const localModules = localStorage.getItem('ps_modules');
    const localTips = localStorage.getItem('ps_tips');
    const localShorts = localStorage.getItem('ps_shorts');
    const localTransactions = localStorage.getItem('ps_transactions');

    if (localUser) {
      setUser(JSON.parse(localUser));
    } else {
      // Default logged in student profile
      const defaultStudent: UserProfile = {
        name: 'Alex Mercer',
        email: 'student@psmastery.com',
        role: 'student',
        subscription: 'none',
        completedLessons: ['l1'], // Start with one completed lesson
        unlockedBadges: ['First Interface Workspace']
      };
      setUser(defaultStudent);
      localStorage.setItem('ps_user', JSON.stringify(defaultStudent));
    }

    if (localModules) {
      const parsedModules = JSON.parse(localModules);
      setModules(parsedModules);
      // Select first lesson by default
      if (parsedModules.length > 0 && parsedModules[0].lessons.length > 0) {
        setActiveModule(parsedModules[0]);
        setActiveLesson(parsedModules[0].lessons[0]);
      }
    } else {
      setModules(mockModules);
      localStorage.setItem('ps_modules', JSON.stringify(mockModules));
      if (mockModules.length > 0 && mockModules[0].lessons.length > 0) {
        setActiveModule(mockModules[0]);
        setActiveLesson(mockModules[0].lessons[0]);
      }
    }

    if (localTips) {
      setTips(JSON.parse(localTips));
    } else {
      setTips(mockTips);
      localStorage.setItem('ps_tips', JSON.stringify(mockTips));
    }

    if (localShorts) {
      setShorts(JSON.parse(localShorts));
    } else {
      setShorts(mockShorts);
      localStorage.setItem('ps_shorts', JSON.stringify(mockShorts));
    }

    if (localTransactions) {
      setTransactions(JSON.parse(localTransactions));
    } else {
      const initialTransactions: Transaction[] = [
        { id: 'tx1', email: 'jack@design.com', plan: 'Yearly Plan', amount: 199, date: '2026-06-08' },
        { id: 'tx2', email: 'anna@framer.com', plan: 'Lifetime Access', amount: 399, date: '2026-06-09' },
        { id: 'tx3', email: 'luke@stripe.com', plan: 'Monthly Plan', amount: 29, date: '2026-06-10' }
      ];
      setTransactions(initialTransactions);
      localStorage.setItem('ps_transactions', JSON.stringify(initialTransactions));
    }
  }, []);

  // Save changes to localStorage helper
  const saveUser = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('ps_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('ps_user');
    }
  };

  const saveModules = (newModules: Module[]) => {
    setModules(newModules);
    localStorage.setItem('ps_modules', JSON.stringify(newModules));
  };

  const saveTips = (newTips: Tip[]) => {
    setTips(newTips);
    localStorage.setItem('ps_tips', JSON.stringify(newTips));
  };

  const saveShorts = (newShorts: Short[]) => {
    setShorts(newShorts);
    localStorage.setItem('ps_shorts', JSON.stringify(newShorts));
  };

  const saveTransactions = (newTx: Transaction[]) => {
    setTransactions(newTx);
    localStorage.setItem('ps_transactions', JSON.stringify(newTx));
  };

  // Auth Operations
  const login = (email: string): boolean => {
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === 'admin@psmastery.com') {
      const adminProfile: UserProfile = {
        name: 'Sarah Connor (Admin)',
        email: cleanEmail,
        role: 'admin',
        subscription: 'lifetime',
        completedLessons: [],
        unlockedBadges: ['Instructor Mastery']
      };
      saveUser(adminProfile);
      return true;
    } else if (cleanEmail === 'student@psmastery.com' || cleanEmail.includes('@')) {
      // Create or load profile
      const userProfile: UserProfile = {
        name: cleanEmail === 'student@psmastery.com' ? 'Alex Mercer' : cleanEmail.split('@')[0],
        email: cleanEmail,
        role: 'student',
        subscription: cleanEmail === 'student@psmastery.com' ? 'lifetime' : 'none',
        completedLessons: cleanEmail === 'student@psmastery.com' ? ['l1'] : [],
        unlockedBadges: []
      };
      saveUser(userProfile);
      return true;
    }
    return false;
  };

  const logout = () => {
    saveUser(null);
  };

  const purchaseSubscription = (plan: 'monthly' | 'yearly' | 'lifetime') => {
    if (!user) return;
    const pricing = { monthly: 29, yearly: 199, lifetime: 799 };
    const planName = plan === 'monthly' ? 'Monthly Plan' : plan === 'yearly' ? 'Yearly Plan' : 'Lifetime Access (₹799)';
    
    const updatedUser: UserProfile = {
      ...user,
      subscription: plan
    };
    saveUser(updatedUser);

    const newTx: Transaction = {
      id: 'tx-' + Math.random().toString(36).substr(2, 9),
      email: user.email,
      plan: planName,
      amount: pricing[plan],
      date: new Date().toISOString().split('T')[0]
    };
    saveTransactions([newTx, ...transactions]);
  };

  const toggleLessonComplete = (lessonId: string) => {
    if (!user || user.role !== 'student') return;

    let updatedCompleted = [...user.completedLessons];
    if (updatedCompleted.includes(lessonId)) {
      updatedCompleted = updatedCompleted.filter(id => id !== lessonId);
    } else {
      updatedCompleted.push(lessonId);
    }

    // Check for new badges
    const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const updatedBadges = [...user.unlockedBadges];
    
    if (updatedCompleted.length >= 1 && !updatedBadges.includes('First Interface Workspace')) {
      updatedBadges.push('First Interface Workspace');
    }
    if (updatedCompleted.length >= 5 && !updatedBadges.includes('Masking Champion')) {
      updatedBadges.push('Masking Champion');
    }
    if (updatedCompleted.length === totalLessons && totalLessons > 0 && !updatedBadges.includes('Photoshop Master')) {
      updatedBadges.push('Photoshop Master');
    }

    const updatedUser: UserProfile = {
      ...user,
      completedLessons: updatedCompleted,
      unlockedBadges: updatedBadges
    };
    saveUser(updatedUser);
  };

  const setActiveLessonById = (lessonId: string) => {
    for (const mod of modules) {
      const found = mod.lessons.find(l => l.id === lessonId);
      if (found) {
        setActiveModule(mod);
        setActiveLesson(found);
        break;
      }
    }
  };

  // Admin CRUD operations
  const addModule = (title: string, description: string) => {
    const newModule: Module = {
      id: 'm-' + Math.random().toString(36).substr(2, 9),
      title,
      description,
      lessonsCount: 0,
      lessons: []
    };
    saveModules([...modules, newModule]);
  };

  const addLesson = (moduleId: string, lessonInput: Omit<Lesson, 'id' | 'moduleId'>) => {
    const newLesson: Lesson = {
      ...lessonInput,
      id: 'l-' + Math.random().toString(36).substr(2, 9),
      moduleId
    };

    const updatedModules = modules.map(mod => {
      if (mod.id === moduleId) {
        const lessonsList = [...mod.lessons, newLesson];
        return {
          ...mod,
          lessons: lessonsList,
          lessonsCount: lessonsList.length
        };
      }
      return mod;
    });
    saveModules(updatedModules);

    // If active lesson was null or set to this module, refresh active
    if (!activeLesson) {
      setActiveLesson(newLesson);
    }
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    const updatedModules = modules.map(mod => {
      if (mod.id === moduleId) {
        const lessonsList = mod.lessons.filter(l => l.id !== lessonId);
        return {
          ...mod,
          lessons: lessonsList,
          lessonsCount: lessonsList.length
        };
      }
      return mod;
    });
    saveModules(updatedModules);

    if (activeLesson?.id === lessonId) {
      // Find another active lesson
      const firstMod = updatedModules.find(m => m.lessons.length > 0);
      if (firstMod) {
        setActiveModule(firstMod);
        setActiveLesson(firstMod.lessons[0]);
      } else {
        setActiveLesson(null);
        setActiveModule(null);
      }
    }
  };

  const addTip = (tipInput: Omit<Tip, 'id' | 'likes'>) => {
    const newTip: Tip = {
      ...tipInput,
      id: 't-' + Math.random().toString(36).substr(2, 9),
      likes: Math.floor(Math.random() * 20) + 1
    };
    saveTips([newTip, ...tips]);
  };

  const addShort = (shortInput: Omit<Short, 'id' | 'views' | 'likes' | 'bookmarks'>) => {
    const newShort: Short = {
      ...shortInput,
      id: 's-' + Math.random().toString(36).substr(2, 9),
      views: '0K',
      likes: 0,
      bookmarks: 0
    };
    saveShorts([newShort, ...shorts]);
  };

  // Compute live analytics based on subscriptions, lessons completed, users
  const totalRevenue = transactions.reduce((sum, tx) => sum + tx.amount, 12450); // Start base + transactions
  const activeSubscribers = 1894 + transactions.filter(t => t.plan !== 'Refunded').length;
  const totalUsers = 2541 + (user ? 1 : 0);
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = user?.role === 'student' ? user.completedLessons.length : 0;
  
  // Calculate average completion rate: base 64% + student modifications
  const studentRate = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 65;
  const completionRate = Math.min(Math.round((64.5 * 10 + studentRate) / 11), 100);

  const watchTimeHours = 12450 + (completedCount * 12.5); // Add mock watch time per completion

  return (
    <AppContext.Provider value={{
      user,
      modules,
      tips,
      shorts,
      transactions,
      activeLesson,
      activeModule,
      login,
      logout,
      purchaseSubscription,
      toggleLessonComplete,
      setActiveLessonById,
      addModule,
      addLesson,
      deleteLesson,
      addTip,
      addShort,
      analytics: {
        totalUsers,
        activeSubscribers,
        totalRevenue,
        watchTimeHours,
        completionRate
      }
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
