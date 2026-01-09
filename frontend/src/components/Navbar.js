import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? 'rgba(5, 5, 5, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
      }}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/SS_logo.png"
              alt="Soccial Symphony"
              className="h-12 w-auto"
              style={{ 
                filter: 'saturate(1.2) contrast(1.1) drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))'
              }}
            />
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { name: 'About', id: 'about-section' },
              { name: 'Services', id: 'services-section' },
              { name: 'Testimonials', id: 'testimonials-section' },
              { name: 'Contact', id: 'enquiry-section' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-base font-medium transition-all duration-300 relative group"
                style={{ color: '#A1A1AA' }}
                data-testid={`nav-link-${item.id}`}
              >
                <span className="group-hover:text-white transition-colors">{item.name}</span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ background: '#F59E0B' }}
                />
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('enquiry-section')}
            className="hidden md:block px-6 py-2.5 rounded-full font-semibold transition-all duration-300"
            style={{
              background: '#F59E0B',
              color: '#000',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
            }}
            data-testid="nav-cta-button"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
