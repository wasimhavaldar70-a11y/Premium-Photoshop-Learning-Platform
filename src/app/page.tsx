'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { mockTestimonials } from '@/data/mockData';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Play, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Layout, 
  BookOpen, 
  Folder, 
  Award,
  Shield,
  Layers,
  Sparkles,
  Zap,
  Lock,
  Menu,
  X,
  CreditCard,
  CheckCircle2,
  Sliders,
  Maximize2,
  MousePointer,
  RotateCcw,
  User,
  Briefcase,
  Users,
  Compass,
  Clock,
  Rocket,
  GraduationCap
} from 'lucide-react';

// Framer Motion Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};

const textFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  hover: { 
    scale: 1.03, 
    y: -5,
    transition: { duration: 0.3, ease: "easeOut" as const } 
  }
};

const learningModules = [
  {
    id: '01',
    num: '01',
    title: 'Photoshop Foundations',
    level: 'Beginner Friendly',
    track: 'photoshop',
    lessons: '20 Lessons',
    time: '6h 30m',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    skills: ['Tools & Interface', 'Layers & Masks', 'Selection & Basics']
  },
  {
    id: '02',
    num: '02',
    title: 'Photoshop Retouching',
    level: 'Beginner Friendly',
    track: 'photoshop',
    lessons: '25 Lessons',
    time: '7h 45m',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    skills: ['Skin Retouching', 'Color Correction', 'Photo Enhancement']
  },
  {
    id: '03',
    num: '03',
    title: 'Social Media Design Mastery',
    level: 'Beginner Friendly',
    track: 'photoshop',
    lessons: '30 Lessons',
    time: '8h 20m',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=150&auto=format&fit=crop&q=80',
    skills: ['Instagram Posts', 'Stories & Carousels', 'Thumbnails & Ads']
  },
  {
    id: '04',
    num: '04',
    title: 'Poster & Advertisement Design',
    level: 'Intermediate',
    track: 'photoshop',
    lessons: '25 Lessons',
    time: '7h 10m',
    img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=150&auto=format&fit=crop&q=80',
    skills: ['Movie Posters', 'Ads & Marketing', 'Billboard Concepts']
  },
  {
    id: '05',
    num: '05',
    title: 'Advanced Compositing',
    level: 'Advanced',
    track: 'photoshop',
    lessons: '30 Lessons',
    time: '9h 15m',
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
    skills: ['Photo Manipulation', 'Cinematic Effects', 'Fantasy Art']
  },
  {
    id: '06',
    num: '06',
    title: 'Graphic Design Fundamentals',
    level: 'Beginner Friendly',
    track: 'design',
    lessons: '20 Lessons',
    time: '6h 10m',
    img: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=150&auto=format&fit=crop&q=80',
    skills: ['Design Principles', 'Composition', 'Visual Hierarchy']
  },
  {
    id: '07',
    num: '07',
    title: 'Typography Mastery',
    level: 'Intermediate',
    track: 'design',
    lessons: '20 Lessons',
    time: '5h 40m',
    img: 'https://images.unsplash.com/photo-1561070791-26c113006238?w=150&auto=format&fit=crop&q=80',
    skills: ['Font Pairing', 'Layout Systems', 'Type Hierarchy']
  },
  {
    id: '08',
    num: '08',
    title: 'Color Theory & Branding',
    level: 'Intermediate',
    track: 'design',
    lessons: '20 Lessons',
    time: '6h 20m',
    img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=150&auto=format&fit=crop&q=80',
    skills: ['Color Psychology', 'Brand Identity', 'Color Systems']
  },
  {
    id: '09',
    num: '09',
    title: 'Logo Design Masterclass',
    level: 'Intermediate',
    track: 'design',
    lessons: '25 Lessons',
    time: '7h 30m',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80',
    skills: ['Logo Strategy', 'Sketch to Vector', 'Logo Presentation']
  },
  {
    id: '10',
    num: '10',
    title: 'Brand Identity Design',
    level: 'Advanced',
    track: 'design',
    lessons: '25 Lessons',
    time: '8h 10m',
    img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=150&auto=format&fit=crop&q=80',
    skills: ['Brand Systems', 'Guidelines', 'Stationery Design']
  },
  {
    id: '11',
    num: '11',
    title: 'Packaging Design',
    level: 'Advanced',
    track: 'design',
    lessons: '15 Lessons',
    time: '5h 15m',
    img: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=150&auto=format&fit=crop&q=80',
    skills: ['Product Packaging', 'Label Design', 'Box Mockups']
  },
  {
    id: '12',
    num: '12',
    title: 'Portfolio & Freelancing',
    level: 'Expert',
    track: 'design',
    lessons: '25 Lessons',
    time: '6h 45m',
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80',
    skills: ['Portfolio Building', 'Client Acquisition', 'Pricing & Growth']
  }
];

const bonusModules = [
  {
    id: 'b1',
    num: 'B1',
    title: 'AI for Designers',
    level: 'Bonus Module',
    track: 'bonus',
    lessons: '10 Lessons',
    time: '3h 15m',
    img: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=150&auto=format&fit=crop&q=80',
    skills: ['ChatGPT Prompts', 'Midjourney v6', 'Adobe Firefly', 'AI Automation']
  },
  {
    id: 'b2',
    num: 'B2',
    title: 'Creative Business Mastery',
    level: 'Bonus Module',
    track: 'bonus',
    lessons: '12 Lessons',
    time: '4h 45m',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&auto=format&fit=crop&q=80',
    skills: ['Personal Branding', 'Social Media Growth', 'Proposal & Pitching', 'Agency Building']
  },
  {
    id: 'b3',
    num: 'B3',
    title: 'Premium Resources',
    level: 'Bonus Toolkit',
    track: 'bonus',
    lessons: '15+ Packs',
    time: 'Lifetime',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=150&auto=format&fit=crop&q=80',
    skills: ['PSD Templates', 'Device Mockups', 'Custom ABR Brushes', 'Premium Fonts']
  }
];

function AnimatedCounter({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / (totalMiliseconds / incrementTime));
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function LandingPage() {
  const { user, modules, purchaseSubscription, login } = useApp();
  const router = useRouter();

  // Navigation / Modal States
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState<string | null>('m1');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<'monthly' | 'yearly' | 'lifetime' | null>(null);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [activeTrack, setActiveTrack] = useState<'all' | 'photoshop' | 'design' | 'bonus'>('all');

  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 40;
    const y = (clientY - window.innerHeight / 2) / 40;
    setHeroMouse({ x, y });
  };

  const getRowProgressWidth = (ids: string[]) => {
    const completedInRow = completedModules.filter(id => ids.includes(id));
    if (completedInRow.length <= 1) return '0%';
    if (completedInRow.length === 2) return '25%';
    if (completedInRow.length === 3) return '50%';
    return '75%';
  };

  // Auth Quick Modal
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleToggleComplete = (modId: string) => {
    setCompletedModules((prev) => {
      const exists = prev.includes(modId);
      if (!exists) {
        import('canvas-confetti').then((confetti) => {
          confetti.default({
            particleCount: 85,
            spread: 65,
            origin: { y: 0.8 }
          });
        });
        return [...prev, modId];
      } else {
        return prev.filter((id) => id !== modId);
      }
    });
  };

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(authEmail)) {
      setIsAuthOpen(false);
      router.push('/dashboard');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingCheckout(true);
    setTimeout(() => {
      setIsProcessingCheckout(false);
      setCheckoutSuccess(true);
      if (checkoutPlan) {
        purchaseSubscription(checkoutPlan);
      }
      setTimeout(() => {
        setCheckoutSuccess(false);
        setCheckoutPlan(null);
        router.push('/dashboard');
      }, 1500);
    }, 2000);
  };

  const FAQs = [
    {
      q: "Do I need any previous Photoshop experience?",
      a: "No! The curriculum is built from scratch. Module 1 covers interface basics and tools. We guide you step-by-step from zero to professional level."
    },
    {
      q: "Are the project files and resources downloadable?",
      a: "Yes. Every lesson comes with actual raw assets, PSD templates, custom brushes, and fonts that the instructor uses in the videos, allowing you to follow along exactly."
    },
    {
      q: "How does the Lifetime Access plan work?",
      a: "By choosing Lifetime Access, you pay once and get access forever. This includes all 8 core modules, all future module additions, masterclass updates, tips, and design shorts."
    },
    {
      q: "Can I upgrade my plan later?",
      a: "Absolutely. If you sign up for the Monthly Plan, you can upgrade to Yearly or Lifetime Access directly from your account page at any time."
    }
  ];

  return (
    <div className="relative min-h-screen bg-rich-black text-light-gray overflow-x-hidden selection:bg-ps-blue selection:text-white font-jakarta">
      {/* 1. Grid Mesh and Ambient Glow Spheres (Wow Factor Backgrounds) */}
      <div className="absolute inset-0 grid-mesh opacity-20 pointer-events-none z-0" />
      
      
      <motion.div 
        animate={{ 
          x: [0, -30, 50, 0], 
          y: [0, 40, -40, 0] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[800px] right-[5%] w-[600px] h-[600px] bg-purple-500/10 rounded-full filter blur-[150px] pointer-events-none z-0"
      />

      <motion.div 
        animate={{ 
          x: [0, 20, -40, 0], 
          y: [0, -30, 20, 0] 
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[200px] left-[5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full filter blur-[140px] pointer-events-none z-0"
      />

      {/* 2. Glassmorphic Navigation Header */}
      <nav className="sticky top-0 z-40 w-full glass-navbar">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 rounded-lg bg-ps-blue flex items-center justify-center font-bold text-white shadow-lg shadow-ps-blue/30">
              Ps
            </div>
            <span className="font-heading font-extrabold text-lg tracking-tight text-white">Mastery</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-gray-400">
            <a href="#why-learn" className="hover:text-white transition-colors">Why Us</a>
            <a href="#curriculum" className="hover:text-white transition-colors">Roadmap</a>
            <a href="#instructor" className="hover:text-white transition-colors">Experience</a>
            <a href="#pricing" className="hover:text-white transition-colors">Journey</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQs</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <button 
                onClick={() => router.push('/dashboard')}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-ps-blue hover:bg-ps-blue/90 rounded-full transition-all duration-200 ps-glow"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setIsAuthOpen(true)}
                  className="text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <a 
                  href="#pricing"
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-gray-200 rounded-full transition-all duration-200"
                >
                  Start Learning
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-card-border bg-rich-black px-6 py-4 flex flex-col gap-4 text-xs font-bold uppercase tracking-wider text-gray-300"
            >
              <a href="#why-learn" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white py-1">Why Us</a>
              <a href="#curriculum" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white py-1">Roadmap</a>
              <a href="#instructor" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white py-1">Experience</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white py-1">Journey</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white py-1">FAQs</a>
              <hr className="border-card-border" />
              {user ? (
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); router.push('/dashboard'); }}
                  className="w-full py-2.5 text-center text-white bg-ps-blue rounded-full shadow-lg"
                >
                  Dashboard
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); setIsAuthOpen(true); }}
                    className="w-full py-2 text-center text-gray-300 hover:text-white border border-card-border rounded-full"
                  >
                    Log In
                  </button>
                  <a 
                    href="#pricing"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center text-black bg-white rounded-full font-medium"
                  >
                    Start Learning
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 3. Hero Section (Redesigned with custom image background & parallax) */}
      <div 
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setHeroMouse({ x: 0, y: 0 })}
        className="relative border-b border-card-border/80 overflow-hidden min-h-[600px] flex items-center group/hero"
      >
        {/* Parallax Background Image */}
        <motion.div 
          animate={{ x: heroMouse.x, y: heroMouse.y }}
          transition={{ type: "spring", damping: 30, stiffness: 150 }}
          style={{ backgroundImage: "url('/hero-bg.png')" }}
          className="absolute inset-0 bg-cover bg-no-repeat bg-right pointer-events-none z-0 opacity-40 lg:opacity-100"
        />
        {/* Ambient Dark Overlay to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent pointer-events-none z-0" />
        
        <section className="relative max-w-7xl w-full mx-auto px-6 pt-8 pb-24 md:pt-10 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10">
          
          {/* Left Side Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ps-blue/25 bg-ps-blue/10 text-ps-blue text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={12} /> The Complete Photoshop Course
            </div>
            
            <h1 className="font-heading text-5xl md:text-[80px] font-bold text-white tracking-[-0.04em] leading-[0.95] uppercase">
              Master Photoshop <br className="hidden sm:inline" />
              Like a <span className="bg-gradient-to-r from-ps-blue via-cyan-400 to-purple-400 bg-clip-text text-transparent">Professional</span>
            </h1>
            
            <p className="text-base sm:text-[18px] leading-[1.8] text-gray-400 max-w-2xl mx-auto lg:mx-0 font-light">
              Learn Photoshop from beginner to advanced with real-world projects, premium lessons, downloadable resources, and expert guidance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                href="#pricing"
                className="w-full sm:w-auto px-8 py-4 bg-ps-blue hover:bg-ps-blue/90 text-black rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 text-center ps-glow flex items-center justify-center gap-2"
              >
                Start Learning <Zap size={16} />
              </a>
              <button 
                onClick={() => setIsPreviewOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-dark-gray hover:bg-gray-800 text-white border border-card-border rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play size={16} fill="white" /> Watch Preview
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80'
                ].map((src, i) => (
                  <img key={i} src={src} alt="Student" className="w-9 h-9 rounded-full border-2 border-rich-black object-cover" />
                ))}
              </div>
              <div className="text-xs text-gray-400 tracking-wide">
                <span className="font-bold text-white">10K+ Students</span> Enrolled & Designing Globally
              </div>
            </div>
          </motion.div>

          {/* Right Side Spacer (Allows the background image's 3D mockups to display cleanly & hosts floating Photoshop elements) */}
          <div className="lg:col-span-5 h-[280px] lg:h-auto pointer-events-none relative flex items-center justify-center min-h-[280px]">
            {/* Floating Photoshop Elements */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              {/* Element 1: Floating Ps Icon */}
              <motion.div 
                animate={{ y: [0, -20, 0], rotate: [12, 20, 12] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-16 h-16 rounded-2xl bg-gradient-to-tr from-ps-blue to-cyan-500/85 flex items-center justify-center font-heading font-black text-white text-3xl shadow-2xl border border-white/20 backdrop-blur-md opacity-85"
              >
                Ps
              </motion.div>
              {/* Element 2: Floating Layers Icon */}
              <motion.div 
                animate={{ y: [0, 20, 0], rotate: [-8, -12, -8] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 p-3.5 rounded-2xl bg-black/85 border border-card-border/80 flex items-center justify-center text-ps-blue shadow-2xl backdrop-blur-md opacity-80"
              >
                <Layers size={24} />
              </motion.div>
              {/* Element 3: Floating Sparkle / Star */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-1/3 right-1/3 text-purple-400"
              >
                <Sparkles size={20} />
              </motion.div>
              {/* Element 4: Floating Photoshop Sliders */}
              <motion.div 
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-1/3 left-1/3 p-3 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 shadow-2xl backdrop-blur-xs opacity-70"
              >
                <Sliders size={18} />
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* 4. Trust Section (Scroll reveals) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="bg-dark-gray border-y border-card-border/80 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Students Enrolled', count: '10,000+' },
            { label: 'Lessons Available', count: '250+' },
            { label: 'Projects Included', count: '50+' },
            { label: 'Course Rating', count: '4.9 ★' }
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight">{stat.count}</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 5. Why Learn With Us (Neon card hover shapes & staggered reveals) */}
      <motion.section 
        id="why-learn" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 py-40 text-center space-y-16 relative z-10"
      >
        <motion.div variants={fadeIn} className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl md:text-[56px] font-bold text-white tracking-tight leading-[1.1] uppercase">
            Why Learn <span className="bg-gradient-to-r from-ps-blue via-cyan-400 to-purple-400 bg-clip-text text-transparent">Photoshop</span> With Us?
          </h2>
          <p className="text-base sm:text-[18px] leading-[1.8] text-gray-400 font-light max-w-xl mx-auto">
            Everything you need to grow from a complete beginner to a highly paid, professional designer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 text-left">
          {/* Card 1: Real-World Portfolio Projects (Spans 4 columns) */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            onMouseMove={handleMouseMove}
            className="md:col-span-4 glass-card p-6 sm:p-8 rounded-3xl border border-card-border/80 flex flex-col lg:flex-row gap-8 items-stretch justify-between overflow-hidden relative group animate-reveal"
          >
            <div className="flex-1 flex flex-col justify-between space-y-6 z-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ps-blue/20 bg-ps-blue/5 text-ps-blue text-[10px] font-bold uppercase tracking-wider">
                  <Folder size={12} /> Live Projects
                </div>
                <h3 className="font-heading text-xl sm:text-[24px] font-semibold text-white uppercase tracking-tight">
                  Real-World Portfolio Projects
                </h3>
                <p className="text-sm sm:text-[18px] leading-[1.8] text-gray-400 font-light max-w-md">
                  Skip the boring theory. Build actual, high-end YouTube thumbnails, cinematic movie posters, product labels, and UI mockups that will impress clients and land jobs.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Movie Posters', 'AI Composites', 'Brand Assets', 'UI Design'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Photoshop UI Mockup Graphic */}
            <div className="flex-1 min-h-[220px] bg-rich-black/85 border border-card-border/60 rounded-2xl overflow-hidden flex flex-col relative shadow-2xl">
              {/* Workspace Top Header Bar */}
              <div className="h-8 border-b border-card-border/60 bg-dark-gray/50 px-3 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/60" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <span className="w-2 h-2 rounded-full bg-green-500/60" />
                  <span className="ml-1 text-gray-400">composite_final.psd @ 66.7%</span>
                </div>
                <Maximize2 size={10} />
              </div>
              
              <div className="flex-1 grid grid-cols-12">
                {/* Simulated Canvas (Left 8 Columns) */}
                <div className="col-span-8 bg-zinc-900/60 relative flex items-center justify-center p-4 overflow-hidden border-r border-card-border/40">
                  <div className="absolute inset-0 grid-mesh opacity-20 pointer-events-none" />
                  
                  {/* Canvas Composite Content */}
                  <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-tr from-purple-900/30 to-ps-blue/30 border border-ps-blue/25 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-500">
                    <Sparkles className="text-ps-blue/60 animate-pulse" size={24} />
                    
                    {/* SVG Vector Path Overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {/* Dotted marquee selection line */}
                      <rect 
                        x="8" y="8" width="96" height="96" rx="12" 
                        fill="none" 
                        stroke="#00c3ff" 
                        strokeWidth="1.5" 
                        className="selection-marquee"
                      />
                      {/* Vector Pen Path */}
                      <path 
                        d="M 20,80 C 30,25 80,25 90,80" 
                        fill="none" 
                        stroke="#8b5cf6" 
                        strokeWidth="1.5" 
                      />
                      {/* Interactive Anchor Points */}
                      <circle cx="20" cy="80" r="2.5" fill="#fff" stroke="#8b5cf6" strokeWidth="1.5" />
                      <circle cx="90" cy="80" r="2.5" fill="#fff" stroke="#8b5cf6" strokeWidth="1.5" />
                      <circle cx="55" cy="40" r="2.5" fill="#00c3ff" stroke="#fff" strokeWidth="1.5" />
                      <line x1="55" y1="40" x2="35" y2="35" stroke="#00c3ff" strokeWidth="1" />
                      <circle cx="35" cy="35" r="1.5" fill="#00c3ff" />
                    </svg>
                  </div>
                  
                  {/* Floating Tool Bar Icon */}
                  <div className="absolute left-2 top-2 p-1.5 bg-dark-gray/90 border border-card-border/80 rounded-md shadow-lg text-ps-blue">
                    <MousePointer size={12} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Layers Panel (Right 4 Columns) */}
                <div className="col-span-4 bg-dark-gray/30 p-2 flex flex-col gap-1.5 text-[9px] font-medium text-gray-400 select-none">
                  <div className="border-b border-card-border/60 pb-1 flex justify-between items-center text-gray-500 uppercase tracking-wider text-[8px] font-bold">
                    <span>Layers</span>
                    <Sliders size={8} />
                  </div>
                  <div className="flex justify-between items-center bg-zinc-900/60 border border-card-border/40 px-1.5 py-0.5 rounded text-[7px] text-gray-500">
                    <span>Normal</span>
                    <span>Opacity: 85%</span>
                  </div>
                  
                  {/* Layers Stack */}
                  <div className="space-y-1 mt-1">
                    {[
                      { name: 'FX Adjustments', active: true, color: 'text-purple-400' },
                      { name: 'Subject Cutout', active: true, color: 'text-ps-blue' },
                      { name: 'Neon Glows', active: false, color: 'text-gray-500' },
                      { name: 'Background', active: false, color: 'text-gray-600' }
                    ].map((layer, idx) => (
                      <div 
                        key={idx} 
                        className={`p-1 rounded flex items-center justify-between transition-all duration-300 ${
                          layer.active 
                            ? 'bg-ps-blue/5 border border-ps-blue/15 text-white group-hover:bg-ps-blue/10' 
                            : 'bg-transparent border border-transparent hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Layers size={8} className={layer.color} />
                          <span className="truncate max-w-[50px]">{layer.name}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-green-500/80" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Zero to Pro Path (Spans 2 columns) */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            onMouseMove={handleMouseMove}
            className="md:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-card-border/80 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                <BookOpen size={12} /> Learning Path
              </div>
              <h3 className="font-heading text-xl sm:text-[24px] font-semibold text-white uppercase tracking-tight">
                Zero to Pro Roadmap
              </h3>
              <p className="text-sm sm:text-[18px] leading-[1.8] text-gray-400 font-light">
                A structured milestones roadmap leading from your very first document to expert compositing layouts.
              </p>
            </div>

            {/* Visual Roadmap Trail */}
            <div className="mt-8 relative pl-4 border-l border-dashed border-card-border/60 space-y-4 py-1">
              {/* Animating Neon Tracer Dot */}
              <div className="absolute left-[-4px] top-0 w-2.5 h-2.5 rounded-full bg-ps-blue shadow-lg shadow-ps-blue group-hover:top-[90%] transition-all duration-1000 ease-in-out" />
              
              {[
                { title: '01 Workspace & Setup', desc: 'Interface navigation' },
                { title: '02 Selections & Masks', desc: 'Isolating complex subjects' },
                { title: '03 Retouching & FX', desc: 'Skin & color correction' },
                { title: '04 Compositing & Output', desc: 'Dynamic commercial ads' }
              ].map((step, idx) => (
                <div key={idx} className="relative group/step">
                  <div className="absolute -left-[20px] top-1.5 w-2 h-2 rounded-full border border-card-border bg-rich-black group-hover/step:border-ps-blue group-hover/step:bg-ps-blue transition-colors duration-300" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors duration-300">{step.title}</h4>
                    <p className="text-[10px] text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Non-Destructive Controls (Spans 2 columns) */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            onMouseMove={handleMouseMove}
            className="md:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-card-border/80 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                <Layers size={12} /> Non-Destructive
              </div>
              <h3 className="font-heading text-xl sm:text-[24px] font-semibold text-white uppercase tracking-tight">
                Non-Destructive Workflow
              </h3>
              <p className="text-sm sm:text-[18px] leading-[1.8] text-gray-400 font-light">
                Learn to utilize smart objects, adjustment filters, and vector paths so you can undo, redo, and adjust changes anytime.
              </p>
            </div>

            {/* 3D Stacking Layer Visual */}
            <div className="mt-8 min-h-[140px] relative flex items-center justify-center scale-90 sm:scale-100">
              <div className="absolute inset-0 flex flex-col items-center justify-center [perspective:800px]">
                
                {/* Smart Filter Layer (Top) */}
                <div className="w-40 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-between px-3 text-[10px] shadow-lg shadow-emerald-500/5 transition-all duration-500 ease-out [transform:rotateX(55deg)_rotateZ(-25deg)_translateZ(30px)] group-hover:[translateZ(60px)] group-hover:bg-emerald-500/30">
                  <span className="font-mono">Smart Filter</span>
                  <CheckCircle2 size={12} />
                </div>
                
                {/* Mask Overlay Layer (Middle) */}
                <div className="w-40 h-10 rounded-lg bg-ps-blue/15 border border-ps-blue/40 text-ps-blue font-bold flex items-center justify-between px-3 text-[10px] shadow-lg shadow-ps-blue/5 transition-all duration-500 ease-out [transform:rotateX(55deg)_rotateZ(-25deg)_translateZ(0px)] group-hover:[translateZ(20px)] group-hover:bg-ps-blue/25 -mt-6">
                  <span className="font-mono">Adjustment Mask</span>
                  <Sparkles size={12} />
                </div>

                {/* Base Asset Layer (Bottom) */}
                <div className="w-40 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold flex items-center justify-between px-3 text-[10px] transition-all duration-500 ease-out [transform:rotateX(55deg)_rotateZ(-25deg)_translateZ(-30px)] group-hover:[translateZ(-20px)] -mt-6">
                  <span className="font-mono">Original Asset</span>
                  <Lock size={12} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Premium Resources Library (Spans 2 columns) */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            onMouseMove={handleMouseMove}
            className="md:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-card-border/80 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles size={12} /> Design Toolkit
              </div>
              <h3 className="font-heading text-xl sm:text-[24px] font-semibold text-white uppercase tracking-tight">
                Premium Resources
              </h3>
              <p className="text-sm sm:text-[18px] leading-[1.8] text-gray-400 font-light">
                Download all raw image files, PSD overlays, custom-designed brushes, templates, and reference guides.
              </p>
            </div>

            {/* Visual File Download Stack */}
            <div className="mt-8 flex flex-col gap-3">
              <div className="relative h-14 bg-zinc-900/40 border border-card-border/60 rounded-xl p-3 flex items-center justify-between overflow-hidden">
                {/* Hover progress fill */}
                <div className="absolute inset-y-0 left-0 bg-amber-500/5 w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                <div className="flex items-center gap-2.5 z-10">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold font-mono">
                    PSD
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-white uppercase">Project_Assets.zip</h4>
                    <p className="text-[8px] text-gray-500">1.8 GB • PSD Templates</p>
                  </div>
                </div>
                {/* Download rate tracker */}
                <div className="text-right z-10">
                  <span className="text-[9px] font-bold text-amber-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">12.4 MB/s</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center ml-auto mt-0.5">
                    <Check size={8} className="text-amber-400" />
                  </div>
                </div>
              </div>

              <div className="relative h-14 bg-zinc-900/40 border border-card-border/60 rounded-xl p-3 flex items-center justify-between overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-ps-blue/5 w-0 group-hover:w-full transition-all duration-1000 ease-out delay-200" />
                <div className="flex items-center gap-2.5 z-10">
                  <div className="w-8 h-8 rounded-lg bg-ps-blue/10 border border-ps-blue/20 flex items-center justify-center text-ps-blue text-xs font-bold font-mono">
                    ABR
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-white uppercase">Brushes_2026.abr</h4>
                    <p className="text-[8px] text-gray-500">145 MB • Retouch Brushes</p>
                  </div>
                </div>
                <div className="text-right z-10">
                  <span className="text-[9px] font-bold text-ps-blue font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">Completed</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-ps-blue/20 border border-ps-blue/40 flex items-center justify-center ml-auto mt-0.5">
                    <Check size={8} className="text-ps-blue" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Continuous AI Updates (Spans 2 columns) */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            onMouseMove={handleMouseMove}
            className="md:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-card-border/80 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                <Zap size={12} /> AI & Updates
              </div>
              <h3 className="font-heading text-xl sm:text-[24px] font-semibold text-white uppercase tracking-tight">
                AI & Lifetime Updates
              </h3>
              <p className="text-sm sm:text-[18px] leading-[1.8] text-gray-400 font-light">
                Stay ahead of the curve. Get free masterclass lessons on Photoshop generative AI features, neural filters, and monthly software updates.
              </p>
            </div>

            {/* Feed Scroll visual */}
            <div className="mt-8 space-y-2 relative">
              <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-rich-black/20 to-transparent pointer-events-none z-10" />
              {[
                { version: 'v27.2', title: 'Generative Fill Pro', tag: 'AI Update' },
                { version: 'v27.0', title: 'Neural Skin Filters', tag: 'Retouch' },
                { version: 'v26.5', title: 'Lasso Subject Masking', tag: 'Selection' }
              ].map((update, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-zinc-900/50 border border-card-border/40 flex items-center justify-between text-[10px] group-hover:translate-x-1.5 transition-transform duration-300" style={{ transitionDelay: `${idx * 75}ms` }}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-900/40 px-1.5 py-0.5 rounded text-[8px]">
                      {update.version}
                    </span>
                    <span className="font-bold text-gray-200">{update.title}</span>
                  </div>
                  <span className="text-[8px] font-bold uppercase text-gray-500 tracking-wide">{update.tag}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 6. Learning Journey Curriculum Section (Redesigned matching mockup) */}
      <motion.section 
        id="curriculum" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="bg-rich-black border-y border-card-border/80 relative z-10 py-40 overflow-hidden"
      >
        {/* Animated Ambient Light Glows */}
        <motion.div 
          animate={{ 
            x: [0, 50, -30, 0], 
            y: [0, -40, 50, 0],
            scale: [1, 1.2, 0.95, 1] 
          }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-ps-blue/8 to-cyan-500/3 rounded-full filter blur-[180px] pointer-events-none z-0"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 40, 0], 
            y: [0, 50, -40, 0],
            scale: [1, 0.95, 1.15, 1] 
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/8 to-indigo-500/3 rounded-full filter blur-[180px] pointer-events-none z-0"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
          
          {/* Section Header with Floating Artworks */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative text-center max-w-4xl mx-auto space-y-6"
          >
            {/* Central Glowing Pulsing Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-ps-blue/15 via-cyan-400/8 to-purple-500/15 rounded-full filter blur-[120px] pointer-events-none -z-10 animate-pulse" />

            {/* Drifting light sparks */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden max-h-[400px] -z-10">
              {[...Array(8)].map((_, i) => {
                const startX = (i * 75) - 300; // Fixed distribution across -300px to 300px
                const endX = startX + (i % 2 === 0 ? 50 : -50);
                const duration = 6 + (i % 3) * 1.5;
                const delay = i * 0.8;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.1, y: 280, x: startX }}
                    animate={{ 
                      opacity: [0.1, 0.6, 0], 
                      y: [-40, -140], 
                      x: [startX, endX] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: duration, 
                      ease: "easeInOut",
                      delay: delay 
                    }}
                    className="absolute left-1/2 w-1 h-1 rounded-full bg-ps-blue filter blur-[0.5px] shadow-[0_0_8px_#00c8ff]"
                  />
                );
              })}
            </div>
            
            {/* Pill Badge */}
            <motion.div 
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ps-blue/25 bg-ps-blue/10 text-ps-blue text-[10px] font-bold uppercase tracking-widest"
            >
              <Compass size={12} className="animate-spin-slow" /> Your Roadmap to Professional Design
            </motion.div>

            {/* Headline */}
            <motion.h2 
              variants={textFadeUp}
              className="font-heading text-4xl md:text-[56px] font-bold text-white tracking-tight leading-[1.1] uppercase"
            >
              Master <span className="bg-gradient-to-r from-ps-blue via-cyan-400 to-purple-400 bg-clip-text text-transparent">Photoshop & <br /> Graphic Design</span> Like a Professional
            </motion.h2>

            {/* Subheading */}
            <motion.p 
              variants={fadeIn}
              className="text-base sm:text-[18px] leading-[1.8] text-gray-400 font-light max-w-3xl mx-auto"
            >
              A carefully crafted learning journey designed to transform beginners into confident, job-ready designers through real-world projects, industry workflows, and professional creative systems.
            </motion.p>

            {/* Supporting Text Badges */}
            <motion.div 
              variants={fadeIn}
              className="pt-2 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-[10px] font-bold uppercase tracking-wider text-gray-400"
            >
              <span>300+ Premium Lessons</span>
              <span className="w-1 h-1 rounded-full bg-card-border" />
              <span>50+ Real Projects</span>
              <span className="w-1 h-1 rounded-full bg-card-border" />
              <span>12+ Modules</span>
              <span className="w-1 h-1 rounded-full bg-card-border" />
              <span>Lifetime Access</span>
              <span className="w-1 h-1 rounded-full bg-card-border" />
              <span>Certificate Included</span>
            </motion.div>

            {/* Cinematic Section Banner Image */}
            <motion.div 
              variants={fadeIn}
              className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-card-border/80 bg-[#050507] shadow-[0_0_50px_rgba(0,200,255,0.05)] z-10 group mt-8"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 z-10 pointer-events-none" />
              <img 
                src="/roadmap-showcase.jpg" 
                alt="Roadmap Showcase" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              />
            </motion.div>

            {/* Left Side: Creative Pen Tool Vector Drawer (Hidden on mobile/tablet) */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="hidden xl:block absolute left-[-160px] top-1/4 w-64 h-64 pointer-events-none opacity-50 z-0"
            >
              <svg className="w-full h-full text-ps-blue/40" viewBox="0 0 200 200" fill="none">
                {/* Bezier Vector Curve */}
                <motion.path 
                  d="M20 150 C 50 60, 130 40, 180 120" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  strokeDasharray="300"
                  animate={{ strokeDashoffset: [300, 0, 300] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                />
                {/* Control handles and nodes */}
                <circle cx="20" cy="150" r="4.5" fill="#00c8ff" className="shadow-lg" />
                <circle cx="180" cy="120" r="4.5" fill="#00c8ff" className="shadow-lg" />
                {/* Floating Pen Cursor Tip */}
                <motion.g
                  animate={{ 
                    x: [0, 160, 0], 
                    y: [0, -30, 0] 
                  }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                >
                  <path d="M20 150 L27 135 L38 146 Z" fill="#fff" stroke="#00c8ff" strokeWidth="1.5" />
                  <path d="M27 135 L40 115 L50 125 L38 146 Z" fill="#00c8ff" />
                </motion.g>
              </svg>
            </motion.div>

            {/* Right Side: Creative Adjustment Layers Split-Cards (Hidden on mobile/tablet) */}
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
              className="hidden xl:block absolute right-[-160px] top-1/4 w-64 h-64 pointer-events-none opacity-50 z-0 [perspective:1000px]"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Adjustment Card 1: Curves panel mockup */}
                <motion.div 
                  animate={{ rotateY: -22, rotateX: 18, z: 20 }}
                  className="absolute w-28 h-40 bg-[#090b11]/90 border border-[#00c8ff]/30 rounded-xl p-3 shadow-2xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-card-border pb-1 text-gray-400">
                    <span className="font-heading font-black text-[6px] tracking-wider uppercase">CURVES</span>
                    <Sliders size={8} className="text-ps-blue" />
                  </div>
                  <div className="h-14 w-full border border-[#00c8ff]/10 rounded bg-black/50 relative flex items-center justify-center overflow-hidden my-2">
                    <svg className="w-full h-full text-ps-blue/40" viewBox="0 0 100 50" fill="none">
                      <path d="M0 50 Q 25 45, 50 25 T 100 0" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="text-right font-mono text-[5px] text-ps-blue tracking-widest">RGB</div>
                </motion.div>

                {/* Adjustment Card 2: Layers card offset backdrop */}
                <motion.div 
                  animate={{ rotateY: -22, rotateX: 18, z: -10, x: 25, y: 15 }}
                  className="absolute w-28 h-40 bg-[#090b11]/70 border border-purple-500/20 rounded-xl p-3 shadow-xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-card-border pb-1 text-gray-500">
                    <span className="font-heading font-black text-[6px] tracking-wider uppercase">LAYERS</span>
                    <Layers size={8} className="text-purple-400" />
                  </div>
                  <div className="space-y-1.5 my-3 flex-1 flex flex-col justify-center">
                    <div className="h-1.5 w-full bg-zinc-800/40 rounded-sm" />
                    <div className="h-1.5 w-[75%] bg-purple-500/20 rounded-sm" />
                  </div>
                  <div className="text-right font-mono text-[5px] text-purple-400 tracking-widest">NORMAL</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Roadmap Board */}
          <div className="bg-[#050507] border border-card-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute inset-0 grid-mesh opacity-10 pointer-events-none rounded-3xl" />
            
            {/* Roadmap Board Header (Tabs + Progress) */}
            <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-6 border-b border-card-border/60 pb-6 mb-8">
              <div className="text-center xl:text-left space-y-1">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                  Your Complete Roadmap to Success
                </h3>
                <p className="text-[11px] text-gray-500 font-light">
                  Follow the path from beginner to professional. Click cards to track and complete your journey.
                </p>
              </div>

              {/* Navigation Filters */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-dark-gray/60 border border-card-border/40 rounded-xl">
                {[
                  { id: 'all', label: 'All Modules' },
                  { id: 'photoshop', label: 'Photoshop Track' },
                  { id: 'design', label: 'Graphic Design Track' },
                  { id: 'bonus', label: 'Bonus Modules' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTrack(tab.id as any)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      activeTrack === tab.id
                        ? 'bg-ps-blue text-black shadow-lg shadow-ps-blue/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Circular Progress Indicator */}
              <div className="flex items-center gap-3 bg-dark-gray/40 border border-card-border/40 px-4 py-2 rounded-2xl select-none">
                <div className="text-right space-y-0.5">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-heading">Track Your Progress</h4>
                  <p className="text-[9px] text-gray-500 font-light">{completedModules.length} of 12 completed</p>
                </div>
                {/* SVG Progress Circle */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="20" cy="20" r="16" fill="transparent" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="3.5" />
                    <circle 
                      cx="20" cy="20" r="16" fill="transparent" 
                      stroke="#31a8ff" strokeWidth="3.5"
                      strokeDasharray={100}
                      strokeDashoffset={100 - (completedModules.length / 12) * 100}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <span className="absolute text-[8px] font-black text-white font-mono">{Math.round((completedModules.length / 12) * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Modules Grid */}
            {activeTrack === 'all' ? (
              <div className="space-y-12 relative">
                {/* Row 1: Modules 1 to 4 */}
                <div className="relative pt-8">
                  {/* Horizontal dotted connector line */}
                  <div className="absolute top-[32px] left-[12.5%] right-[12.5%] h-[2px] bg-card-border/40 pointer-events-none hidden lg:block z-0" />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: getRowProgressWidth(learningModules.slice(0, 4).map(m => m.id)) }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute top-[32px] left-[12.5%] h-[2px] bg-gradient-to-r from-ps-blue to-cyan-400 pointer-events-none hidden lg:block z-0 shadow-[0_0_8px_rgba(0,200,255,0.5)]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {learningModules.slice(0, 4).map((mod) => (
                      <div key={mod.id} className="relative group">
                        {/* Node circle on the path */}
                        <div 
                          onClick={() => handleToggleComplete(mod.id)}
                          className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-[#050507] z-20 cursor-pointer group-hover:scale-125 transition-transform duration-300 ${
                            completedModules.includes(mod.id)
                              ? 'bg-ps-blue border-ps-blue shadow-[0_0_10px_rgba(49,168,255,0.8)]'
                              : 'bg-zinc-800 border-zinc-700'
                          }`}
                        />
                        
                        {/* Card layout */}
                        <div 
                          onClick={() => handleToggleComplete(mod.id)}
                          onMouseMove={handleMouseMove}
                          className={`glass-card p-5 rounded-2xl border flex flex-col justify-between gap-5 select-none cursor-pointer group/card transition-all duration-300 h-full ${
                            completedModules.includes(mod.id)
                              ? 'border-ps-blue/40 bg-ps-blue/5 shadow-[0_0_20px_rgba(49,168,255,0.05)]'
                              : 'border-card-border/60 hover:border-ps-blue/25'
                          }`}
                        >
                          <div className="space-y-4">
                            {/* Card Header (Num + Badge) */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold text-ps-blue bg-ps-blue/10 px-2 py-0.5 rounded-md">
                                {mod.num}
                              </span>
                              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                                mod.level === 'Beginner Friendly' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                mod.level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                mod.level === 'Advanced' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                              }`}>
                                {mod.level}
                              </span>
                            </div>

                            {/* Body (Title + Bullets + Preview Visual) */}
                            <div className="flex gap-3 items-start justify-between min-h-[120px]">
                              <div className="space-y-2 flex-1">
                                <h4 className="font-heading text-lg sm:text-[24px] font-semibold text-white group-hover/card:text-ps-blue transition-colors duration-300 uppercase tracking-tight leading-snug">
                                  {mod.title}
                                </h4>
                                <ul className="space-y-1 text-[10px] text-gray-500 font-light">
                                  {mod.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-ps-blue/40" />
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Card Visual Preview Box */}
                              {mod.id === '01' ? (
                                <div className="w-14 h-14 rounded-xl bg-ps-blue flex items-center justify-center font-bold text-white text-lg shadow-md shadow-ps-blue/20 shrink-0">
                                  Ps
                                </div>
                              ) : mod.id === '07' ? (
                                <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-card-border flex items-center justify-center font-heading font-black text-white text-sm shrink-0">
                                  Ag
                                </div>
                              ) : mod.id === '09' ? (
                                <div className="w-14 h-14 rounded-xl bg-black border border-card-border flex items-center justify-center font-bold text-white shrink-0">
                                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4 12c4 0 6 3 12-8" strokeLinecap="round" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-14 h-14 rounded-xl border border-card-border/60 overflow-hidden shrink-0 shadow-md relative">
                                  <img src={mod.img} alt={mod.title} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                                  {completedModules.includes(mod.id) && (
                                    <div className="absolute inset-0 bg-ps-blue/15 flex items-center justify-center backdrop-blur-[0.5px]">
                                      <Check size={12} className="text-ps-blue stroke-[3]" />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Footer details */}
                          <div className="border-t border-card-border/60 pt-3 flex items-center justify-between text-[10px] text-gray-500 font-mono font-medium">
                            <span>{mod.lessons}</span>
                            <span>{mod.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2: Modules 5 to 8 */}
                <div className="relative pt-8">
                  {/* Horizontal dotted connector line */}
                  <div className="absolute top-[32px] left-[12.5%] right-[12.5%] h-[2px] bg-card-border/40 pointer-events-none hidden lg:block z-0" />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: getRowProgressWidth(learningModules.slice(4, 8).map(m => m.id)) }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute top-[32px] left-[12.5%] h-[2px] bg-gradient-to-r from-ps-blue to-cyan-400 pointer-events-none hidden lg:block z-0 shadow-[0_0_8px_rgba(0,200,255,0.5)]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {learningModules.slice(4, 8).map((mod) => (
                      <div key={mod.id} className="relative group">
                        {/* Node circle on the path */}
                        <div 
                          onClick={() => handleToggleComplete(mod.id)}
                          className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-[#050507] z-20 cursor-pointer group-hover:scale-125 transition-transform duration-300 ${
                            completedModules.includes(mod.id)
                              ? 'bg-ps-blue border-ps-blue shadow-[0_0_10px_rgba(49,168,255,0.8)]'
                              : 'bg-zinc-800 border-zinc-700'
                          }`}
                        />
                        
                        {/* Card layout */}
                        <div 
                          onClick={() => handleToggleComplete(mod.id)}
                          onMouseMove={handleMouseMove}
                          className={`glass-card p-5 rounded-2xl border flex flex-col justify-between gap-5 select-none cursor-pointer group/card transition-all duration-300 h-full ${
                            completedModules.includes(mod.id)
                              ? 'border-ps-blue/40 bg-ps-blue/5 shadow-[0_0_20px_rgba(49,168,255,0.05)]'
                              : 'border-card-border/60 hover:border-ps-blue/25'
                          }`}
                        >
                          <div className="space-y-4">
                            {/* Card Header (Num + Badge) */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold text-ps-blue bg-ps-blue/10 px-2 py-0.5 rounded-md">
                                {mod.num}
                              </span>
                              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                                mod.level === 'Beginner Friendly' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                mod.level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                mod.level === 'Advanced' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                              }`}>
                                {mod.level}
                              </span>
                            </div>

                            {/* Body (Title + Bullets + Preview Visual) */}
                            <div className="flex gap-3 items-start justify-between min-h-[120px]">
                              <div className="space-y-2 flex-1">
                                <h4 className="font-heading text-lg sm:text-[24px] font-semibold text-white group-hover/card:text-ps-blue transition-colors duration-300 uppercase tracking-tight leading-snug">
                                  {mod.title}
                                </h4>
                                <ul className="space-y-1 text-[10px] text-gray-500 font-light">
                                  {mod.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-ps-blue/40" />
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Card Visual Preview Box */}
                              {mod.id === '01' ? (
                                <div className="w-14 h-14 rounded-xl bg-ps-blue flex items-center justify-center font-bold text-white text-lg shadow-md shadow-ps-blue/20 shrink-0">
                                  Ps
                                </div>
                              ) : mod.id === '07' ? (
                                <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-card-border flex items-center justify-center font-heading font-black text-white text-sm shrink-0">
                                  Ag
                                </div>
                              ) : mod.id === '09' ? (
                                <div className="w-14 h-14 rounded-xl bg-black border border-card-border flex items-center justify-center font-bold text-white shrink-0">
                                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4 12c4 0 6 3 12-8" strokeLinecap="round" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-14 h-14 rounded-xl border border-card-border/60 overflow-hidden shrink-0 shadow-md relative">
                                  <img src={mod.img} alt={mod.title} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                                  {completedModules.includes(mod.id) && (
                                    <div className="absolute inset-0 bg-ps-blue/15 flex items-center justify-center backdrop-blur-[0.5px]">
                                      <Check size={12} className="text-ps-blue stroke-[3]" />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Footer details */}
                          <div className="border-t border-card-border/60 pt-3 flex items-center justify-between text-[10px] text-gray-500 font-mono font-medium">
                            <span>{mod.lessons}</span>
                            <span>{mod.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 3: Modules 9 to 12 */}
                <div className="relative pt-8">
                  {/* Horizontal dotted connector line */}
                  <div className="absolute top-[32px] left-[12.5%] right-[12.5%] h-[2px] bg-card-border/40 pointer-events-none hidden lg:block z-0" />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: getRowProgressWidth(learningModules.slice(8, 12).map(m => m.id)) }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute top-[32px] left-[12.5%] h-[2px] bg-gradient-to-r from-ps-blue to-cyan-400 pointer-events-none hidden lg:block z-0 shadow-[0_0_8px_rgba(0,200,255,0.5)]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {learningModules.slice(8, 12).map((mod) => (
                      <div key={mod.id} className="relative group">
                        {/* Node circle on the path */}
                        <div 
                          onClick={() => handleToggleComplete(mod.id)}
                          className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-[#050507] z-20 cursor-pointer group-hover:scale-125 transition-transform duration-300 ${
                            completedModules.includes(mod.id)
                              ? 'bg-ps-blue border-ps-blue shadow-[0_0_10px_rgba(49,168,255,0.8)]'
                              : 'bg-zinc-800 border-zinc-700'
                          }`}
                        />
                        
                        {/* Card layout */}
                        <div 
                          onClick={() => handleToggleComplete(mod.id)}
                          onMouseMove={handleMouseMove}
                          className={`glass-card p-5 rounded-2xl border flex flex-col justify-between gap-5 select-none cursor-pointer group/card transition-all duration-300 h-full ${
                            completedModules.includes(mod.id)
                              ? 'border-ps-blue/40 bg-ps-blue/5 shadow-[0_0_20px_rgba(49,168,255,0.05)]'
                              : 'border-card-border/60 hover:border-ps-blue/25'
                          }`}
                        >
                          <div className="space-y-4">
                            {/* Card Header (Num + Badge) */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold text-ps-blue bg-ps-blue/10 px-2 py-0.5 rounded-md">
                                {mod.num}
                              </span>
                              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                                mod.level === 'Beginner Friendly' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                mod.level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                mod.level === 'Advanced' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                              }`}>
                                {mod.level}
                              </span>
                            </div>

                            {/* Body (Title + Bullets + Preview Visual) */}
                            <div className="flex gap-3 items-start justify-between min-h-[120px]">
                              <div className="space-y-2 flex-1">
                                <h4 className="font-heading text-lg sm:text-[24px] font-semibold text-white group-hover/card:text-ps-blue transition-colors duration-300 uppercase tracking-tight leading-snug">
                                  {mod.title}
                                </h4>
                                <ul className="space-y-1 text-[10px] text-gray-500 font-light">
                                  {mod.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-ps-blue/40" />
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Card Visual Preview Box */}
                              {mod.id === '01' ? (
                                <div className="w-14 h-14 rounded-xl bg-ps-blue flex items-center justify-center font-bold text-white text-lg shadow-md shadow-ps-blue/20 shrink-0">
                                  Ps
                                </div>
                              ) : mod.id === '07' ? (
                                <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-card-border flex items-center justify-center font-heading font-black text-white text-sm shrink-0">
                                  Ag
                                </div>
                              ) : mod.id === '09' ? (
                                <div className="w-14 h-14 rounded-xl bg-black border border-card-border flex items-center justify-center font-bold text-white shrink-0">
                                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4 12c4 0 6 3 12-8" strokeLinecap="round" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-14 h-14 rounded-xl border border-card-border/60 overflow-hidden shrink-0 shadow-md relative">
                                  <img src={mod.img} alt={mod.title} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                                  {completedModules.includes(mod.id) && (
                                    <div className="absolute inset-0 bg-ps-blue/15 flex items-center justify-center backdrop-blur-[0.5px]">
                                      <Check size={12} className="text-ps-blue stroke-[3]" />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Footer details */}
                          <div className="border-t border-card-border/60 pt-3 flex items-center justify-between text-[10px] text-gray-500 font-mono font-medium">
                            <span>{mod.lessons}</span>
                            <span>{mod.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : activeTrack === 'bonus' ? (
              /* Bonus Track (3 items) */
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 max-w-5xl mx-auto">
                {bonusModules.map((mod) => (
                  <div 
                    key={mod.id}
                    onMouseMove={handleMouseMove}
                    className="glass-card p-6 rounded-3xl border border-card-border/80 flex flex-col justify-between gap-5 select-none transition-all duration-300 min-h-[180px] hover:border-purple-500/25 bg-purple-500/5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/40 border border-purple-900/40 px-2 py-0.5 rounded-md">
                          {mod.num}
                        </span>
                        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {mod.level}
                        </span>
                      </div>

                      <div className="flex gap-4 items-start justify-between">
                        <div className="space-y-1.5 flex-1">
                          <h4 className="font-heading text-lg sm:text-[24px] font-semibold text-white uppercase tracking-tight leading-snug">
                            {mod.title}
                          </h4>
                          <ul className="space-y-0.5 text-[10px] text-gray-500 font-light">
                            {mod.skills.map((skill, sIdx) => (
                              <li key={sIdx} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400/40" />
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="w-14 h-14 rounded-xl border border-purple-500/20 overflow-hidden shrink-0 shadow-lg">
                          <img src={mod.img} alt={mod.title} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-card-border/60 pt-3 flex items-center justify-between text-[9px] text-gray-500 font-mono font-medium">
                      <span>{mod.lessons}</span>
                      <span>{mod.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Photoshop or Design Tracks (5 or 6 items in a grid) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {learningModules.filter(m => m.track === activeTrack).map((mod) => (
                  <div 
                    key={mod.id}
                    onClick={() => handleToggleComplete(mod.id)}
                    onMouseMove={handleMouseMove}
                    className={`glass-card p-5 rounded-2xl border flex flex-col justify-between gap-5 select-none cursor-pointer group/card transition-all duration-300 ${
                      completedModules.includes(mod.id)
                        ? 'border-ps-blue/40 bg-ps-blue/5 shadow-[0_0_20px_rgba(49,168,255,0.05)] animate-glow'
                        : 'border-card-border/60 hover:border-ps-blue/25'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-ps-blue bg-ps-blue/10 px-2 py-0.5 rounded-md">
                          {mod.num}
                        </span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                          mod.level === 'Beginner Friendly' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          mod.level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                          mod.level === 'Advanced' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}>
                          {mod.level}
                        </span>
                      </div>

                      <div className="flex gap-3 items-start justify-between min-h-[120px]">
                        <div className="space-y-1.5 flex-1">
                          <h4 className="font-heading text-lg sm:text-[24px] font-semibold text-white group-hover/card:text-ps-blue transition-colors duration-300 uppercase tracking-tight leading-snug">
                            {mod.title}
                          </h4>
                          <ul className="space-y-0.5 text-[10px] text-gray-500 font-light">
                            {mod.skills.map((skill, sIdx) => (
                              <li key={sIdx} className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-ps-blue/40" />
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {mod.id === '01' ? (
                          <div className="w-14 h-14 rounded-xl bg-ps-blue flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-ps-blue/20 shrink-0">
                            Ps
                          </div>
                        ) : mod.id === '07' ? (
                          <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-card-border flex items-center justify-center font-heading font-black text-white text-sm shrink-0">
                            Ag
                          </div>
                        ) : mod.id === '09' ? (
                          <div className="w-14 h-14 rounded-xl bg-black border border-card-border flex items-center justify-center font-bold text-white shrink-0">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M4 12c4 0 6 3 12-8" strokeLinecap="round" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl border border-card-border/60 overflow-hidden shrink-0 shadow-lg relative">
                            <img src={mod.img} alt={mod.title} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                            {completedModules.includes(mod.id) && (
                              <div className="absolute inset-0 bg-ps-blue/15 flex items-center justify-center backdrop-blur-[0.5px]">
                                <Check size={12} className="text-ps-blue stroke-[3]" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-card-border/60 pt-3 flex items-center justify-between text-[10px] text-gray-500 font-mono font-medium">
                      <span>{mod.lessons}</span>
                      <span>{mod.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Premium Badges Row */}
            <div className="relative z-10 border-t border-card-border/60 pt-8 mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-[10px]">
              {[
                { title: 'Beginner Friendly', desc: 'Start from scratch, no experience needed', icon: User },
                { title: 'Project Based', desc: 'Learn by building real-world projects', icon: Layout },
                { title: 'Industry Ready', desc: 'Skills that make you job-ready', icon: Briefcase },
                { title: 'Lifetime Access', desc: 'Learn at your own pace forever', icon: Clock },
                { title: 'Certificate Included', desc: 'Earn a professional completion certificate', icon: Award },
                { title: 'Community Access', desc: 'Join our community of creative minds', icon: Users },
                { title: 'Premium Resources', desc: 'Access PSDs, fonts, templates & more', icon: Folder },
                { title: 'Real Client Projects', desc: 'Work on real-world design challenges', icon: Sparkles }
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="space-y-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-ps-blue">
                      <Icon size={12} />
                      <span className="font-bold text-white">{badge.title}</span>
                    </div>
                    <p className="text-[9px] text-gray-500 font-light leading-snug">{badge.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Final Transformation Banner */}
            <div className="relative z-10 mt-8 p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none" />
              <div className="flex items-center gap-4 z-10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/10">
                  <Zap size={18} className="fill-purple-400/20" />
                </div>
                <div className="text-left space-y-1">
                  <h4 className="text-[11px] font-bold text-purple-300 uppercase tracking-widest font-heading">Final Transformation</h4>
                  <p className="text-[10px] text-gray-400 font-light leading-relaxed max-w-2xl">
                    By the end of this journey, you won't just know Photoshop. You'll possess the skills, confidence, portfolio, and professional mindset needed to work as a Graphic Designer, Freelancer, Content Creator, or Creative Entrepreneur.
                  </p>
                </div>
              </div>
              <a 
                href="#pricing"
                className="w-full md:w-auto px-6 py-3 bg-white hover:bg-gray-100 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg shrink-0 text-center flex items-center justify-center gap-1.5 font-heading"
              >
                Start Your Journey <Sparkles size={12} />
              </a>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 7. Instructor Spotlight */}
      <motion.section 
        id="instructor" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="max-w-7xl mx-auto px-6 py-40 relative z-10"
      >
        <div className="space-y-12">
          {/* Two-Column Top Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Cinematic Portrait & Floating UI */}
            <div className="lg:col-span-5 flex justify-center relative">
              
              {/* Capsule Badge above Portrait */}
              <div className="absolute -top-4 left-4 lg:left-0 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-card-border bg-black/95 text-[10px] font-bold uppercase tracking-wider text-gray-300 shadow-xl backdrop-blur-md">
                <User size={12} className="text-ps-blue" />
                LEARN FROM EXPERIENCE
              </div>

              {/* Glowing Background Glows */}
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-ps-blue/15 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none animate-pulse" />
              <div className="absolute bottom-10 left-1/3 w-[250px] h-[250px] bg-purple-500/10 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none" />

              {/* Main Portrait Container */}
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden border border-card-border shadow-2xl ps-glow bg-[#05070c] group">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80" 
                  alt="Wasim Havaldar" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Bottom Portrait Mask/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-[#05070c]/20 to-transparent opacity-80 pointer-events-none" />
                
                {/* Cursive Signature overlay */}
                <div className="absolute right-4 bottom-4 z-20 text-right select-none pointer-events-none">
                  <svg className="w-28 h-12 text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 25 C10 10, 12 5, 15 15 C17 25, 20 28, 22 18 C24 8, 25 8, 27 18 C29 25, 30 25, 33 20" />
                    <path d="M33 20 C35 18, 36 18, 37 20 C38 22, 38 23, 39 21 C41 19, 42 19, 43 21 C44 23, 45 23, 46 21 C48 19, 49 19, 50 22" />
                    <path d="M56 12 C54 20, 54 28, 55 28 C56 28, 58 18, 60 14 C62 10, 63 15, 63 22 C63 26, 62 28, 65 24" />
                    <path d="M65 24 C67 22, 68 22, 69 24 C70 26, 71 26, 72 24 C73 22, 74 22, 75 24 C76 26, 77 26, 78 23 C80 20, 81 20, 82 24 C83 26, 84 26, 87 22" />
                    <path d="M10 28 C30 32, 60 32, 90 26 C95 25, 85 24, 75 25" strokeWidth="1" opacity="0.7" />
                  </svg>
                  <div className="text-[7px] text-gray-300 uppercase tracking-widest font-heading font-black mt-1 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs inline-block">
                    Graphic Designer & Educator
                  </div>
                </div>
              </div>

              {/* Floating UI Item 1: Orbiting 3D PS Logo */}
              <motion.div 
                className="absolute -left-6 top-[15%] z-20 hidden sm:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative w-14 h-14 bg-[#001c3d]/90 border border-[#00c8ff]/30 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md">
                  <span className="font-heading font-black text-xl text-[#00c8ff] drop-shadow-[0_0_10px_rgba(0,200,255,0.4)]">Ps</span>
                  {/* Rotating orbital ring */}
                  <motion.div 
                    className="absolute inset-[-12px] border border-dashed border-[#00c8ff]/25 rounded-full pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-[-6px] border border-solid border-[#00c8ff]/10 rounded-full pointer-events-none" />
                </div>
              </motion.div>

              {/* Floating UI Item 2: Photoshop Toolbar Mockup */}
              <motion.div 
                className="absolute -left-8 bottom-[18%] z-20 hidden md:flex flex-col gap-2.5 p-1.5 bg-[#090b11]/90 border border-card-border rounded-xl shadow-2xl backdrop-blur-md"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="w-5 h-5 rounded flex items-center justify-center text-gray-500"><MousePointer size={11} /></div>
                <div className="w-5 h-5 rounded flex items-center justify-center text-[#00c8ff] bg-[#00c8ff]/10 border border-[#00c8ff]/20"><Sliders size={11} /></div>
                <div className="w-5 h-5 rounded flex items-center justify-center text-gray-500"><Layers size={11} /></div>
                <div className="w-5 h-5 rounded flex items-center justify-center text-gray-500"><Maximize2 size={11} /></div>
                <div className="w-5 h-5 rounded flex items-center justify-center text-gray-500"><RotateCcw size={11} /></div>
              </motion.div>

              {/* Floating UI Item 3: Photoshop Layers Panel Mockup */}
              <motion.div 
                className="absolute -right-8 top-[28%] z-20 hidden lg:block w-40 bg-[#090b11]/90 border border-card-border rounded-xl p-2.5 shadow-2xl backdrop-blur-md font-jakarta text-[8px]"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center justify-between border-b border-card-border pb-1 mb-1.5 text-gray-400">
                  <span className="font-semibold uppercase tracking-wider text-[7px]">Layers</span>
                  <span className="text-[6px] text-gray-500">Opacity: 100%</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 p-0.5 rounded bg-[#00c8ff]/15 border border-[#00c8ff]/20 text-[#00c8ff]">
                    <div className="w-2 h-2 flex items-center justify-center"><Check size={6} /></div>
                    <div className="w-3.5 h-3.5 bg-[#001c3d] rounded border border-[#00c8ff]/30 flex items-center justify-center text-[6px] font-bold">Ps</div>
                    <span className="font-medium truncate">Design</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-0.5 rounded text-gray-400">
                    <div className="w-2 h-2 flex items-center justify-center"><Check size={6} /></div>
                    <div className="w-3.5 h-3.5 bg-gray-800 rounded border border-card-border flex items-center justify-center text-[6px] font-bold">Fx</div>
                    <span className="font-medium truncate">Effects</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-0.5 rounded text-gray-400">
                    <div className="w-2 h-2 flex items-center justify-center"><Check size={6} /></div>
                    <div className="w-3.5 h-3.5 bg-gray-800 rounded border border-card-border flex items-center justify-center text-[6px] font-bold">IMG</div>
                    <span className="font-medium truncate">Graphics</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-0.5 rounded text-gray-400">
                    <div className="w-2 h-2 flex items-center justify-center"><Check size={6} /></div>
                    <div className="w-3.5 h-3.5 bg-gray-800 rounded border border-card-border flex items-center justify-center text-[6px] font-bold">BG</div>
                    <span className="font-medium truncate">Background</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating UI Item 4: Play Experience Card */}
              <motion.div 
                className="absolute -left-6 bottom-[10%] z-20 bg-black/90 border border-card-border rounded-xl p-3 flex flex-col gap-1.5 shadow-2xl backdrop-blur-md w-32 text-left"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-7 h-7 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/20 flex items-center justify-center text-[#00c8ff] shadow-lg">
                  <Play size={12} className="fill-[#00c8ff] ml-0.5" />
                </div>
                <div>
                  <div className="text-sm font-heading font-black text-white leading-tight">7+ Years</div>
                  <div className="text-[8px] text-gray-400 uppercase tracking-wider font-bold">Design Experience</div>
                </div>
              </motion.div>

            </div>

            {/* Right Side: Instructor Biography & Grids */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div>
                <span className="text-[10px] font-heading font-bold text-ps-blue tracking-widest uppercase block mb-1">YOUR MENTOR</span>
                <h2 className="font-heading text-4xl md:text-[56px] font-bold text-white tracking-tight leading-[1.1] mb-4 uppercase">
                  Learn From a Designer Who Has Spent <span className="bg-gradient-to-r from-[#00c8ff] to-[#7c3aed] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,200,255,0.15)]">7 Years</span> Mastering the Craft
                </h2>
                <div className="space-y-0.5">
                  <h3 className="font-heading text-lg sm:text-[24px] font-semibold text-white uppercase tracking-tight">Meet Wasim Havaldar</h3>
                  <p className="text-xs sm:text-sm font-semibold text-ps-blue uppercase tracking-wider">
                    Graphic Designer <span className="text-white">•</span> Photoshop Expert <span className="text-white">•</span> Creative Educator
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-base sm:text-[18px] leading-[1.8] text-gray-400 font-light">
                <p>Hello, I'm Wasim Havaldar.</p>
                <p>
                  For the past 7 years, I've been helping businesses, brands, creators, and entrepreneurs transform their ideas into visually powerful designs.
                </p>
                <p>
                  Throughout my journey, I've worked on hundreds of design projects, social media campaigns, branding systems, advertisements, photo manipulations, and creative marketing assets.
                </p>
                <p className="text-[#00c8ff] font-semibold border-l-2 border-[#00c8ff] pl-3 py-1.5 bg-[#00c8ff]/5 rounded-r">
                  To help aspiring designers learn the exact skills, techniques, and professional workflows used in the real world so they can build successful careers in graphic design.
                </p>
              </div>

              {/* Experience Stats (6 Columns) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
                {[
                  { icon: Award, value: 7, label: "Years of Experience" },
                  { icon: Briefcase, value: 500, label: "Design Projects Completed" },
                  { icon: Users, value: 100, label: "Clients Served" },
                  { icon: BookOpen, value: 300, label: "Lessons Created" },
                  { icon: Folder, value: 50, label: "Real-World Projects" },
                  { icon: GraduationCap, value: 1000, label: "Students Trained" }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={idx} 
                      className="glass-card p-3 rounded-xl border border-card-border flex flex-col justify-between hover:border-[#00c8ff]/30 hover:shadow-lg hover:shadow-ps-blue/5 transition-all duration-300"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#00c8ff]/10 border border-[#00c8ff]/20 flex items-center justify-center text-[#00c8ff] mb-2 shrink-0">
                        <Icon size={12} />
                      </div>
                      <div>
                        <div className="text-lg font-heading font-black text-white leading-none">
                          <AnimatedCounter value={stat.value} />+
                        </div>
                        <div className="text-[7px] text-gray-500 font-bold uppercase tracking-wider mt-1.5 leading-snug">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* What You'll Learn Grid (6 Feature Cards) */}
              <div className="space-y-4 pt-4">
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider border-b border-card-border pb-2">
                  What You'll Learn From Wasim
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    {
                      icon: Layers,
                      title: "Professional Photoshop Workflows",
                      desc: "Learn how professional designers approach projects from concept to completion."
                    },
                    {
                      icon: Briefcase,
                      title: "Real Client Projects",
                      desc: "Work on practical projects inspired by actual client requirements."
                    },
                    {
                      icon: Sparkles,
                      title: "Design Thinking",
                      desc: "Understand the psychology and strategy behind effective visual communication."
                    },
                    {
                      icon: Sliders,
                      title: "Industry Techniques",
                      desc: "Master techniques used by agencies, freelancers, and creative professionals."
                    },
                    {
                      icon: Layout,
                      title: "Portfolio Building",
                      desc: "Create a portfolio that attracts clients and job opportunities."
                    },
                    {
                      icon: Compass,
                      title: "Freelancing Blueprint",
                      desc: "Learn how to find clients, price your services, and grow your design career."
                    }
                  ].map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                      <div 
                        key={idx} 
                        className="glass-card p-5 rounded-2xl border border-card-border hover:border-[#00c8ff]/30 hover:shadow-lg hover:shadow-ps-blue/5 transition-all duration-300 relative group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#00c8ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <div className="w-7 h-7 rounded-lg bg-[#00c8ff]/10 border border-[#00c8ff]/20 flex items-center justify-center text-[#00c8ff] mb-3 shrink-0">
                          <Icon size={14} />
                        </div>
                        <h4 className="font-heading text-lg sm:text-[24px] font-semibold text-white mb-2 tracking-wide leading-tight group-hover:text-[#00c8ff] transition-colors">
                          {feat.title}
                        </h4>
                        <p className="text-sm sm:text-[18px] leading-[1.8] text-gray-400 font-light">
                          {feat.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* Three Bottom Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            
            {/* Card 1: Personal Mission */}
            <div className="glass-card p-6 rounded-2xl border border-card-border relative overflow-hidden flex flex-col justify-between min-h-[220px] hover:border-[#00c8ff]/25 transition-all">
              {/* Giant Script 'W' Watermark */}
              <div className="absolute right-2 bottom-0 text-[160px] font-heading font-black text-white/[0.02] leading-none select-none pointer-events-none">
                W
              </div>
              <div className="text-3xl text-[#00c8ff] font-serif leading-none select-none">“</div>
              <div className="space-y-2 relative z-10 text-left">
                <h4 className="font-heading text-lg sm:text-[24px] font-semibold text-white uppercase tracking-wider">More Than Just a Course</h4>
                <p className="text-sm sm:text-[18px] leading-[1.8] text-gray-300 font-light italic">
                  "I don't believe in teaching tools. I believe in teaching transformation. My goal is not just to help you learn Photoshop. My goal is to help you become a confident designer who can create professional work, build an impressive portfolio, attract clients, and turn creativity into a career."
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold text-ps-blue z-10 text-left">— Wasim Havaldar</div>
            </div>

            {/* Card 2: Achievements & Expertise */}
            <div className="glass-card p-6 rounded-2xl border border-card-border flex flex-col justify-between min-h-[220px] hover:border-[#00c8ff]/25 transition-all text-left">
              <div>
                <h4 className="font-heading text-lg sm:text-[24px] font-semibold text-white uppercase tracking-wider mb-4">Achievements & Expertise</h4>
                <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                  {[
                    "7 Years Industry Experience",
                    "Social Media Design Expert",
                    "Professional Graphic Designer",
                    "Creative Mentor",
                    "Photoshop Specialist",
                    "Real-World Project Training",
                    "Branding Expert",
                    "Lifetime Student Support"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/20 flex items-center justify-center text-[#00c8ff] shrink-0">
                        <Check size={8} strokeWidth={3} />
                      </div>
                      <span className="text-xs sm:text-[18px] leading-[1.8] text-gray-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3: Student Promise */}
            <div className="glass-card p-6 rounded-2xl border border-card-border relative overflow-hidden flex flex-col justify-between min-h-[220px] hover:border-[#00c8ff]/25 transition-all text-left">
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <h4 className="font-heading text-lg sm:text-[24px] font-semibold text-white uppercase tracking-wider">What Makes This Course Different?</h4>
                  <p className="text-sm sm:text-[18px] leading-[1.8] text-gray-400 font-light">
                    Unlike traditional courses that only teach software tools, this program focuses on helping students think like professional designers. Every lesson is practical, project-based, and designed to prepare students for real-world opportunities.
                  </p>
                </div>
                {/* Glowing Star Medal SVG */}
                <div className="w-12 h-12 rounded-xl bg-[#00c8ff]/10 border border-[#00c8ff]/20 flex items-center justify-center text-[#00c8ff] relative shrink-0 shadow-lg shadow-ps-blue/10 animate-pulse">
                  <Award size={24} className="z-10" />
                  <motion.div 
                    className="absolute inset-[-4px] border border-dashed border-[#00c8ff]/20 rounded-xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
              <p className="text-sm sm:text-[18px] leading-[1.8] text-[#00c8ff] font-semibold border-t border-card-border pt-3 mt-3">
                By the end of this journey, students will have the confidence, portfolio, and skills needed to work as freelancers, content creators, graphic designers, or creative entrepreneurs.
              </p>
            </div>

          </div>

          {/* Full-width CTA Banner */}
          <div className="bg-gradient-to-r from-[#031b33] to-[#05070c] border border-card-border rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#00c8ff]/10 to-transparent pointer-events-none" />
            <div className="flex items-center gap-4 z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#00c8ff]/10 border border-[#00c8ff]/20 flex items-center justify-center text-[#00c8ff] shadow-lg shadow-ps-blue/10 shrink-0">
                <Rocket size={20} className="animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading text-xl sm:text-[24px] font-semibold text-white tracking-tight uppercase">Ready to Learn Directly From a Professional Designer?</h4>
                <p className="text-base sm:text-[18px] leading-[1.8] text-gray-400 font-light">
                  Join thousands of aspiring creatives and start your journey toward becoming a professional graphic designer today.
                </p>
              </div>
            </div>
            <a 
              href="#pricing"
              className="w-full md:w-auto px-6 py-3 bg-[#00c8ff] hover:bg-[#00b0df] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg shrink-0 text-center flex items-center justify-center gap-1.5 font-heading z-10"
            >
              Start Learning Today <Sparkles size={12} />
            </a>
          </div>

        </div>
      </motion.section>

      {/* 8. Testimonials */}
      <section className="bg-dark-gray border-y border-card-border relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-40 space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="font-heading text-4xl md:text-[56px] font-bold text-white tracking-tight leading-[1.1] uppercase">What Our Students Accomplished</h2>
            <p className="text-base sm:text-[18px] leading-[1.8] text-gray-400 font-light">See how our graduates upgraded their careers and design contracts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {mockTestimonials.map((t) => (
              <div key={t.id} className="glass-card p-6 rounded-2xl flex flex-col justify-between gap-6 hover:scale-[1.01] transition-transform">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-sm sm:text-[18px] leading-[1.8] text-gray-300 font-light">"{t.review}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-card-border" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">{t.name}</div>
                    <div className="text-[10px] text-ps-blue uppercase font-bold tracking-wider">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Premium Creative Membership Investment Section */}
      <div className="w-full bg-[#030712] border-y border-card-border/80 py-3.5 text-center backdrop-blur-md relative z-20">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-ps-blue inline-flex items-center justify-center flex-wrap gap-x-2.5 gap-y-1 px-4">
          <span>⚡ Limited-Time Launch Offer — Lifetime Access for Only ₹799</span>
          <span className="text-gray-500 font-normal line-through">Future Price: ₹2,999</span>
          <span className="text-purple-400 font-extrabold">Join Now Before The Price Increases.</span>
        </span>
      </div>

      <motion.section 
        id="pricing" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 py-40 space-y-20 relative z-10"
      >
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ps-blue/25 bg-ps-blue/10 text-ps-blue text-[10px] font-bold uppercase tracking-widest">
            CREATIVE MEMBERSHIP
          </div>
          <motion.h2 
            variants={textFadeUp}
            className="font-heading text-4xl md:text-[56px] font-bold text-white tracking-tight leading-[1.1] uppercase max-w-3xl mx-auto"
          >
            One Small Investment. <br /> A Lifetime Creative Skill.
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-base sm:text-[18px] leading-[1.8] text-gray-400 font-light max-w-2xl mx-auto"
          >
            Master Photoshop and Graphic Design through 300+ premium lessons, real-world projects, downloadable resources, and professional workflows — all for less than the cost of a weekend dinner.
          </motion.p>
        </div>

        {/* Centered Premium Pricing Card */}
        <div className="max-w-2xl mx-auto relative">
          {/* Blue Photoshop glow accent behind the card */}
          <div className="absolute -inset-4 bg-ps-blue/15 rounded-[40px] filter blur-2xl opacity-75 pointer-events-none animate-pulse-slow"></div>
          
          <motion.div 
            variants={fadeIn}
            className="glass-card p-8 sm:p-12 rounded-3xl border-2 border-ps-blue/40 relative shadow-2xl shadow-ps-blue/20 bg-gradient-to-b from-[#0e121a] to-[#040507] flex flex-col justify-between relative z-10 text-center"
          >
            {/* Glowing Best Value Badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-ps-blue to-purple-500 text-black text-[10px] font-heading font-black uppercase px-6 py-2.5 rounded-full tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              🔥 BEST VALUE FOR ASPIRING DESIGNERS
            </div>
            
            <div className="space-y-6 pt-4">
              <div>
                <span className="text-[10px] text-ps-blue font-heading font-black tracking-widest uppercase block mb-1">MEMBERSHIP ACCESS</span>
                <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white uppercase leading-tight">Photoshop & Graphic Design Academy</h3>
              </div>

              {/* Big Price Display */}
              <div className="flex flex-col items-center justify-center border-y border-card-border/60 py-6 my-2">
                <div className="flex items-baseline gap-2 justify-center">
                  <span className="font-heading text-6xl sm:text-7xl font-black text-white tracking-tight">₹799</span>
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-sm line-through">₹2,999</span>
                </div>
                <div className="flex flex-col items-center mt-2">
                  <span className="text-[10px] text-ps-blue font-bold uppercase tracking-widest">One-Time Payment</span>
                  <span className="text-[10px] text-gray-500 mt-1">No Monthly Fees • No Hidden Charges • Lifetime Access</span>
                </div>
              </div>

              {/* Key Perks */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-gray-300 max-w-md mx-auto py-2 text-left">
                <li className="flex items-center gap-2"><Check size={14} className="text-[#00c8ff] shrink-0" /> One-Time Payment</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#00c8ff] shrink-0" /> No Monthly Fees</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#00c8ff] shrink-0" /> No Hidden Charges</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-[#00c8ff] shrink-0" /> Lifetime Access</li>
              </ul>

              {/* CTA Button */}
              <div className="space-y-4 pt-4">
                <button 
                  onClick={() => setCheckoutPlan('lifetime')}
                  className="w-full py-4 px-6 text-center text-xs font-extrabold uppercase tracking-widest bg-ps-blue hover:bg-[#00b0df] text-black rounded-full transition-all duration-300 shadow-lg shadow-ps-blue/20 ps-glow flex items-center justify-center gap-2 font-heading cursor-pointer"
                >
                  Start Learning Today — ₹799 <Zap size={14} />
                </button>
                
                <div className="flex items-center justify-center gap-2 text-center text-[8px] text-gray-500 font-mono border-t border-card-border/40 pt-4">
                  <span>✓ Secure Payment</span>
                  <span>•</span>
                  <span>✓ Instant Access</span>
                  <span>•</span>
                  <span>✓ Lifetime Updates</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Value Comparison & Transformation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto pt-8">
          
          {/* Value Comparison Card */}
          <motion.div 
            variants={fadeIn}
            className="glass-card rounded-3xl border border-card-border/80 p-6 sm:p-8 flex flex-col gap-6 bg-dark-gray/30 relative overflow-hidden text-left"
          >
            <h4 className="font-heading text-[18px] font-bold text-white uppercase tracking-wider">The Value Comparison</h4>
            <div className="space-y-3">
              {/* Traditional Institute */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/2 border border-white/5 opacity-60">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-mono">Traditional Design Institute</span>
                  <span className="text-xs text-red-400 font-bold line-through mt-0.5">₹15,000 – ₹50,000</span>
                </div>
                <span className="text-[8px] font-bold uppercase text-red-500 bg-red-950/20 px-2 py-0.5 rounded">High Cost</span>
              </div>
              {/* Expensive Online Courses */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/2 border border-white/5 opacity-60">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-mono">Expensive Online Courses</span>
                  <span className="text-xs text-red-400 font-bold line-through mt-0.5">₹5,000 – ₹20,000</span>
                </div>
                <span className="text-[8px] font-bold uppercase text-red-500 bg-red-950/20 px-2 py-0.5 rounded">High Cost</span>
              </div>
              {/* YouTube */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/2 border border-white/5 opacity-60">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-mono">YouTube Alone</span>
                  <span className="text-xs text-yellow-500 font-bold mt-0.5">Confusing & Unstructured</span>
                </div>
                <span className="text-[8px] font-bold uppercase text-yellow-500 bg-yellow-950/20 px-2 py-0.5 rounded">Unstructured</span>
              </div>
              {/* Academy */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#00c8ff]/5 border border-[#00c8ff]/25 shadow-lg shadow-ps-blue/5">
                <div className="flex flex-col">
                  <span className="text-[10px] text-ps-blue font-bold uppercase tracking-wider font-heading">Academy Membership</span>
                  <span className="text-lg font-heading font-black text-white mt-1">Only ₹799</span>
                </div>
                <span className="text-[8px] font-bold uppercase text-[#00c8ff] bg-[#00c8ff]/10 px-2 py-1 rounded border border-[#00c8ff]/20">Lifetime Access</span>
              </div>
            </div>
          </motion.div>

          {/* Before vs After Transformation Card */}
          <motion.div 
            variants={fadeIn}
            className="glass-card rounded-3xl border border-card-border/80 p-6 sm:p-8 flex flex-col gap-6 bg-dark-gray/30 relative overflow-hidden text-left"
          >
            <h4 className="font-heading text-[18px] font-bold text-white uppercase tracking-wider">What ₹799 Can Unlock</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Before */}
              <div className="space-y-3.5">
                <span className="text-[9px] font-black tracking-widest text-red-500 uppercase block border-b border-red-500/10 pb-1">BEFORE</span>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li className="flex items-start gap-1.5"><span className="text-red-500 shrink-0">✕</span> Watching random tutorials</li>
                  <li className="flex items-start gap-1.5"><span className="text-red-500 shrink-0">✕</span> No clear learning path</li>
                  <li className="flex items-start gap-1.5"><span className="text-red-500 shrink-0">✕</span> Lack of confidence</li>
                  <li className="flex items-start gap-1.5"><span className="text-red-500 shrink-0">✕</span> No portfolio</li>
                  <li className="flex items-start gap-1.5"><span className="text-red-500 shrink-0">✕</span> No clients</li>
                </ul>
              </div>
              {/* After */}
              <div className="space-y-3.5">
                <span className="text-[9px] font-black tracking-widest text-[#00c8ff] uppercase block border-b border-[#00c8ff]/10 pb-1">AFTER</span>
                <ul className="space-y-2 text-xs text-white font-medium">
                  <li className="flex items-start gap-1.5"><span className="text-[#00c8ff] shrink-0 font-bold">✓</span> Professional Photoshop skills</li>
                  <li className="flex items-start gap-1.5"><span className="text-[#00c8ff] shrink-0 font-bold">✓</span> Graphic Design expertise</li>
                  <li className="flex items-start gap-1.5"><span className="text-[#00c8ff] shrink-0 font-bold">✓</span> Portfolio-ready projects</li>
                  <li className="flex items-start gap-1.5"><span className="text-[#00c8ff] shrink-0 font-bold">✓</span> Industry workflows</li>
                  <li className="flex items-start gap-1.5"><span className="text-[#00c8ff] shrink-0 font-bold">✓</span> Freelancing opportunities</li>
                </ul>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Feature Grid: What is Included in Your Membership */}
        <div className="space-y-8 pt-8">
          <h4 className="font-heading text-[20px] font-bold text-white uppercase tracking-wider text-center">What is Included in Your Membership</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            {[
              { title: "300+ Premium Lessons", desc: "Master Photoshop from beginner to advanced." },
              { title: "12 Complete Modules", desc: "Step-by-step learning roadmap." },
              { title: "50+ Real-World Projects", desc: "Build practical experience." },
              { title: "Graphic Design Mastery", desc: "Learn design principles, branding, typography, and visual communication." },
              { title: "Photoshop Mastery", desc: "Professional editing, retouching, compositing, and social media design." },
              { title: "Downloadable Resources", desc: "PSD Files, Templates, Mockups, Fonts, Assets." },
              { title: "Lifetime Access", desc: "Watch anytime, forever." },
              { title: "Future Updates Included", desc: "Get all upcoming lessons free." },
              { title: "Certificate of Completion", desc: "Showcase your achievement." },
              { title: "Community Access", desc: "Connect with fellow creatives." }
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-5 rounded-2xl border border-card-border/60 flex flex-col gap-2 hover:border-ps-blue/20 transition-all duration-300 bg-dark-gray/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-ps-blue/10 border border-ps-blue/25 flex items-center justify-center text-ps-blue shrink-0">
                    <Check size={10} />
                  </div>
                  <h5 className="font-heading text-[14px] font-bold text-white uppercase tracking-wide">{item.title}</h5>
                </div>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee & Trust Badges Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6 pt-12 border-t border-card-border/60 mt-12 relative">
          <h4 className="font-heading text-[24px] font-bold text-white uppercase tracking-wide">Your Creative Journey Starts Today</h4>
          <p className="text-sm sm:text-[18px] leading-[1.8] text-gray-400 font-light">
            For just ₹799, gain lifetime access to a complete Photoshop and Graphic Design learning system designed to help you build skills that can serve you for years.
          </p>
          <div className="text-sm sm:text-[18px] leading-[1.8] text-[#00c8ff] font-semibold">
            This isn't an expense. It's an investment in your creative future.
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => setCheckoutPlan('lifetime')}
              className="w-full sm:w-auto px-8 py-4 bg-ps-blue hover:bg-ps-blue/90 text-black rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 text-center ps-glow flex items-center justify-center gap-2 font-heading"
            >
              Start Learning Today — ₹799
            </button>
            <a 
              href="#curriculum"
              className="w-full sm:w-auto px-8 py-4 bg-dark-gray hover:bg-gray-800 text-white border border-card-border rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 text-center"
            >
              View Curriculum
            </a>
          </div>

          {/* Trust Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[9px] font-mono text-gray-500 pt-8 uppercase tracking-widest">
            <span>✓ Secure Payment</span>
            <span>•</span>
            <span>✓ Instant Access</span>
            <span>•</span>
            <span>✓ Lifetime Updates</span>
            <span>•</span>
            <span>✓ Mobile & Desktop Access</span>
            <span>•</span>
            <span>✓ Beginner Friendly</span>
            <span>•</span>
            <span>✓ Project Based Learning</span>
            <span>•</span>
            <span>✓ Certificate Included</span>
            <span>•</span>
            <span>✓ Community Support</span>
          </div>
        </div>

      </motion.section>

      {/* 10. FAQ Section */}
      <motion.section 
        id="faq" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-4xl mx-auto px-6 py-40 space-y-12 relative z-10"
      >
        <motion.h2 
          variants={textFadeUp}
          className="font-heading text-4xl md:text-[56px] font-bold text-white tracking-tight leading-[1.1] text-center uppercase mb-12"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {FAQs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors font-semibold text-white text-lg sm:text-[24px]"
              >
                <span>{faq.q}</span>
                {activeFAQ === idx ? <ChevronUp size={20} className="text-[#00c8ff]" /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {activeFAQ === idx && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-sm sm:text-[18px] leading-[1.8] text-gray-400 font-light border-t border-card-border/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 11. Premium Footer */}
      <footer className="border-t border-card-border bg-black py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Brand */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-ps-blue flex items-center justify-center font-bold text-black text-sm">
                Ps
              </div>
              <span className="font-heading font-extrabold text-white">Mastery</span>
            </div>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Premium learning experiences built for professional visual educators and graphic designers globally.
            </p>
          </div>

          {/* Links 1 */}
          <div className="text-left">
            <div className="text-[10px] font-bold text-white uppercase tracking-wider mb-4">Courses</div>
            <ul className="space-y-2.5 text-[11px] text-gray-500 font-light">
              <li><a href="#curriculum" className="hover:text-white transition-colors">Photoshop Basics</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Retouching Masterclass</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Social Media Designs</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Advanced Compositing</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="text-left">
            <div className="text-[10px] font-bold text-white uppercase tracking-wider mb-4">Resources</div>
            <ul className="space-y-2.5 text-[11px] text-gray-500 font-light">
              <li><a href="#why-learn" className="hover:text-white transition-colors">PSD Projects</a></li>
              <li><a href="#why-learn" className="hover:text-white transition-colors">Custom Brushes</a></li>
              <li><a href="#why-learn" className="hover:text-white transition-colors">Design Tips</a></li>
              <li><a href="#why-learn" className="hover:text-white transition-colors">Community Forum</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-left">
            <div className="text-[10px] font-bold text-white uppercase tracking-wider mb-4">Legal</div>
            <ul className="space-y-2.5 text-[11px] text-gray-500 font-light">
              <li><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Contact Support</span></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-card-border/50 text-center text-[10px] text-gray-600">
          © {new Date().getFullYear()} PS Mastery. All rights reserved. Inspired by Apple, Netflix, and MasterClass design language.
        </div>
      </footer>

      {/* --- MODAL 1: Watch Preview Video Player --- */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-card-border bg-[#0B0B0C] shadow-2xl"
            >
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
              >
                <X size={16} />
              </button>
              <video 
                autoPlay
                controls
                src="https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-stylus-over-a-graphics-tablet-34282-large.mp4"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: Credit Card Checkout Simulator --- */}
      <AnimatePresence>
        {checkoutPlan && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md glass-card bg-[#0B0B0C] p-6 rounded-2xl shadow-2xl space-y-6 relative"
            >
              <button 
                onClick={() => setCheckoutPlan(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="space-y-1 text-center">
                <CreditCard className="mx-auto text-ps-blue mb-2 animate-bounce" size={32} />
                <h3 className="font-heading text-lg font-bold text-white uppercase">Stripe Secure Checkout</h3>
                <p className="text-xs text-gray-400">
                  Purchasing <span className="text-ps-blue font-semibold">{checkoutPlan.toUpperCase()} ACCESS</span>
                </p>
              </div>

              {checkoutSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="mx-auto text-green-500 animate-pulse" size={48} />
                  <div className="text-sm font-bold text-white">Payment Successful!</div>
                  <div className="text-xs text-gray-400 font-light">Unlocking your designer dashboard...</div>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Name on Card</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Alex Mercer"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Card Number</label>
                    <input 
                      type="text" 
                      required 
                      maxLength={19}
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                      className="w-full px-3 py-2.5 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-bold">Expiry Date</label>
                      <input 
                        type="text" 
                        required 
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2.5 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-bold">CVC</label>
                      <input 
                        type="password" 
                        required 
                        maxLength={3}
                        placeholder="•••"
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value)}
                        className="w-full px-3 py-2.5 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue text-center"
                      />
                    </div>
                  </div>

                  <div className="pt-2 text-center text-[10px] text-gray-500 flex items-center justify-center gap-1.5 font-light">
                    <Shield size={10} /> Fully encrypted mock payment session.
                  </div>

                  <button 
                    type="submit"
                    disabled={isProcessingCheckout}
                    className="w-full py-3 bg-ps-blue hover:bg-ps-blue/90 text-black rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-ps-blue/20 flex items-center justify-center gap-2"
                  >
                    {isProcessingCheckout ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Pay {checkoutPlan === 'lifetime' ? '₹799' : `$${checkoutPlan === 'monthly' ? '29.00' : '199.00'}`}</>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL 3: Student/Admin Login Simulator --- */}
      <AnimatePresence>
        {isAuthOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm glass-card bg-[#0B0B0C] p-6 rounded-2xl shadow-2xl relative space-y-6"
            >
              <button 
                onClick={() => setIsAuthOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="space-y-1 text-center">
                <div className="w-12 h-12 rounded-xl bg-ps-blue flex items-center justify-center text-black font-extrabold text-2xl mx-auto shadow-lg shadow-ps-blue/30 mb-2">
                  Ps
                </div>
                <h3 className="font-heading text-lg font-bold text-white uppercase">Log in to PS Mastery</h3>
                <p className="text-xs text-gray-400 font-light">Unlock your learning path</p>
              </div>

              <form onSubmit={handleQuickLogin} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="student@psmastery.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Password</label>
                  <input 
                    type="password" 
                    required 
                    defaultValue="12345"
                    className="w-full px-3 py-2.5 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-white hover:bg-gray-200 text-black rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Log In
                </button>

                <div className="text-center space-y-2 border-t border-card-border/50 pt-4">
                  <div className="text-[10px] text-gray-500 font-bold uppercase">Quick Demo Credentials:</div>
                  <div className="flex flex-col gap-1.5 text-xs text-gray-400">
                    <div>
                      Student: <span 
                        onClick={() => setAuthEmail('student@psmastery.com')}
                        className="text-ps-blue cursor-pointer underline font-semibold"
                      >
                        student@psmastery.com
                      </span>
                    </div>
                    <div>
                      Admin: <span 
                        onClick={() => setAuthEmail('admin@psmastery.com')}
                        className="text-ps-blue cursor-pointer underline font-semibold"
                      >
                        admin@psmastery.com
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
