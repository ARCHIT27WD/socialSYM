import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

const HeroSection = () => {
  const scrollToEnquiry = () => {
    document.getElementById('long-videos-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.15) 0%, rgba(5, 5, 5, 0) 70%)'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.img
            src="/SS_logo.png"
            alt="Soccial Symphony Logo"
            className="mx-auto"
            style={{ 
              maxWidth: '400px', 
              width: '100%', 
              height: 'auto',
              filter: 'saturate(1.3) contrast(1.1) drop-shadow(0 0 20px rgba(0, 0, 0, 0.8))'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            data-testid="hero-logo"
          />
          
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold"
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#e8e8e8ff',
              textShadow: '0 0 40px rgba(245, 158, 11, 0.3)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Soccial Symphony
          </motion.h1>
          
          <motion.p
            className="text-xl sm:text-2xl max-w-3xl mx-auto"
            style={{ color: '#A1A1AA', fontWeight: '300' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Creating powerful connections between people, brands, and emotions.
          </motion.p>
          
          <motion.button
            onClick={scrollToEnquiry}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
            style={{
              background: '#F59E0B',
              color: '#000',
              boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            data-testid="hero-cta-button"
          >
            Explore Our Works
            <ArrowRight size={24} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
      
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, #050505 0%, transparent 100%)'
        }}
      />
    </section>
  );
};

export default HeroSection;