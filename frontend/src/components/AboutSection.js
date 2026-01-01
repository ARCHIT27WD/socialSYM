import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const AboutSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 relative"
      style={{ background: '#050505' }}
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: 'Playfair Display, serif', color: '#F59E0B' }}
            >
              Let's create a symphony of success together.
            </h2>
            
            <div className="space-y-4" style={{ color: '#A1A1AA', fontSize: '1.125rem', lineHeight: '1.75' }}>
              <p>
                <span style={{ color: '#FAFAFA', fontWeight: '600' }}>Soccial Symphony</span> - co-founded by{' '}
                <span style={{ color: '#F59E0B' }}>Neeraj Vaid</span> and{' '}
                <span style={{ color: '#F59E0B' }}>Pijush Singha</span>
              </p>
              
              <p>
                Soccial Symphony specializes in creating powerful connections between people, brands, and emotions.
              </p>
              
              <p className="text-2xl font-bold" style={{ color: '#F59E0B', fontFamily: 'Playfair Display, serif' }}>
                Hit the Right Note with your Brand!
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              className="aspect-square rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="w-full h-full flex items-center justify-center p-12">
                <img
                  src="/SS_logo.png"
                  alt="Soccial Symphony"
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(245, 158, 11, 0.3))' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;