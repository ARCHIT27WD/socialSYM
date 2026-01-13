import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

const HeroSection = () => {
  const scrollToEnquiry = () => {
    document
      .getElementById('long-videos-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/Fav.jpg')", // same as About
        }}
      />

      {/* Dark / Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center space-y-8 max-w-4xl"
        >

          {/* Heading */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold"
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#e8e8e8ff',
              textShadow: '0 0 40px rgba(245, 158, 11, 0.35)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Soccial Symphony
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl sm:text-2xl max-w-3xl mx-auto text-gray-200 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Creating powerful connections between people, brands, and emotions.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToEnquiry}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg relative overflow-hidden"
            style={{
              background: '#e8e8e8ff',
              color: '#000',
              border: '2px solid #000',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            data-testid="hero-cta-button"
          >
            <span className="absolute inset-0 bg-gradient-to-b from-[#F59E0B] to-[#F59E0B] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              Explore Our Works
            </span>
            <ArrowRight
              size={24}
              weight="bold"
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom fade (same vibe as before) */}

    </section>
  );
};

export default HeroSection;
