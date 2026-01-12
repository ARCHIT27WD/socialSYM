import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const AboutSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="about-section"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: '#050505' }}
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden" style={{ minHeight: '600px' }}>
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070)',
              filter: 'brightness(0.4)'
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          
          {/* Logo Overlay */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <motion.img
              src="/SS_logo.png"
              alt="Soccial Symphony"
              className="h-24 w-auto opacity-80"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 0.8, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20" style={{ minHeight: '600px' }}>
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif', color: '#FAFAFA' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let's create a symphony
              <br />
              <span style={{ color: '#F59E0B' }}>of success together.</span>
            </motion.h2>
            
            <motion.div
              className="space-y-4 max-w-3xl"
              style={{ color: '#E5E5E5', fontSize: '1.125rem', lineHeight: '1.75' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                <span style={{ color: '#FAFAFA', fontWeight: '600' }}>Soccial Symphony</span> - co-founded by{' '}
                <span style={{ color: '#F59E0B' }}>Neeraj Vaid</span> and{' '}
                <span style={{ color: '#F59E0B' }}>Pijush Singha</span>
              </p>
              
              <p>
                We specialize in creating powerful connections between people, brands, and emotions.
              </p>
              
              <motion.p
                className="text-3xl font-bold mt-6"
                style={{ color: '#F59E0B', fontFamily: 'Playfair Display, serif' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Hit the Right Note with your Brand!
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;