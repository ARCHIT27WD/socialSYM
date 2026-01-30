import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Microphone, VideoCamera, Users } from '@phosphor-icons/react';

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
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10" 
        style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)', filter: 'blur(80px)' }} 
      />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10" 
        style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)', filter: 'blur(60px)' }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#F59E0B' }}
          >
            Meet Our Founders
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#A1A1AA' }}>
            The creative minds behind Soccial Symphony
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Amber glow behind image */}
              <div 
                className="absolute -inset-4 rounded-3xl opacity-30"
                style={{ 
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  filter: 'blur(30px)'
                }}
              />
              
              {/* Image frame */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  border: '2px solid rgba(245, 158, 11, 0.4)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              >
                <img
                  src="/team.jpg"
                  alt="Neeraj Vaid and Pijush Singha - Founders of Soccial Symphony"
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                  style={{ 
                    filter: 'saturate(1.1) contrast(1.05)'
                  }}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Names overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex justify-center gap-8">
                    <div className="text-center">
                      <p className="font-bold text-lg" style={{ color: '#F59E0B' }}>Neeraj Vaid</p>
                      <p className="text-sm" style={{ color: '#FAFAFA' }}>Co-Founder</p>
                    </div>
                    <div className="w-px bg-white/30" />
                    <div className="text-center">
                      <p className="font-bold text-lg" style={{ color: '#F59E0B' }}>Pijush Singha</p>
                      <p className="text-sm" style={{ color: '#FAFAFA' }}>Co-Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 order-1 lg:order-2"
          >
            {/* Founder Cards */}
            <div className="space-y-6">
              {/* Neeraj Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-2xl group hover:scale-[1.02] transition-transform duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.02) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.2)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(245, 158, 11, 0.2)' }}
                  >
                    <Microphone size={24} weight="fill" style={{ color: '#F59E0B' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#F59E0B' }}>Neeraj Vaid</h3>
                    <p style={{ color: '#A1A1AA', lineHeight: '1.7' }}>
                      Creator, TEDx & Josh Talks Speaker, Author, Podcaster, and storyteller focused on narrative depth, clarity, and audience connection.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Pijush Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 rounded-2xl group hover:scale-[1.02] transition-transform duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.02) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.2)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(245, 158, 11, 0.2)' }}
                  >
                    <VideoCamera size={24} weight="fill" style={{ color: '#F59E0B' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#F59E0B' }}>Pijush Singha</h3>
                    <p style={{ color: '#A1A1AA', lineHeight: '1.7' }}>
                      Ex-Corporate, Director-level leader bringing strategic thinking, operational rigour, and scalable content execution.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-4"
            >
              <div 
                className="p-6 rounded-2xl text-center"
                style={{ 
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  boxShadow: '0 10px 40px -10px rgba(245, 158, 11, 0.4)'
                }}
              >
                <p 
                  className="text-2xl lg:text-3xl font-bold"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#000' }}
                >
                  Hit the Right Note with your Brand!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;