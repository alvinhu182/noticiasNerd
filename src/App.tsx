import React, { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  ArrowUp, 
  Check, 
  AlertTriangle, 
  Mail, 
  Flame, 
  Cpu, 
  Tv, 
  Gamepad2,
  TrendingUp,
  ChevronRight,
  Send,
  Github,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';

import { NEWS_DATABASE, CORE_VALUES } from './data';
import { NewsItem } from './types';
import { NewsCard } from './components/NewsCard';
import { ArticleModal } from './components/ArticleModal';

// Dynamically reference generated Hero image asset
const imgHero = '/src/assets/images/hero_visual_1779748369218.png';

export default function App() {
  // Persistent dark/light theme toggle setup
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Navigation & Scroll States
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter category state
  const [activeCategory, setActiveCategory] = useState<string>('TODOS');

  // Selected article for interactive modal view
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  // Track scroll position to reveal "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soft/Smooth Anchor Scroll function
  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Immediate Newsletter verification handler
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('idle');
    setNewsletterMsg('');

    if (!newsletterEmail.trim()) {
      setNewsletterStatus('error');
      setNewsletterMsg('O campo de e-mail não pode ficar vazio.');
      return;
    }

    // Standard high-fidelity email match expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setNewsletterStatus('error');
      setNewsletterMsg('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    setNewsletterStatus('success');
    setNewsletterMsg('Inscrição realizada com sucesso! Prepare sua mailbox para os melhores briefings Geek.');
    setNewsletterEmail('');
  };

  // Help map icon dynamically to prevent hardcoded issues
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Users':
        return <Users className={className} />;
      default:
        return null;
    }
  };

  // Filter database matches
  const filteredDatabase = activeCategory === 'TODOS'
    ? NEWS_DATABASE
    : NEWS_DATABASE.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-p font-sans antialiased radial-grid-bg selection:bg-brand-accent/40 selection:text-white">
      
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-brand-bg/85 backdrop-blur-lg border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Arcade Glyph styling */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent to-brand-cyan p-[1.5px] shadow-lg shadow-brand-accent/10 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-brand-bg rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-brand-accent group-hover:text-brand-cyan transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-extrabold tracking-tight text-brand-text-p leading-none">
                CORTEX<span className="text-brand-accent">GEEK</span>
              </span>
              <span className="font-mono text-[9px] text-brand-text-s tracking-widest font-semibold uppercase mt-1">
                Jornalismo de Verdade
              </span>
            </div>
          </a>

          {/* Sutil Desktop Navigation (Horizontal Layout) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-text-s">
            <a 
              href="#destaques" 
              onClick={(e) => handleAnchorClick(e, 'destaques')}
              className="hover:text-brand-accent transition-colors"
            >
              Conteúdo & Destaques
            </a>
            <a 
              href="#diferenciais" 
              onClick={(e) => handleAnchorClick(e, 'diferenciais')}
              className="hover:text-brand-accent transition-colors"
            >
              Por que Confiar?
            </a>
            <a 
              href="#newsletter" 
              onClick={(e) => handleAnchorClick(e, 'newsletter')}
              className="hover:text-brand-accent transition-colors"
            >
              Newsletter
            </a>
          </nav>

          {/* Desktop Right action elements */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text-s hover:text-brand-text-p hover:border-brand-accent/40 active:scale-95 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              aria-label="Alternar Tema"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-brand-accent" />}
            </button>
            <a 
              href="#newsletter" 
              onClick={(e) => handleAnchorClick(e, 'newsletter')}
              className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold tracking-wider text-white bg-brand-accent hover:bg-brand-accent/90 hover:shadow-lg hover:shadow-brand-accent/20 active:scale-98 transition-all duration-200 uppercase cursor-pointer"
            >
              Newsletter Semanal
            </a>
          </div>

          {/* Mobile responsive Hamb can opener */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-brand-surface border border-brand-border text-brand-text-s active:scale-95 transition-all cursor-pointer"
              aria-label="Alternar Tema"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-brand-accent" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-brand-surface border border-brand-border text-brand-text-s hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu container slider */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-brand-border bg-brand-bg overflow-hidden"
            >
              <nav className="flex flex-col gap-4 p-6 text-sm font-medium">
                <a 
                  href="#destaques" 
                  onClick={(e) => handleAnchorClick(e, 'destaques')}
                  className="hover:text-brand-accent py-1 transition-colors"
                >
                  Conteúdo & Destaques
                </a>
                <a 
                  href="#diferenciais" 
                  onClick={(e) => handleAnchorClick(e, 'diferenciais')}
                  className="hover:text-brand-accent py-1 transition-colors"
                >
                  Por que Confiar?
                </a>
                <a 
                  href="#newsletter" 
                  onClick={(e) => handleAnchorClick(e, 'newsletter')}
                  className="hover:text-brand-accent py-1 transition-colors"
                >
                  Newsletter
                </a>
                <a 
                  href="#newsletter" 
                  onClick={(e) => handleAnchorClick(e, 'newsletter')}
                  className="mt-2 w-full text-center px-4 py-3 rounded-xl text-xs font-mono font-bold uppercase text-white bg-brand-accent text-center"
                >
                  Newsletter Semanal
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[calc(100vh-80px)] xl:min-h-[75vh] flex items-center justify-center py-12 md:py-20 lg:py-24 overflow-hidden">
        {/* Subtle background glow blobs */}
        <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Main Hero texts (Col 7) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center text-center lg:text-left">
            
            {/* Tagline Indicator badge */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 text-xs font-mono font-medium text-brand-cyan uppercase tracking-widest animate-pulse">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Diga adeus ao Clickbait</span>
            </div>

            {/* Huge Headline (H1) inside Space Grotesk */}
            <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-black leading-tight tracking-tight text-brand-text-p">
              O Éden da Informação{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-pink-400 to-brand-cyan">
                Nerd & Geek
              </span>{' '}
              sem rodeios.
            </h1>

            {/* Professional Subheading */}
            <p className="text-base sm:text-lg text-brand-text-s font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Um hub independente voltado para tecnologia de hardware, análise de roteiros cinematográficos e as mecânicas mais inovadoras dos jogos. Fatos checados e livre de teorias sensacionalistas.
            </p>

            {/* High Conversion Email form field */}
            <form onSubmit={handleSubscribe} className="max-w-md w-full mx-auto lg:mx-0 space-y-3">
              <div className="relative flex p-1.5 rounded-2xl bg-[#0c0c0e]/95 border border-brand-border focus-within:border-brand-accent/60 focus-within:ring-1 focus-within:ring-brand-accent/60 transition-all duration-300">
                <div className="flex items-center pl-3.5 text-slate-600 pointer-events-none">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="Seu melhor e-mail geek..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-3 pr-2 py-2.5 bg-transparent border-none text-brand-text-p text-sm placeholder:text-slate-650 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 sm:px-8 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white font-mono font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-brand-accent/10 active:scale-97 transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  Inscrever-se
                </button>
              </div>

              {/* DOM Warning/Success feedback directly underneath */}
              <AnimatePresence mode="wait">
                {newsletterStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-400 font-mono"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>{newsletterMsg}</span>
                  </motion.div>
                )}
                {newsletterStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-green-500/10 border border-green-500/25 text-xs text-green-400 font-mono"
                  >
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{newsletterMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4 text-brand-text-s font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-brand-cyan font-bold">100%</span>
                <span>Fatos reais</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand-accent font-bold">0%</span>
                <span>Fake News</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-400 font-bold">Diário</span>
                <span>Uptimes</span>
              </div>
            </div>

          </div>

          {/* Premium Modern Visual Isometric Element (Col 5) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Rotating abstract decor elements to boost the game layout */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/10 to-brand-cyan/10 rounded-full blur-[100px]" />
            <div className="absolute -top-6 -left-6 w-16 h-16 border-t-2 border-l-2 border-brand-accent/20 rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-2 border-r-2 border-brand-cyan/20 rounded-br-xl pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-sm lg:max-w-none aspect-square bg-[#16161A] border border-brand-border rounded-2xl overflow-hidden shadow-2xl shadow-brand-accent/5"
            >
              <img
                src={imgHero}
                alt="Setup Gamer Virtual"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
              />
              
              {/* Bottom stylized futuristic caption float */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0C0C0E]/90 backdrop-blur-md border border-brand-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-bold text-brand-text-p uppercase tracking-widest">Servidor Cortex</span>
                    <span className="text-[10px] text-brand-text-s font-mono">Status: Online no ar</span>
                  </div>
                </div>
                <span className="text-brand-cyan font-mono text-[11px] font-bold">UTC-Live</span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* CORE DESTAQUES SECTION */}
      <section id="destaques" className="py-20 md:py-28 bg-brand-bg-alt border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Section header layouts */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-border">
            <div className="space-y-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-accent">
                EXPLORE DESTAQUES
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-black text-brand-text-p">
                Últimas Matérias Investigativas
              </h2>
              <p className="text-brand-text-s text-sm max-w-xl">
                O melhor do jornalismo científico, análises sérias de novos jogos de RPG e críticas independentes sobre obras de ficção.
              </p>
            </div>

            {/* Live Filter Controls inside monospace */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {['TODOS', 'GAMES', 'CINEMA & SÉRIES', 'TECNOLOGIA'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl border text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                    activeCategory === category
                      ? 'bg-brand-accent border-brand-accent text-white font-semibold'
                      : 'bg-brand-surface border-brand-border text-brand-text-s hover:text-brand-text-p hover:border-brand-accent/40'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of news cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredDatabase.map((item) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  onSelect={(selectedItem) => setSelectedArticle(selectedItem)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Prompt warning of real details */}
          <div className="mt-8 text-center text-xs text-slate-600 font-mono">
            * Clique em qualquer card de notícia para ler a matéria completa e deixar seu comentário no fórum seguro de discussões.
          </div>

        </div>
      </section>

      {/* POR QUE CONFIAR / VALORES DE MERCADO */}
      <section id="diferenciais" className="py-20 md:py-28 relative overflow-hidden">
        {/* Cool cyber grid details in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
          
          {/* Centered value heading */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-cyan">
              COMPROMISSO ÉTICO
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-brand-text-p">
              Nossa Armadura Contra o Sensacionalismo
            </h2>
            <p className="text-brand-text-s text-sm md:text-base leading-relaxed">
              O ecossistema de internet moderno e portais caóticos estão repletos de "chutes", manchetes distorcidas e clickbaits enganosos. Nosso portal prefere a qualidade à velocidade cega.
            </p>
          </div>

          {/* Value cards block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_VALUES.map((value, idx) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-cyan/30 transition-all flex flex-col space-y-5"
              >
                {/* Glowing Icon space layout */}
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan/20 group-hover:text-brand-cyan/80 transition-colors">
                  {renderIcon(value.iconName, 'w-6 h-6')}
                </div>

                <h3 className="font-display text-lg font-bold text-brand-text-p group-hover:text-brand-accent transition-colors">
                  {value.title}
                </h3>

                <p className="text-brand-text-s text-sm leading-relaxed flex-1">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Interactive Core Statement Quote */}
          <div className="p-8 rounded-2xl bg-brand-surface/70 border border-brand-border text-center max-w-3xl mx-auto space-y-4 font-mono text-xs md:text-sm text-brand-text-s leading-relaxed">
            <p className="font-light">
              "Não somos motivados pela pressa em lançar títulos inconclusivos. Nossa equipe gasta horas revisando patentes técnicas, estudando especificações lógicas e comparando relatórios oficiais antes de redigir qualquer parágrafo."
            </p>
            <span className="block text-brand-cyan font-bold uppercase tracking-wider text-xs">
              — Conselho de Redação Cortex Geek
            </span>
          </div>

        </div>
      </section>

      {/* BOTTOM INTEGRATED LANDING PAGE CONVERSION BANNER (NEWSLETTER FIELD) */}
      <section id="newsletter" className="py-16 md:py-24 bg-brand-bg border-t border-brand-border relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl bg-brand-surface border border-brand-border p-8 md:p-12 lg:p-16 overflow-hidden shadow-2xl">
            {/* Background elements layout */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs font-bold text-brand-accent uppercase tracking-widest">
                  ASSINE NOSSO BRIEFING SEMANAL
                </span>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-brand-text-p leading-tight">
                  Junte-se a mais de <span className="text-brand-cyan">45 mil leitores</span> exigentes.
                </h2>
                <p className="text-brand-text-s text-sm leading-relaxed md:max-w-xl">
                  Receba todo sábado pela manhã uma curadoria filtrada do que mais importou no mundo dos games, espaço sideral, IA e ficção científica. Sem spam e sem enrolação.
                </p>
              </div>

              <div className="lg:col-span-5 w-full">
                {/* Lower Action Newsletter fields */}
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Coloque seu melhor e-mail aqui"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl text-brand-text-p text-sm placeholder:text-slate-650 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3.5 bg-brand-accent hover:bg-brand-accent/90 text-white font-mono font-semibold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-brand-accent/20 transition-all duration-200 whitespace-nowrap cursor-pointer"
                    >
                      Inscrever-me
                    </button>
                  </div>

                  {/* DOM Feedback space inside low form */}
                  <AnimatePresence mode="wait">
                    {newsletterStatus === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/25 text-xs text-red-400 font-mono rounded-lg"
                      >
                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>{newsletterMsg}</span>
                      </motion.div>
                    )}
                    {newsletterStatus === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-start gap-2.5 p-3.5 bg-green-500/10 border border-green-500/25 text-xs text-green-400 font-mono rounded-lg"
                      >
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{newsletterMsg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-brand-bg-alt border-t border-brand-border text-brand-text-s py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Main info (Col 5) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-accent to-brand-cyan flex items-center justify-center p-[1px]">
                <div className="w-full h-full bg-brand-bg rounded-[7px] flex items-center justify-center">
                  <Flame className="w-4 h-4 text-brand-accent" />
                </div>
              </div>
              <span className="font-display text-lg font-extrabold tracking-tight text-brand-text-p leading-none">
                CORTEX<span className="text-brand-accent">GEEK</span>
              </span>
            </div>
            <p className="text-brand-text-s text-xs leading-relaxed max-w-sm">
              Iniciado em 2026 como resposta ao crescimento do jornalismo automatizado e mentiras virais. Focado estritamente em gerar insights reais de entretenimento e tecnologia para aficionados.
            </p>
            
            {/* Social Icons links */}
            <div className="flex items-center gap-4 text-slate-600">
              <a href="#" className="hover:text-brand-accent transition-colors" aria-label="Github Repo">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-brand-accent transition-colors" aria-label="Twitter Profile">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-brand-accent transition-colors" aria-label="Instagram Page">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-brand-accent transition-colors" aria-label="Youtube Channel">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links block (Col 3) */}
          <div className="md:col-span-3 space-y-4 font-mono text-xs">
            <h4 className="text-brand-text-p font-bold uppercase tracking-wider">Conteúdo</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#destaques" onClick={(e) => handleAnchorClick(e, 'destaques')} className="hover:text-brand-accent transition-colors">
                  Análises de Jogos
                </a>
              </li>
              <li>
                <a href="#destaques" onClick={(e) => handleAnchorClick(e, 'destaques')} className="hover:text-brand-accent transition-colors">
                  Artigos de Opções Sci-Fi
                </a>
              </li>
              <li>
                <a href="#destaques" onClick={(e) => handleAnchorClick(e, 'destaques')} className="hover:text-brand-accent transition-colors">
                  Crônicas Tecnológicas
                </a>
              </li>
            </ul>
          </div>

          {/* Institutionals block (Col 4) */}
          <div className="md:col-span-4 space-y-4 font-mono text-xs">
            <h4 className="text-brand-text-p font-bold uppercase tracking-wider">Transparência</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-brand-text-s">Manual de Conduta Editorial (Nerd Trust)</span>
              </li>
              <li>
                <span className="text-brand-text-s">Conselho Consultivo Contra Fake News</span>
              </li>
              <li>
                <span className="text-brand-text-s">Termos de Uso e Política de Privacidade</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Outer bottom panel */}
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-600">
          <span>
            © {new Date().getFullYear()} Cortex Geek. Todos os direitos reservados.
          </span>
          <div className="flex gap-4">
            <span>Servidor Segurado</span>
            <span>Comentários Moderados</span>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION KEY (BACK TO TOP ACTION) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-brand-accent text-white shadow-xl shadow-brand-accent/25 border border-brand-accent hover:bg-brand-accent/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Voltar para o Topo"
          >
            <ArrowUp className="w-5 h-5 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* DETAIL DRAWER / POP-UP / FULL VIEW PORT PANEL INTERACTIVITY */}
      <ArticleModal
        item={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

    </div>
  );
}
