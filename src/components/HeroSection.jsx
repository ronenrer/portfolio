import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-6">
      {/* 3D Structure & Holographic Elements (Simulated with Framer Motion and CSS) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        
        {/* Partially dissolved 3D structure (Abstract representation) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateX: 60, rotateZ: -45 }}
          animate={{ opacity: 1, scale: 1, rotateX: 55, rotateZ: -30 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-96 h-96 border-2 border-sapir-blue-light/50 border-r-sapir-blue rounded-lg absolute"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Internal floating elements representing self-assembly */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-sapir-blue-light/20 border border-glass-border backdrop-blur-md"
          />
          <motion.div 
            animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-48 h-24 bg-sapir-blue/30 border border-gold/30 backdrop-blur-lg"
          />
        </motion.div>

        {/* Delicate holographic control panels */}
        <motion.div
           animate={{ y: [-5, 5, -5], opacity: [0.5, 0.8, 0.5] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-32 right-[10%] glass-panel rounded-md p-4 text-xs font-mono text-gold-light/70 tracking-wider"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-safety-orange animate-pulse" />
            SYS.INIT // CORE
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-gold-light/50 to-transparent mb-2" />
          COORD: 32.0853° N, 34.7818° E
        </motion.div>

        <motion.div
           animate={{ y: [5, -5, 5], opacity: [0.4, 0.7, 0.4] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
           className="absolute bottom-40 left-[15%] glass-panel rounded-md p-3 text-xs font-mono text-sapir-blue-light tracking-wider"
        >
           <div className="flex flex-col gap-1">
             <div className="h-1 w-16 bg-sapir-blue-light/80 rounded" />
             <div className="h-1 w-10 bg-sapir-blue-light/50 rounded" />
             <div className="h-1 w-12 bg-sapir-blue-light/30 rounded" />
           </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Logo or Gold Accent Line */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 p-3 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-sm"
        >
          <svg className="w-12 h-12 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white text-glow leading-tight mb-6"
        >
          ספיר הנדסה: בונים איכות <br className="hidden md:block" /> על יסודות של מצוינות
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 font-light mb-12 max-w-2xl text-center"
        >
          מומחיות בתכנון, ניהול וביצוע עבודות בנייה וגמר.
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-safety-orange text-white font-bold text-lg rounded-full neon-accent transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          <span className="relative z-10">תיאום פגישת ייעוץ</span>
          <div className="absolute inset-0 h-full w-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
