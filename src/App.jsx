import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import boostiPage1_1x from './assets/boosti_Page_1-1x.webp';
import boostiPage1_2x from './assets/boosti_Page_1-2x.webp';
import boostiPage1Fallback from './assets/boosti_Page_1.jpg';

import boostiPage3_1x from './assets/boosti_Page_3-1x.webp';
import boostiPage3_2x from './assets/boosti_Page_3-2x.webp';
import boostiPage3Fallback from './assets/boosti_Page_3.jpg';

import regulus1x from './assets/regulus-1x.webp';
import regulus2x from './assets/regulus-2x.webp';
import regulusFallback from './assets/regulus.jpg';

import aciImage from './assets/aci.jpg';
import heroImage from './assets/hero.png';
import almaImage from './assets/alma.jpg';
import logoSvg from './assets/logo.svg';

// Strict Architectural Grid Background 
const StructuralGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none flex justify-center">
    <div className="w-full max-w-7xl h-full px-6 md:px-12 lg:px-20 xl:px-24">
      <div className="w-full h-full grid grid-cols-4 md:grid-cols-12 gap-6 lg:gap-10 opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`h-full border-l border-arch ${i >= 4 ? 'hidden md:block' : ''} ${i === 11 ? 'border-r' : ''}`}></div>
        ))}
      </div>
    </div>
  </div>
);

// Reusable Panel with Ultra-thin borders instead of shadows
const ArchitectPanel = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    className={`bg-surface border-arch transition-colors duration-300 hover:bg-surface-hover ${className}`}
  >
    {children}
  </motion.div>
);

// Premium Magnetic Cursor Component (Project Hover Only)
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isProjectHover, setIsProjectHover] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('[data-cursor="project"]')) {
        setIsProjectHover(true);
      } else {
        setIsProjectHover(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <AnimatePresence>
      {isProjectHover && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, x: mousePosition.x - 64, y: mousePosition.y - 64 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
          className="fixed top-0 left-0 w-[128px] h-[128px] rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center backdrop-blur-sm shadow-sm overflow-hidden bg-white/90 border border-black/10"
        >
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest text-center leading-tight">
            View<br />Case Study
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Navigation Bar Component
const Navbar = () => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 h-20 flex items-center justify-between px-6 md:px-12 lg:px-20 xl:px-24 bg-surface/90 backdrop-blur-md border-b border-arch z-50">
      {/* Brand Logo */}
      <div
        onClick={(e) => handleScroll(e, 'hero')}
        className="w-12 h-12 flex items-center justify-center cursor-pointer group"
      >
        <img src={logoSvg} alt="Brand Logo" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 relative z-20">
        {['Work', 'About', 'Contact'].map((item) => {
          const id = item === 'About' ? 'approach' : item.toLowerCase();
          return (
            <a
              key={item}
              href={`#${id}`}
              onClick={(e) => handleScroll(e, id)}
              className="text-sm text-muted hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              {item}
            </a>
          );
        })}
      </div>

      {/* Mobile Menu Button - simplified */}
      <div className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 border border-arch cursor-pointer group hover:bg-surface-hover transition-colors">
         <span className="w-4 h-0.5 bg-primary group-hover:w-5 transition-all"></span>
         <span className="w-5 h-0.5 bg-primary group-hover:w-4 transition-all"></span>
      </div>
    </nav>
  );
};

// Interactive System Architecture Component (Restored Aesthetic)
const SystemArchitectureDrift = () => {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false); // Pauses auto-flow on manual click

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nodesInfo = {
    'client': { cx: 200, cy: 150, label: 'What Users See', desc: 'The interface people actually interact with. Where first impressions happen.' },
    'gateway': { cx: 350, cy: 250, label: 'Traffic Control', desc: 'The bouncer at the door. Decides what gets in and what waits.' },
    'engine': { cx: 650, cy: 120, label: 'The Brain', desc: 'Where the actual thinking happens. Business rules live here.' },
    'db': { cx: 800, cy: 400, label: 'Memory', desc: 'Everything we need to remember. Fast when it matters.' },
    'worker': { cx: 500, cy: 500, label: 'Background Tasks', desc: 'The stuff that runs while you grab coffee. Emails, reports, syncs.' },
    'analytics': { cx: 250, cy: 650, label: 'Insights', desc: 'Figuring out what actually happened and why it matters.' },
    'cache': { cx: 350, cy: 250, label: 'Quick Access', desc: 'Keeping the popular stuff close. Nobody likes waiting.' },
    'auth': { cx: 650, cy: 120, label: 'Security', desc: 'Making sure you are who you say you are. No shortcuts.' },
    'queue': { cx: 800, cy: 400, label: 'Task Queue', desc: 'A polite line for things that need to happen, one at a time.' },
    'storage': { cx: 500, cy: 500, label: 'File Storage', desc: 'Photos, documents, the heavy stuff. Safe and organized.' }
  };

  const autoFlowPath = ['client', 'gateway', 'engine', 'db', 'worker', 'analytics'];
  const [flowIndex, setFlowIndex] = useState(0);

  // Auto-flow logic
  useEffect(() => {
    if (isInteracting) return;

    const currentTarget = autoFlowPath[flowIndex];

    // Fade out previous tooltip while traveling
    setActiveNodeId(null);

    // Fade in new tooltip precisely when spring animation arrives
    const arriveTimer = setTimeout(() => {
      setActiveNodeId(currentTarget);
    }, 800);

    // Proceed to next node in the cycle
    const timer = setTimeout(() => {
      setFlowIndex((prev) => (prev + 1) % autoFlowPath.length);
    }, 4000);

    return () => {
      clearTimeout(arriveTimer);
      clearTimeout(timer);
    };
  }, [flowIndex, isInteracting]);

  const handleNodeHover = (id) => {
    setIsInteracting(true);
    setActiveNodeId(id);

    // If hovered node is part of the flow, advance so when interaction ends it continues to the NEXT node
    const pathIndex = autoFlowPath.indexOf(id);
    if (pathIndex !== -1) {
      setFlowIndex((pathIndex + 1) % autoFlowPath.length);
    }
  };

  const handleNodeLeave = () => {
    setIsInteracting(false);
  };

  const activeNode = activeNodeId ? nodesInfo[activeNodeId] : null;
  const dotTarget = (isInteracting && activeNodeId) ? nodesInfo[activeNodeId] : nodesInfo[autoFlowPath[flowIndex]];

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120%] lg:w-[140%] aspect-[5/4] opacity-80 pointer-events-auto">
      <motion.svg
        className="w-full h-full origin-center"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          x: mousePosition.x * -40,
          y: mousePosition.y * -40,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        {/* Connection Lines (Blueprints) */}
        <motion.path d="M200 150 L350 250" stroke="#CCCCCC" strokeWidth="1" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -100] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
        <motion.path d="M350 250 L650 120" stroke="#E0E0E0" strokeWidth="0.5" animate={{ strokeOpacity: [0.2, 0.8, 0.2] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.path d="M650 120 L800 400" stroke="#E0E0E0" strokeWidth="0.5" />
        <motion.path d="M350 250 L500 500" stroke="#CCCCCC" strokeWidth="1.5" />
        <motion.path d="M500 500 L800 400" stroke="#CCCCCC" strokeWidth="1" strokeDasharray="2 2" animate={{ strokeDashoffset: [0, 50] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
        <motion.path d="M250 650 L500 500" stroke="#E0E0E0" strokeWidth="0.5" />
        <motion.path d="M500 500 L750 600" stroke="#CCCCCC" strokeWidth="0.5" />
        <motion.path d="M750 600 L800 400" stroke="#E0E0E0" strokeWidth="0.5" />
        <motion.path d="M200 150 L250 650" stroke="#CCCCCC" strokeWidth="0.5" strokeDasharray="8 8" />

        {/* Interactive Data Nodes (Circles) restoring framer-motion animations inside interactive groups */}
        <g onMouseEnter={() => handleNodeHover('client')} onMouseLeave={handleNodeLeave} className="cursor-pointer group">
          <circle cx="200" cy="150" r="25" fill="transparent" />
          <motion.circle cx="200" cy="150" r="4" fill="#111" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className={activeNodeId === 'client' ? "scale-[3]" : "group-hover:scale-[2] transition-all origin-center"} style={{ transformOrigin: "200px 150px" }} />
        </g>

        <g onMouseEnter={() => handleNodeHover('gateway')} onMouseLeave={handleNodeLeave} className="cursor-pointer group">
          <circle cx="350" cy="250" r="25" fill="transparent" />
          <motion.circle cx="350" cy="250" r="6" fill="#111" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className={activeNodeId === 'gateway' ? "scale-[3]" : "group-hover:scale-[2] transition-all origin-center"} style={{ transformOrigin: "350px 250px" }} />
        </g>

        <g onMouseEnter={() => handleNodeHover('engine')} onMouseLeave={handleNodeLeave} className="cursor-pointer group">
          <circle cx="650" cy="120" r="25" fill="transparent" />
          <motion.circle cx="650" cy="120" r="4" fill="#111" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }} className={activeNodeId === 'engine' ? "scale-[3]" : "group-hover:scale-[2] transition-all origin-center"} style={{ transformOrigin: "650px 120px" }} />
        </g>

        <g onMouseEnter={() => handleNodeHover('db')} onMouseLeave={handleNodeLeave} className="cursor-pointer group">
          <circle cx="800" cy="400" r="30" fill="transparent" />
          <motion.circle cx="800" cy="400" r="8" fill="#111" animate={{ opacity: [0.1, 0.6, 0.1] }} transition={{ duration: 6, repeat: Infinity, delay: 0.5 }} className={activeNodeId === 'db' ? "scale-[2]" : "group-hover:scale-[1.5] transition-all origin-center"} style={{ transformOrigin: "800px 400px" }} />
        </g>

        <g onMouseEnter={() => handleNodeHover('worker')} onMouseLeave={handleNodeLeave} className="cursor-pointer group">
          <circle cx="500" cy="500" r="25" fill="transparent" />
          <circle cx="500" cy="500" r="4" fill="#111" opacity="0.3" className={activeNodeId === 'worker' ? "scale-[3] opacity-100" : "group-hover:scale-[2] transition-all origin-center"} style={{ transformOrigin: "500px 500px" }} />
        </g>

        <g onMouseEnter={() => handleNodeHover('analytics')} onMouseLeave={handleNodeLeave} className="cursor-pointer group">
          <circle cx="250" cy="650" r="25" fill="transparent" />
          <circle cx="250" cy="650" r="5" fill="#111" opacity="0.5" className={activeNodeId === 'analytics' ? "scale-[3] opacity-100" : "group-hover:scale-[2] transition-all origin-center"} style={{ transformOrigin: "250px 650px" }} />
        </g>

        <circle cx="750" cy="600" r="4" fill="#111" opacity="0.4" />

        {/* Interactive Rotating Rectangles */}
        <g onMouseEnter={() => handleNodeHover('cache')} onMouseLeave={handleNodeLeave} className="cursor-pointer group">
          <rect x="310" y="210" width="80" height="80" fill="transparent" />
          <motion.rect x="330" y="230" width="40" height="40" stroke="#111" strokeWidth={activeNodeId === 'cache' ? "1.5" : "0.5"} fill={activeNodeId === 'cache' ? "#111" : "none"}
            animate={{ rotate: 90, x: mousePosition.x * 20, y: mousePosition.y * 20 }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, x: { type: "spring", stiffness: 40 }, y: { type: "spring", stiffness: 40 } }}
            className="group-hover:stroke-[2px] transition-all" style={{ originX: "350px", originY: "250px" }} />
        </g>

        <g onMouseEnter={() => handleNodeHover('storage')} onMouseLeave={handleNodeLeave} className="cursor-pointer group">
          <rect x="440" y="460" width="120" height="80" fill="transparent" />
          <rect x="470" y="480" width="60" height="40" stroke="#111" strokeWidth="1" fill={activeNodeId === 'storage' ? "#111" : "#fff"} opacity="0.8" className="group-hover:stroke-[2px] transition-all duration-300" />
        </g>

        <g onMouseEnter={() => handleNodeHover('queue')} onMouseLeave={handleNodeLeave} className="cursor-pointer group">
          <rect x="760" y="360" width="80" height="80" fill="transparent" />
          <rect x="780" y="380" width="40" height="40" rx="20" stroke="#111" strokeWidth="0.5" fill={activeNodeId === 'queue' ? "#111" : "none"} className="group-hover:stroke-[2px] transition-all duration-300" />
        </g>

        <g onMouseEnter={() => handleNodeHover('auth')} onMouseLeave={handleNodeLeave} className="cursor-pointer group">
          <rect x="610" y="80" width="80" height="80" fill="transparent" />
          <motion.rect x="630" y="100" width="40" height="40" stroke="#E0E0E0" strokeWidth="1" fill={activeNodeId === 'auth' ? "#E0E0E0" : "none"}
            animate={{ rotate: -90, x: mousePosition.x * -30, y: mousePosition.y * -30 }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, x: { type: "spring", stiffness: 40 }, y: { type: "spring", stiffness: 40 } }}
            className="group-hover:stroke-[2px] transition-all" style={{ originX: "650px", originY: "120px" }} />
        </g>

        {/* Dynamic Data Flowing Dot (Synchronized) */}
        <motion.circle
          r="4"
          fill="#39FF14"
          style={{ filter: 'drop-shadow(0 0 6px rgba(57,255,20,0.8))' }}
          animate={{ 
            cx: dotTarget.cx, 
            cy: dotTarget.cy,
            opacity: isInteracting ? 0 : 1
          }}
          transition={{ 
            cx: { type: "spring", stiffness: 30, damping: 15 },
            cy: { type: "spring", stiffness: 30, damping: 15 },
            opacity: { duration: 0.2 }
          }}
          className="pointer-events-none"
        />
      </motion.svg>

      {/* Info Popover overlaid on HTML layer locked to aspect-[5/4] */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x * -40,
              y: mousePosition.y * -40
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              default: { type: "spring", stiffness: 50, damping: 20 },
              opacity: { duration: 0.2 }
            }}
            className="absolute z-50 pointer-events-none flex"
            style={{
              left: activeNode.cx >= 400 ? 'calc(50vw - 2rem)' : `${activeNode.cx / 10}%`,
              top: `${activeNode.cy / 8}%`
            }}
          >
            <div className={`bg-[#fafafa] p-6 border border-arch shadow-2xl w-[280px] md:w-[340px] flex flex-col justify-center absolute bottom-0 mb-6 ${
              activeNode.cx >= 400 ? "-translate-x-full" : "-translate-x-1/2"
            }`}>
              <div className="text-[10px] font-bold text-[#121212] opacity-70 uppercase tracking-widest mb-3 border-b border-arch pb-2">
                Node // {activeNodeId.toUpperCase()}
              </div>
              <h4 className="text-base font-bold text-[#121212] tracking-tight mb-2">
                {activeNode.label}
              </h4>
              <p className="text-xs text-[#121212] opacity-80 font-medium leading-relaxed whitespace-normal break-words">
                {activeNode.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Live Thinking Widget: Terminal Snippet / Digital Sticky Note
const LiveThinkingWidget = () => {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' LOCAL');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="p-5 border border-arch bg-surface/40 backdrop-blur-md w-full relative group transition-colors hover:bg-surface-hover hover:border-border/50 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-3 border-b border-arch pb-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-70"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14] shadow-[0_0_8px_#39FF14]"></span>
        </span>
        <span className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold">
          Live Log // {timeStr}
        </span>
      </div>
      <div className="font-mono text-xs md:text-sm text-primary leading-relaxed flex flex-col gap-1">
        <span className="text-muted uppercase tracking-widest text-[9px] font-bold">What I'm working on:</span>
        <p className="font-medium tracking-tight mt-1">
          Building AI tools that understand context before writing code. Also obsessing over animation performance. <span className="animate-pulse">_</span>
        </p>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 250]); // Extra parallax output for the system drift
  const yFloat = useTransform(scrollY, [0, 1000], [0, -100]); // Antigravity float for the image

  return (
    <section id="hero" className="min-h-[85vh] flex flex-col justify-center pt-20 pb-0 relative z-10 border-b border-arch">

      {/* Main Content Area */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 relative z-10 items-center">

        {/* Left: Text Content */}
        <div className="lg:col-span-7 xl:col-span-7">
          <motion.div className="pr-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-4 py-2 border border-arch bg-surface/80 backdrop-blur-md mb-8 uppercase"
            >
              <span className="w-2 h-2 bg-primary"></span>
              <span className="text-[10px] font-bold text-primary tracking-widest">Available for new projects</span>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, ease: "easeOut" }
                }
              }}
              className="mb-8 relative max-w-4xl group flex items-center"
            >
              {/* Text Content */}
              <div className="relative z-30">
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-primary">
                  {"I'm Ronen. I build products that work beautifully — and actually ship.".split(" ").map((word, i) => (
                    <motion.span 
                      key={i}
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                      }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </h1>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-wrap gap-4 font-mono text-sm uppercase tracking-widest relative z-20 mt-12 mb-8"
            >
              <a
                href="#systems"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-primary text-surface px-8 py-4 transition-colors hover:bg-muted flex items-center gap-2"
              >
                See how I think <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-primary bg-surface/80 backdrop-blur-md px-8 py-4 border border-arch transition-colors hover:bg-surface-hover hover:border-border"
              >
                Recent work
              </a>
            </motion.div>

          </motion.div>
        </div>

        {/* Right: Illustration */}
        <div className="lg:col-span-5 xl:col-span-5 hidden lg:flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-md"
          >
            <img 
              src="/images/ronen-illustration.jpg" 
              alt="Ronen illustration" 
              className="w-full h-auto"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

// Separated Component for Quote & Live Log
const EthosTelemetrySection = () => {
  return (
    <section className="w-full py-12 lg:py-16 border-b border-arch relative z-10">
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 pointer-events-auto relative z-20">

        {/* Left: Typing Quote */}
        <div className="max-w-[480px] px-4 py-3">
          <p className="font-mono text-primary leading-relaxed text-base lg:text-lg uppercase tracking-wider">
            {Array.from("Most projects fail because").map((char, index) => (
              <motion.span
                key={`l1-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.2 + index * 0.04 }}
                className="bg-surface/90 backdrop-blur-sm"
              >
                {char}
              </motion.span>
            ))}
            <br />
            {Array.from("someone skipped the hard questions.").map((char, index) => (
              <motion.span
                key={`l2-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 1.5 + index * 0.04 }}
                className="bg-surface/90 backdrop-blur-sm"
              >
                {char}
              </motion.span>
            ))}
          </p>
        </div>

        {/* Right: Live Log Widget */}
        <div className="w-full max-w-sm">
          <LiveThinkingWidget />
        </div>

      </div>
    </section>
  );
};

const SkillsSection = () => {
  const capabilities = [
    { title: "Product Strategy", desc: "I figure out what to build before writing code. Sounds obvious, but most skip this.", num: "01" },
    { title: "Full-Stack Development", desc: "React, Node, databases, deployment. The whole thing from idea to production.", num: "02" },
    { title: "Design Systems", desc: "Consistent components, clear patterns. Makes future work faster, not slower.", num: "03" }
  ];

  return (
    <section id="systems" className="py-24 relative z-10 bg-white -mx-6 md:-mx-12 lg:-mx-20 xl:-mx-24 px-6 md:px-12 lg:px-20 xl:px-24">
      <div className="mb-16">
        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">What I do</span>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 mt-2">Skills</h2>
      </div>

      <div className="grid grid-cols-1 border-t border-neutral-200">
        {capabilities.map((cap, idx) => (
          <ArchitectPanel key={idx} delay={idx * 0.1} className="py-10 border-b border-neutral-200 grid grid-cols-4 md:grid-cols-12 gap-6 lg:gap-10 items-start group hover:bg-neutral-50">
            <div className="col-span-1 font-mono text-xs text-neutral-400">/{cap.num}</div>
            <div className="col-span-3 md:col-span-4">
              <h3 className="text-lg md:text-xl font-semibold text-neutral-900 tracking-tight">{cap.title}</h3>
            </div>
            <div className="col-span-4 md:col-span-7">
              <p className="text-neutral-600 leading-relaxed">
                {cap.desc}
              </p>
            </div>
          </ArchitectPanel>
        ))}
      </div>
    </section>
  );
};

const BentoCard = ({ project, idx, onClick }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isViewTwo, setIsViewTwo] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY / rect.height) - 0.5) * -10;
    const rotateY = ((mouseX / rect.width) - 0.5) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const isBoosty = project.id === 'boosty';
  const isOrganic = project.type === 'organic';

  const radiusClass = "rounded-none";
  const borderClass = isOrganic ? "border border-border/40" : "border border-arch";
  const shadowClass = isOrganic ? "shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)]" : "shadow-none hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]";

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
      className={`${project.span} relative w-full ${isBoosty ? "aspect-[3840/1984]" : "h-auto"}`}
      style={{ perspective: "1500px" }}
    >
      <motion.div
        layoutId={`card-content-${project.id}`}
        onClick={() => onClick(project)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotation({ x: 0, y: 0 })}
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        whileTap={{ scale: 1.02, zIndex: 50 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`w-full h-full overflow-hidden relative group cursor-pointer md:cursor-none bg-surface transition-all duration-500 ease-out ${radiusClass} ${borderClass} ${shadowClass}`}
        style={{ transformStyle: "preserve-3d" }}
        data-cursor="project"
      >
        {isBoosty ? (
          <div className="absolute inset-0 w-full h-full bg-[#fcfcfc] overflow-hidden">

            {/* Stacked Gallery Sliding Container */}
            <motion.div
              animate={{ x: isViewTwo ? "-50%" : "0%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-[200%] h-full flex"
            >
              {/* View 1: Dashboard */}
              <div className="w-1/2 h-full relative border-r border-arch bg-[#f8f9fa] flex items-center justify-center overflow-hidden">
                <picture className="absolute inset-0 opacity-90 group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out flex">
                  <source type="image/webp" srcSet={`${boostiPage1_1x} 1x, ${boostiPage1_2x} 2x`} />
                  <img src={boostiPage1Fallback} alt="Boosti Dashboard" className="w-full h-full object-cover object-top" loading="lazy" />
                </picture>
              </div>
              {/* View 2: Task Management */}
              <div className="w-1/2 h-full relative bg-[#f1f3f5] flex items-center justify-center overflow-hidden">
                <picture className="absolute inset-0 group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out flex">
                  <source type="image/webp" srcSet={`${boostiPage3_1x} 1x, ${boostiPage3_2x} 2x`} />
                  <img src={boostiPage3Fallback} alt="Boosti Task Management" className="w-full h-full object-cover object-center" loading="lazy" />
                </picture>
              </div>

            </motion.div>

            {/* Glassmorphism View Toggle Button */}
            <div className="absolute top-8 right-8 z-30 font-sans" style={{ transform: "translateZ(70px)" }} onClick={(e) => { e.stopPropagation(); setIsViewTwo(!isViewTwo); }}>
              <button className="bg-white/70 backdrop-blur-md hover:bg-white text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg border border-white/40 transition-all flex items-center gap-2">
                <span>{isViewTwo ? '← View Dashboard' : 'View Operations →'}</span>
              </button>
            </div>

            {/* Floating Dynamic Label based on View */}
            <div className="absolute top-8 left-8 z-30" style={{ transform: "translateZ(60px)" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isViewTwo ? 'op' : 'strat'}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-black/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md"
                >
                  {isViewTwo ? 'Operational Logic & Automation' : 'Strategic Business Intelligence'}
                </motion.div>
              </AnimatePresence>
            </div>



            {/* Fading Metrics Overlay (Only on View 1 for clarity) */}
            <div className={`absolute inset-0 flex items-end justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 p-8 pointer-events-none ${isViewTwo ? 'hidden' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full" style={{ transform: "translateZ(60px)" }}>
                {[
                  { title: "Strategy", desc: "Helped make sense of messy restaurant data." },
                  { title: "Design", desc: "Clean dashboard built for Hebrew users." },
                  { title: "AI Features", desc: "Built-in assistant that actually helps day-to-day." }
                ].map((metric, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i + 0.1 }}
                    key={i}
                    className="bg-white/95 backdrop-blur-xl p-5 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-none relative" // Sharp corners for technical feel
                  >
                    <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 border-b border-arch pb-2">{metric.title}</h4>
                    <p className="text-xs text-muted font-medium leading-relaxed">{metric.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : project.id === "regulus" ? (
          <div className="w-full h-full bg-[#1e2025] flex flex-col overflow-hidden">
            {/* Background Image Container with fixed 19/10 aspect ratio */}
            <div className="relative w-full aspect-[19/10] bg-[#1e2025] overflow-hidden shrink-0">
              <picture className="absolute inset-0 group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out flex">
                <source type="image/webp" srcSet={`${regulus1x} 1x, ${regulus2x} 2x`} />
                <img src={regulusFallback} alt="Regulus Core Interface" className="w-full h-full object-cover object-top" loading="lazy" />
              </picture>
            </div>

            {/* Lower Text Box Container */}
            <div className="w-full shrink-0 bg-surface flex flex-col justify-center border-t border-arch p-8 relative z-20">
              <div className="mb-2 text-[12px] font-bold text-primary uppercase tracking-[0.2em]">{project.tag}</div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-primary uppercase">{project.title}</h3>
            </div>
          </div>
        ) : project.id === "padel" ? (
          <div className="w-full h-full bg-[#1e2025] flex flex-col overflow-hidden">
            {/* Background Image Container with fixed 19/10 aspect ratio */}
            <div className="relative w-full aspect-[19/10] bg-[#1e2025] overflow-hidden shrink-0">
              <picture className="absolute inset-0 group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out flex">
                <img src={aciImage} alt={project.title} className="w-full h-full object-cover object-top" loading="lazy" />
              </picture>
            </div>

            {/* Lower Text Box Container */}
            <div className="w-full shrink-0 bg-surface flex flex-col justify-center border-t border-arch p-8 relative z-20">
              <div className="mb-2 text-[12px] font-bold text-primary uppercase tracking-[0.2em]">{project.tag}</div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-primary uppercase">{project.title}</h3>
            </div>
          </div>
        ) : project.id === "alma" ? (
          <div className="w-full h-full bg-[#1e2025] flex flex-col overflow-hidden">
            <div className="relative w-full aspect-[19/10] bg-[#1e2025] overflow-hidden shrink-0">
              <picture className="absolute inset-0 group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out flex">
                <img src={almaImage} alt={project.title} className="w-full h-full object-cover object-top" loading="lazy" />
              </picture>
            </div>
            <div className="w-full shrink-0 bg-surface flex flex-col justify-center border-t border-arch p-8 relative z-20">
              <div className="mb-2 text-[12px] font-bold text-primary uppercase tracking-[0.2em]">{project.tag}</div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-primary uppercase">{project.title}</h3>
            </div>
          </div>
        ) : (
          /* Default Project Placeholder Graphic */
          <div className="absolute inset-0 bg-surface-hover flex items-center justify-center opacity-80 group-hover:scale-[1.03] transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            <svg className="w-16 h-16 text-muted/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        )}

        {/* 3D Floating Content Overlay (Hidden on custom interior layouts like Boosty and Regulus) */}
        {!isBoosty && project.id !== 'regulus' && (
          <div
            style={{ transform: "translateZ(50px)" }}
            className={`absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none rounded-none`}
          >
            <div className="mb-4 self-start bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{project.tag}</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-white uppercase drop-shadow-md">{project.title}</h3>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const WorkSection = ({ onProjectClick }) => {
  const projects = [
    { title: "Boosty (BoostAI)", id: "boosty", tag: "AI Product", type: "technical", span: "col-span-1 md:col-span-12" },
    { title: "Regulus Core", id: "regulus", tag: "Full-Stack Dev", type: "technical", span: "col-span-1 md:col-span-6 row-span-1" },
    { title: "Padel Tel Aviv", id: "padel", tag: "Web Design", type: "organic", span: "col-span-1 md:col-span-6 row-span-1" },
    { title: "Alma Network", id: "alma", tag: "Community App", type: "organic", span: "col-span-1 md:col-span-5 row-span-1" },
    { title: "Ethereal Builder", id: "ethereal", tag: "Design System", type: "technical", span: "col-span-1 md:col-span-7 row-span-1" }
  ];

  return (
    <section id="work" className="py-32 relative z-10 border-b border-arch overflow-hidden">
      <div className="mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-primary uppercase">Recent Work</h2>
        <span className="font-mono text-xs text-muted uppercase tracking-widest">Selected Works / Bento</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        {projects.map((project, idx) => (
          <BentoCard key={idx} project={project} idx={idx} onClick={onProjectClick} />
        ))}
      </div>
    </section>
  );
};

const ApproachSection = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Shift from white to a pale warm cream
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ["#ffffff", "#FAF8F5"]
  );

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor }}
      id="approach"
      className="py-32 relative z-10 border-b border-arch mx-[-1.5rem] px-6 md:mx-[-3rem] md:px-12 lg:mx-[-5rem] lg:px-20 xl:mx-[-6rem] xl:px-24 mb-16"
    >
      <div className="max-w-4xl flex flex-col gap-16 py-10 md:py-16">
        <div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 block opacity-70">The Approach</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-primary uppercase leading-tight">
            Philosophy <br className="hidden md:block" /> & Execution
          </h2>
        </div>

        <div className="space-y-16">
          <p className="text-2xl md:text-3xl lg:text-4xl leading-tight font-medium tracking-tight text-primary/95">
            I write code like I'm going to maintain it at 2am after three coffees. Clear names. Obvious structure. No clever tricks that'll confuse future-me.
          </p>

          <p className="text-2xl md:text-3xl lg:text-4xl leading-tight font-medium tracking-tight text-primary/95">
            Everyone wants "AI-ready" systems. Most just bolt an API onto spaghetti code and call it done. Real AI-readiness means clean data, clear pipelines, and architecture that makes sense to both humans and machines.
          </p>

          <p className="text-2xl md:text-3xl lg:text-4xl leading-tight font-medium tracking-tight text-primary/95">
            Design isn't decoration. If something looks like an afterthought, people treat it like one. Good interfaces earn trust before users even click anything.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

const CapabilitiesSection = () => {
  const capabilities = [
    { title: "Strict Typography", desc: "Precise hierarchical scale using Geist/Inter, driven by negative space." },
    { title: "Rigorous Grids", desc: "Mathematical layouts honoring absolute alignment over decorative trends." }
  ];

  return (
    <section id="capabilities" className="py-32 relative z-10">
      <div className="mb-20">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-primary uppercase">Methodology</h2>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-12 gap-6 lg:gap-10 border-t border-arch pt-12">
        {capabilities.map((cap, idx) => (
          <div key={idx} className="col-span-4 md:col-span-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-primary tracking-tight uppercase border-l-2 border-primary pl-4">{cap.title}</h3>
            <p className="text-muted leading-relaxed font-medium pl-4 max-w-md">
              {cap.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Fluid Expansion Modal Component
const ProjectExpandedModal = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#F9F9F9]/80 backdrop-blur-[10px] pointer-events-auto"
            onClick={onClose}
          />

          {/* Expanded Modal Content bound by layoutId */}
          <motion.div
            layoutId={`card-container-${project.id}`}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full max-w-5xl h-[80vh] relative z-[110] pointer-events-auto shadow-2xl overflow-hidden flex flex-col md:flex-row mx-4"
          >
            <motion.div
              layoutId={`card-content-${project.id}`}
              className="w-full h-full bg-surface border-arch flex flex-col md:flex-row overflow-hidden absolute inset-0 rounded-xl border" // Added border/rounded for modal look
            >
              {/* Left Side: Mock Image Area mirroring the original card feel */}
              <div className="md:w-1/2 h-1/2 md:h-full bg-[#1e2025] relative overflow-hidden flex-shrink-0">
                {project.id === "boosty" ? (
                  <img src={boostiPage1Fallback} alt={project.title} className="w-full h-full object-cover" />
                ) : project.id === "regulus" ? (
                  <img src={regulusFallback} alt={project.title} className="w-full h-full object-cover object-top" />
                ) : project.id === "padel" ? (
                  <img src={aciImage} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-surface-hover flex items-center justify-center opacity-80">
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                  </div>
                )}
              </div>

              {/* Right Side: High-end Typography Content Area */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="md:w-1/2 p-8 lg:p-12 flex flex-col bg-surface overflow-y-auto"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{project.tag}</span>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 -mt-2 -mr-2 flex items-center justify-center text-muted hover:text-primary transition-colors group cursor-pointer border border-transparent hover:border-arch rounded-full bg-surface"
                    aria-label="Close modal"
                  >
                    <span className="text-xl leading-none font-light group-hover:rotate-90 transition-transform duration-300">✕</span>
                  </button>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-primary uppercase mb-12">{project.title}</h2>

                <div className="space-y-10 flex-1">
                  <div className="border-t border-arch pt-6">
                    <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-4 opacity-70">Planning</h3>
                    <p className="text-muted leading-relaxed font-medium md:text-lg">
                      I map out the system before touching code. What data flows where? What breaks if X changes? Getting this right early saves weeks of refactoring later.
                    </p>
                  </div>
                  <div className="border-t border-arch pt-6">
                    <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-4 opacity-70">Building</h3>
                    <p className="text-muted leading-relaxed font-medium md:text-lg">
                      Clean grids. Consistent spacing. Animations that feel natural, not decorative. Every detail matters when someone uses this thing daily.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative z-10 border-t border-arch mx-[-1.5rem] px-6 md:mx-[-3rem] md:px-12 lg:mx-[-5rem] lg:px-20 xl:mx-[-6rem] xl:px-24 mb-16">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center pt-24 pb-12">
        <h2 className="text-[2.5rem] sm:text-5xl md:text-7xl lg:text-[7.5rem] font-serif tracking-tighter text-primary leading-none mb-10 w-full text-center" style={{ fontFamily: 'Georgia, serif' }}>
          hello@ronen.com
        </h2>
        
        <form className="w-full max-w-4xl flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="relative flex-1">
              <select className="w-full appearance-none bg-transparent border border-primary/40 rounded-full px-6 py-4 text-primary outline-none focus:border-primary transition-colors cursor-pointer text-sm">
                <option value="consulting">Consulting</option>
                <option value="design">Design</option>
                <option value="dev">Development</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/60">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
            </div>
            <input type="text" placeholder="Your name" className="flex-1 bg-transparent border border-primary/40 rounded-full px-6 py-4 text-primary outline-none focus:border-primary transition-colors placeholder:text-primary/60 text-sm" />
            <input type="email" placeholder="Your email" className="flex-[1.5] bg-transparent border border-primary/40 rounded-full px-6 py-4 text-primary outline-none focus:border-primary transition-colors placeholder:text-primary/60 text-sm" />
          </div>

          <div className="relative w-full">
            <input type="text" placeholder="How may I help you?" className="w-full bg-transparent border border-primary/40 rounded-full pl-6 pr-16 py-4 text-primary outline-none focus:border-primary transition-colors placeholder:text-primary/60 text-sm" />
            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 w-[34px] h-[34px] bg-primary rounded-full flex items-center justify-center text-surface hover:bg-primary/90 transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 items-start">
            {['LinkedIn', 'Twitter', 'Facebook'].map(social => (
              <a key={social} href="#" className="flex items-center gap-2 bg-[#5B7B4B] text-white px-5 py-2.5 rounded-full hover:bg-[#4a633d] transition-colors text-xs font-light tracking-wide">
                {social}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-surface text-primary selection:bg-primary selection:text-surface flex flex-col relative cursor-none md:cursor-auto font-sans font-medium overflow-x-hidden">
      <StructuralGrid />
      <CustomCursor />
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-24">
          <HeroSection />
          <SkillsSection />
          <WorkSection onProjectClick={setSelectedProject} />
          <ApproachSection />
          <CapabilitiesSection />
          <ContactSection />

          {/* Footer */}
          <div className="h-24 border-t border-arch flex items-center justify-between text-sm text-muted">
            <span>© 2026 Ronen</span>
            <span>Tel Aviv</span>
          </div>
        </div>
      </main>

      {/* Global Modals / SlideOvers */}
      <ProjectExpandedModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
