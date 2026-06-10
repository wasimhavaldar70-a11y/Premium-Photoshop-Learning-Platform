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
  CheckCircle2
} from 'lucide-react';

export default function LandingPage() {
  const { user, modules, tips, purchaseSubscription, login } = useApp();
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

  // Authentication Quick Modal
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
    <div className="relative min-h-screen bg-rich-black text-light-gray overflow-x-hidden selection:bg-ps-blue selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-ps-blue/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-[1000px] right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. Glassmorphic Navigation Header */}
      <nav className="sticky top-0 z-40 w-full glass-navbar">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 rounded-lg bg-ps-blue flex items-center justify-center font-bold text-white shadow-lg shadow-ps-blue/30">
              Ps
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">Mastery</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
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
                className="px-4 py-2 text-sm font-medium text-white bg-ps-blue hover:bg-ps-blue/90 rounded-full transition-all duration-200 ps-glow"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setIsAuthOpen(true)}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <a 
                  href="#pricing"
                  className="px-4 py-2 text-sm font-medium text-black bg-white hover:bg-gray-200 rounded-full transition-all duration-200"
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
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-b border-card-border bg-rich-black px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-300"
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
      </nav>

      {/* 2. Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Copy */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ps-blue/20 bg-ps-blue/10 text-ps-blue text-xs font-semibold uppercase tracking-widest">
            <Sparkles size={12} /> The Complete Photoshop Course
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
            Master Photoshop <br className="hidden sm:inline" />
            Like a <span className="bg-gradient-to-r from-ps-blue via-cyan-400 to-purple-400 bg-clip-text text-transparent">Professional</span> Designer
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
            Learn Photoshop from beginner to advanced with real-world projects, premium lessons, downloadable resources, and expert guidance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a 
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-ps-blue hover:bg-ps-blue/90 text-white rounded-full font-semibold transition-all duration-200 text-center ps-glow flex items-center justify-center gap-2"
            >
              Start Learning <Zap size={18} />
            </a>
            <button 
              onClick={() => setIsPreviewOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-dark-gray hover:bg-gray-800 text-white border border-card-border rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Play size={18} fill="white" /> Watch Preview
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
            <div className="text-sm text-gray-400">
              <span className="font-bold text-white">10K+ Students</span> Enrolled & Designing Globally
            </div>
          </div>
        </div>

        {/* Right Side Parallax Mockup (Photoshop Floating Panels) */}
        <div className="lg:col-span-6 relative flex justify-center items-center h-[450px]">
          {/* Main Canvas Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-card-border bg-gradient-to-br from-[#121214] to-black ps-glow"
          >
            {/* Background design grid */}
            <div className="absolute inset-0 grid-bg opacity-30" />
            
            {/* Center Logo with Glow */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
              <div className="w-24 h-24 rounded-2xl bg-ps-blue flex items-center justify-center text-white font-extrabold text-5xl shadow-2xl shadow-ps-blue/40 mb-4 animate-float">
                Ps
              </div>
              <p className="text-xs tracking-wider text-gray-500 uppercase">Interactive Workspace Preview</p>
            </div>
          </motion.div>

          {/* Floating Panels (Mocking Photoshop UI Elements) */}
          {/* Panel 1: Toolbar */}
          <motion.div 
            initial={{ opacity: 0, x: -50, y: -20 }}
            animate={{ opacity: 1, x: -40, y: -80 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute left-4 top-1/4 glass-card px-2 py-3 rounded-lg flex flex-col gap-3 shadow-xl"
          >
            {['Pen', 'Select', 'Crop', 'Brush', 'Eraser', 'Gradient', 'Text'].map((tool, idx) => (
              <div key={tool} className={`w-6 h-6 rounded flex items-center justify-center text-xs ${idx === 0 ? 'bg-ps-blue text-white' : 'text-gray-400 hover:text-white'}`}>
                {idx === 0 && <Zap size={12} />}
                {idx === 1 && <Layout size={12} />}
                {idx === 3 && <Sparkles size={12} />}
                {idx > 3 && <span className="font-bold">·</span>}
              </div>
            ))}
          </motion.div>

          {/* Panel 2: Layers List */}
          <motion.div 
            initial={{ opacity: 0, x: 50, y: 40 }}
            animate={{ opacity: 1, x: 40, y: 90 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute right-4 bottom-1/4 w-[160px] glass-card p-3 rounded-lg shadow-xl text-left"
          >
            <div className="flex items-center justify-between border-b border-card-border pb-1.5 mb-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Layers</span>
              <Layers size={10} className="text-gray-400" />
            </div>
            <div className="space-y-1">
              <div className="p-1 px-2 text-[10px] rounded bg-ps-blue/10 border border-ps-blue/30 text-ps-blue flex items-center justify-between">
                <span>Color Grading</span>
                <Sparkles size={8} />
              </div>
              <div className="p-1 px-2 text-[10px] rounded bg-white/5 border border-white/5 text-gray-300 flex items-center justify-between">
                <span>Retouching Mask</span>
                <Check size={8} />
              </div>
              <div className="p-1 px-2 text-[10px] rounded bg-white/5 border border-white/5 text-gray-300 flex items-center justify-between">
                <span>Background RAW</span>
                <Lock size={8} />
              </div>
            </div>
          </motion.div>

          {/* Panel 3: Color Wheel mockup */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: -160 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute top-1/3 w-[150px] glass-card p-3 rounded-lg shadow-xl text-left"
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Color Wheel</span>
              <div className="w-2 h-2 rounded-full bg-ps-blue" />
            </div>
            <div className="w-full aspect-square rounded-full bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 relative flex items-center justify-center p-2">
              <div className="w-full h-full rounded-full bg-rich-black flex items-center justify-center">
                <div className="w-3 h-3 rounded-full border-2 border-white bg-ps-blue absolute top-1/4 right-1/4" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Trust Section */}
      <section className="bg-dark-gray border-y border-card-border">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Students Enrolled', count: '10,000+' },
            { label: 'Lessons Available', count: '250+' },
            { label: 'Projects Included', count: '50+' },
            { label: 'Course Rating', count: '4.9 ★' }
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{stat.count}</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Learn With Us */}
      <section id="why-learn" className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center space-y-16">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Learn Photoshop With Us?
          </h2>
          <p className="text-gray-400 font-light">
            Everything you need to grow from a complete beginner to a highly paid, professional designer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Beginner Friendly",
              desc: "Step-by-step guidance starting from interface navigation. No prior knowledge required.",
              icon: BookOpen
            },
            {
              title: "Real World Projects",
              desc: "Build professional posters, YouTube assets, client labels, and UX assets to populate your portfolio.",
              icon: Folder
            },
            {
              title: "Industry Techniques",
              desc: "Learn frequency separation, channel masking, non-destructive dodge & burn used by leading agencies.",
              icon: Layers
            },
            {
              title: "Lifetime Updates",
              desc: "Get free updates containing newly released Photoshop tools, AI features, and templates forever.",
              icon: Award
            },
            {
              title: "Premium Resources",
              desc: "Download all project asset packs, custom brush sets, typography templates, and cheat-sheets.",
              icon: Sparkles
            },
            {
              title: "Community Support",
              desc: "Join our active designer forum. Ask questions, receive design reviews, and network with peers.",
              icon: Shield
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -6 }}
                className="glass-card p-6 rounded-2xl flex flex-col gap-4 hover:border-ps-blue/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-ps-blue/10 border border-ps-blue/20 flex items-center justify-center text-ps-blue">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. Course Curriculum Preview */}
      <section id="curriculum" className="max-w-7xl mx-auto px-6 py-20 md:py-28 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left sticky details */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              Curriculum Overview
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Master the Craft Module by Module
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Explore our core curriculum containing 8 comprehensive modules, spanning from vector paths and hair selections to professional color grading and client projects.
            </p>
            <div className="p-4 rounded-xl bg-dark-gray border border-card-border space-y-3">
              <div className="text-sm font-bold text-white">Course Includes:</div>
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
                className="glass-card rounded-xl overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-base sm:text-lg">{mod.title}</h3>
                    <p className="text-xs text-gray-400 font-light">{mod.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-ps-blue/10 text-ps-blue px-2.5 py-1 rounded-full font-bold border border-ps-blue/20">
                      {mod.lessonsCount} lessons
                    </span>
                    {activeModule === mod.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {activeModule === mod.id && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-card-border bg-black/40"
                    >
                      <div className="p-5 space-y-3">
                        {mod.lessons && mod.lessons.length > 0 ? (
                          mod.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-start justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm">
                              <div className="space-y-1">
                                <div className="font-medium text-white flex items-center gap-2">
                                  {lesson.title}
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                    lesson.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                                    lesson.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                                    'bg-red-500/10 text-red-400 border border-red-500/20'
                                  }`}>
                                    {lesson.difficulty}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400 font-light">{lesson.description}</p>
                              </div>
                              <span className="text-xs text-gray-500 font-mono pt-1">{lesson.duration}</span>
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
      </section>

      {/* 6. Instructor Spotlight */}
      <section id="instructor" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              Meet Your Instructor
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Sarah Connor</h2>
            <p className="text-ps-blue text-sm font-semibold">Former Lead Designer at Apple & Netflix</p>
            <p className="text-gray-400 font-light leading-relaxed">
              "Over my 15-year career in tech, I have shaped interfaces, digital campaigns, and movie assets viewed by millions. In this course, I strip away the complex academic jargon and show you the exact, highly efficient workflows used by top industry professionals."
            </p>
            
            <div className="grid grid-cols-3 gap-4 border-t border-card-border pt-6">
              <div>
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-xs text-gray-500 font-medium">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-xs text-gray-500 font-medium">Students Taught</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-gray-500 font-medium">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="bg-dark-gray border-y border-card-border">
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">What Our Students Accomplished</h2>
            <p className="text-gray-400 font-light">See how our graduates upgraded their careers and design contracts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {mockTestimonials.map((t) => (
              <div key={t.id} className="glass-card p-6 rounded-2xl flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-sm text-gray-300 font-light leading-relaxed">"{t.review}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-card-border" />
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-ps-blue">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Subscription Plans */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center space-y-16">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 font-light">
            Subscribe once and unlock full access to lessons, project files, design shorts, and updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto text-left">
          {/* Monthly Plan */}
          <div className="glass-card p-8 rounded-3xl flex flex-col justify-between border-card-border bg-[#0B0B0C]">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Monthly Plan</h3>
                <p className="text-xs text-gray-500 mt-1">Best for testing out the curriculum</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$29</span>
                <span className="text-sm text-gray-500 font-medium">/ month</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Access to all 8 modules</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Downloadable PSD resources</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Mobile dashboard access</li>
                <li className="flex items-center gap-2 text-gray-500"><Lock size={12} /> No Discord access</li>
              </ul>
            </div>
            <button 
              onClick={() => setCheckoutPlan('monthly')}
              className="w-full mt-8 py-3 px-4 text-center text-sm font-semibold border border-card-border text-white hover:bg-white/5 rounded-full transition-colors"
            >
              Choose Monthly
            </button>
          </div>

          {/* Lifetime Access Plan (Highlighted) */}
          <div className="glass-card p-8 rounded-3xl flex flex-col justify-between border-ps-blue/40 bg-gradient-to-b from-[#121214] to-black relative shadow-2xl ps-glow">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-ps-blue text-black text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-lg">
              Best Value
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Lifetime Access <Sparkles size={16} className="text-ps-blue" />
                </h3>
                <p className="text-xs text-ps-blue mt-1">Pay once, own forever</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-white">$399</span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">One Time</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Access to all 8 modules</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Downloadable PSD resources</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Design hacks & Shorts feed</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> VIP Designer Discord access</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> All future updates included</li>
              </ul>
            </div>
            <button 
              onClick={() => setCheckoutPlan('lifetime')}
              className="w-full mt-8 py-3.5 px-4 text-center text-sm font-bold bg-ps-blue hover:bg-ps-blue/90 text-white rounded-full transition-colors shadow-lg shadow-ps-blue/20"
            >
              Get Lifetime Access
            </button>
          </div>

          {/* Yearly Plan */}
          <div className="glass-card p-8 rounded-3xl flex flex-col justify-between border-card-border bg-[#0B0B0C]">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Yearly Plan</h3>
                <p className="text-xs text-gray-500 mt-1">Ideal for serious designers</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$199</span>
                <span className="text-sm text-gray-500 font-medium">/ year</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Access to all 8 modules</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Downloadable PSD resources</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Design hacks & Shorts feed</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-ps-blue" /> Student Discord access</li>
              </ul>
            </div>
            <button 
              onClick={() => setCheckoutPlan('yearly')}
              className="w-full mt-8 py-3 px-4 text-center text-sm font-semibold border border-card-border text-white hover:bg-white/5 rounded-full transition-colors"
            >
              Choose Yearly
            </button>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20 md:py-28 space-y-12">
        <h2 className="text-3xl font-extrabold text-white tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-xl overflow-hidden">
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
                    <div className="p-5 pt-0 text-sm text-gray-400 font-light leading-relaxed border-t border-card-border/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Premium Footer */}
      <footer className="border-t border-card-border bg-black py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-ps-blue flex items-center justify-center font-bold text-white text-sm">
                Ps
              </div>
              <span className="font-semibold text-white">Mastery</span>
            </div>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Premium learning experiences built for professional visual educators and graphic designers globally.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-4">Courses</div>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              <li><a href="#curriculum" className="hover:text-white transition-colors">Photoshop Basics</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Retouching Masterclass</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Social Media Designs</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Advanced Compositing</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-4">Resources</div>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              <li><a href="#why-learn" className="hover:text-white transition-colors">PSD Projects</a></li>
              <li><a href="#why-learn" className="hover:text-white transition-colors">Custom Brushes</a></li>
              <li><a href="#why-learn" className="hover:text-white transition-colors">Design Tips</a></li>
              <li><a href="#why-learn" className="hover:text-white transition-colors">Community Forum</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-4">Legal</div>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
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
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-card-border bg-[#0B0B0C] shadow-2xl">
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
          </div>
        </div>
      )}

      {/* --- MODAL 2: Credit Card Checkout Simulator --- */}
      {checkoutPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-card bg-[#0B0B0C] p-6 rounded-2xl shadow-2xl space-y-6 relative"
          >
            <button 
              onClick={() => setCheckoutPlan(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="space-y-1 text-center">
              <CreditCard className="mx-auto text-ps-blue mb-2" size={32} />
              <h3 className="text-lg font-bold text-white">Stripe Secure Checkout</h3>
              <p className="text-xs text-gray-400">
                Purchasing <span className="text-ps-blue font-semibold">{checkoutPlan.toUpperCase()} ACCESS</span>
              </p>
            </div>

            {checkoutSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="mx-auto text-green-500" size={48} />
                <div className="text-sm font-bold text-white">Payment Successful!</div>
                <div className="text-xs text-gray-400">Unlocking your designer dashboard...</div>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Name on Card</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Alex Mercer"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue"
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
                    className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue"
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
                      className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue text-center"
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
                      className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue text-center"
                    />
                  </div>
                </div>

                <div className="pt-2 text-center text-[10px] text-gray-500 flex items-center justify-center gap-1.5">
                  <Shield size={10} /> Fully encrypted mock payment session.
                </div>

                <button 
                  type="submit"
                  disabled={isProcessingCheckout}
                  className="w-full py-3 bg-ps-blue hover:bg-ps-blue/90 text-white rounded-full font-semibold transition-all shadow-lg shadow-ps-blue/20 flex items-center justify-center gap-2"
                >
                  {isProcessingCheckout ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

      {/* --- MODAL 3: Student/Admin Login Simulator --- */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm glass-card bg-[#0B0B0C] p-6 rounded-2xl shadow-2xl relative space-y-6"
          >
            <button 
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="space-y-1 text-center">
              <div className="w-12 h-12 rounded-xl bg-ps-blue flex items-center justify-center text-white font-extrabold text-2xl mx-auto shadow-lg shadow-ps-blue/30 mb-2">
                Ps
              </div>
              <h3 className="text-lg font-bold text-white">Log in to PS Mastery</h3>
              <p className="text-xs text-gray-400">Unlock your learning path</p>
            </div>

            <form onSubmit={handleQuickLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase font-bold">Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="student@psmastery.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase font-bold">Password</label>
                <input 
                  type="password" 
                  required 
                  defaultValue="12345"
                  className="w-full px-3 py-2 bg-black border border-card-border rounded-lg text-sm text-white focus:outline-none focus:border-ps-blue"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-white hover:bg-gray-200 text-black rounded-full font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Log In
              </button>

              <div className="text-center space-y-2 border-t border-card-border/50 pt-4">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Quick Demo Credentials:</div>
                <div className="flex flex-col gap-1.5 text-xs text-gray-400">
                  <div>
                    Student: <span 
                      onClick={() => setAuthEmail('student@psmastery.com')}
                      className="text-ps-blue cursor-pointer underline"
                    >
                      student@psmastery.com
                    </span>
                  </div>
                  <div>
                    Admin: <span 
                      onClick={() => setAuthEmail('admin@psmastery.com')}
                      className="text-ps-blue cursor-pointer underline"
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
    </div>
  );
}
