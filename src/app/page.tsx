'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { mockTestimonials } from '@/data/mockData';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  RotateCcw
} from 'lucide-react';

// Framer Motion Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
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

  // Auth Quick Modal
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState('');

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
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
            <a href="#instructor" className="hover:text-white transition-colors">Instructor</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
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
              <a href="#curriculum" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white py-1">Curriculum</a>
              <a href="#instructor" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white py-1">Instructor</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white py-1">Pricing</a>
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

      {/* 3. Hero Section (Redesigned with custom image background) */}
      <div className="relative bg-[url('/hero-bg.png')] bg-cover bg-no-repeat bg-right border-b border-card-border/80 overflow-hidden min-h-[600px] flex items-center">
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
            
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.95] uppercase">
              Master Photoshop <br className="hidden sm:inline" />
              Like a <span className="bg-gradient-to-r from-ps-blue via-cyan-400 to-purple-400 bg-clip-text text-transparent">Professional</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
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

          {/* Right Side Spacer (Allows the background image's 3D mockups to display cleanly) */}
          <div className="lg:col-span-5 h-[280px] lg:h-auto pointer-events-none" />
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
        className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center space-y-16 relative z-10"
      >
        <motion.div variants={fadeIn} className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Why Learn Photoshop With Us?
          </h2>
          <p className="text-sm text-gray-400 font-light max-w-xl mx-auto">
            Everything you need to grow from a complete beginner to a highly paid, professional designer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 text-left">
          {/* Card 1: Real-World Portfolio Projects (Spans 4 columns) */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="md:col-span-4 glass-card p-6 sm:p-8 rounded-3xl border border-card-border/80 flex flex-col lg:flex-row gap-8 items-stretch justify-between overflow-hidden relative group animate-reveal"
          >
            <div className="flex-1 flex flex-col justify-between space-y-6 z-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ps-blue/20 bg-ps-blue/5 text-ps-blue text-[10px] font-bold uppercase tracking-wider">
                  <Folder size={12} /> Live Projects
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Real-World Portfolio Projects
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-md">
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
            className="md:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-card-border/80 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                <BookOpen size={12} /> Learning Path
              </div>
              <h3 className="font-heading text-xl font-black text-white uppercase tracking-tight">
                Zero to Pro Roadmap
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
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
            className="md:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-card-border/80 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                <Layers size={12} /> Non-Destructive
              </div>
              <h3 className="font-heading text-xl font-black text-white uppercase tracking-tight">
                Non-Destructive Workflow
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
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
            className="md:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-card-border/80 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles size={12} /> Design Toolkit
              </div>
              <h3 className="font-heading text-xl font-black text-white uppercase tracking-tight">
                Premium Resources
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
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
            className="md:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-card-border/80 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                <Zap size={12} /> AI & Updates
              </div>
              <h3 className="font-heading text-xl font-black text-white uppercase tracking-tight">
                AI & Lifetime Updates
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
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

      {/* 6. Course Curriculum Preview */}
      <motion.section 
        id="curriculum" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="max-w-7xl mx-auto px-6 py-20 md:py-28 space-y-16 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left sticky details */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/25 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
              Curriculum Overview
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight leading-none uppercase">
              Master the Craft Module by Module
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              Explore our core curriculum containing 8 comprehensive modules, spanning from vector paths and hair selections to professional color grading and client projects.
            </p>
            <div className="p-5 rounded-2xl bg-dark-gray border border-card-border space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Course Includes:</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                <div className="flex items-center gap-1.5"><Check size={12} className="text-ps-blue" /> Lifetime Access</div>
                <div className="flex items-center gap-1.5"><Check size={12} className="text-ps-blue" /> Downloadable PSDs</div>
                <div className="flex items-center gap-1.5"><Check size={12} className="text-ps-blue" /> Custom Brushes</div>
                <div className="flex items-center gap-1.5"><Check size={12} className="text-ps-blue" /> Certificate</div>
              </div>
            </div>
          </div>

          {/* Right Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {modules.map((mod) => (
              <div 
                key={mod.id}
                className="glass-card rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg">{mod.title}</h3>
                    <p className="text-xs text-gray-400 font-light">{mod.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] bg-ps-blue/15 text-ps-blue px-2.5 py-1 rounded-full font-bold border border-ps-blue/20">
                      {mod.lessonsCount} lessons
                    </span>
                    {activeModule === mod.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {activeModule === mod.id && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-card-border/50 bg-black/40"
                    >
                      <div className="p-5 space-y-3">
                        {mod.lessons && mod.lessons.length > 0 ? (
                          mod.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-start justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                              <div className="space-y-1">
                                <div className="font-medium text-white flex items-center gap-2">
                                  {lesson.title}
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                                    lesson.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                                    lesson.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                                    'bg-red-500/10 text-red-400 border border-red-500/20'
                                  }`}>
                                    {lesson.difficulty}
                                  </span>
                                </div>
                                <p className="text-[11px] text-gray-400 font-light">{lesson.description}</p>
                              </div>
                              <span className="text-[10px] text-gray-500 font-mono pt-1">{lesson.duration}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-gray-500 p-2 italic">Additional lessons unlocking weekly.</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
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
        className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10"
      >
        <div className="glass-card rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-ps-blue/10 via-transparent to-transparent pointer-events-none" />
          
          {/* Photo */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border border-card-border shadow-2xl ps-glow">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" 
                alt="Sarah Connor" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
              Meet Your Instructor
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Sarah Connor</h2>
            <p className="text-ps-blue text-sm font-semibold">Former Lead Designer at Apple & Netflix</p>
            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              "Over my 15-year career in tech, I have shaped interfaces, digital campaigns, and movie assets viewed by millions. In this course, I strip away the complex academic jargon and show you the exact, highly efficient workflows used by top industry professionals."
            </p>
            
            <div className="grid grid-cols-3 gap-4 border-t border-card-border pt-6">
              <div>
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Students Taught</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 8. Testimonials */}
      <section className="bg-dark-gray border-y border-card-border relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">What Our Students Accomplished</h2>
            <p className="text-sm text-gray-400 font-light">See how our graduates upgraded their careers and design contracts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {mockTestimonials.map((t) => (
              <div key={t.id} className="glass-card p-6 rounded-2xl flex flex-col justify-between gap-6 hover:scale-[1.01] transition-transform">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">"{t.review}"</p>
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

      {/* 9. Subscription Plans (Lifetime plan outstanding glow) */}
      <motion.section 
        id="pricing" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center space-y-16 relative z-10"
      >
        <motion.div variants={fadeIn} className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Simple, Transparent Pricing
          </h2>
          <p className="text-sm text-gray-400 font-light">
            Subscribe once and unlock full access to lessons, project files, design shorts, and updates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto text-left">
          
          {/* Monthly Plan */}
          <motion.div 
            variants={fadeIn}
            className="neon-card p-8 rounded-3xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-white uppercase">Monthly Plan</h3>
                <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-wider">Best for testing out</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-extrabold text-white">$29</span>
                <span className="text-xs text-gray-500 font-bold uppercase">/ month</span>
              </div>
              <ul className="space-y-3.5 text-xs text-gray-300">
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Access to all 8 modules</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Downloadable PSD resources</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Mobile dashboard access</li>
                <li className="flex items-center gap-2 text-gray-600"><Lock size={12} /> No Discord access</li>
              </ul>
            </div>
            <button 
              onClick={() => setCheckoutPlan('monthly')}
              className="w-full mt-8 py-3 px-4 text-center text-[10px] font-bold uppercase tracking-wider border border-card-border text-white hover:bg-white/5 rounded-full transition-colors"
            >
              Choose Monthly
            </button>
          </motion.div>

          {/* Lifetime Access Plan (Outstanding Glow Wow Factor) */}
          <motion.div 
            variants={fadeIn}
            className="neon-card p-8 rounded-3xl flex flex-col justify-between border-ps-blue/30 relative shadow-2xl shadow-ps-blue/10 bg-gradient-to-b from-[#121214] to-black"
          >
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-ps-blue text-black text-[9px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-widest shadow-lg">
              Best Value
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2 uppercase">
                  Lifetime Access <Sparkles size={16} className="text-ps-blue animate-pulse" />
                </h3>
                <p className="text-[10px] text-ps-blue mt-1 uppercase font-bold tracking-wider">Pay once, own forever</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-5xl font-black text-white">$399</span>
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider ml-1">One Time</span>
              </div>
              <ul className="space-y-3.5 text-xs text-gray-300">
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Access to all 8 modules</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Downloadable PSD resources</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Design hacks & Shorts feed</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> VIP Designer Discord access</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> All future updates included</li>
              </ul>
            </div>
            <button 
              onClick={() => setCheckoutPlan('lifetime')}
              className="w-full mt-8 py-3.5 px-4 text-center text-[10px] font-extrabold uppercase tracking-widest bg-ps-blue hover:bg-ps-blue/90 text-black rounded-full transition-colors shadow-lg shadow-ps-blue/20"
            >
              Get Lifetime Access
            </button>
          </motion.div>

          {/* Yearly Plan */}
          <motion.div 
            variants={fadeIn}
            className="neon-card p-8 rounded-3xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-white uppercase">Yearly Plan</h3>
                <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-wider">Ideal for serious designers</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl font-extrabold text-white">$199</span>
                <span className="text-xs text-gray-500 font-bold uppercase">/ year</span>
              </div>
              <ul className="space-y-3.5 text-xs text-gray-300">
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Access to all 8 modules</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Downloadable PSD resources</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Design hacks & Shorts feed</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Student Discord access</li>
              </ul>
            </div>
            <button 
              onClick={() => setCheckoutPlan('yearly')}
              className="w-full mt-8 py-3 px-4 text-center text-[10px] font-bold uppercase tracking-wider border border-card-border text-white hover:bg-white/5 rounded-full transition-colors"
            >
              Choose Yearly
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* 10. FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20 md:py-28 space-y-12 relative z-10">
        <h2 className="font-heading text-3xl font-extrabold text-white tracking-tight text-center uppercase">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors font-medium text-white text-base"
              >
                <span>{faq.q}</span>
                {activeFAQ === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <AnimatePresence>
                {activeFAQ === idx && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-xs sm:text-sm text-gray-400 font-light leading-relaxed border-t border-card-border/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

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
                      <>Pay ${checkoutPlan === 'monthly' ? '29.00' : checkoutPlan === 'yearly' ? '199.00' : '399.00'}</>
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
