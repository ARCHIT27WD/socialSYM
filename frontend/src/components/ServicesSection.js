import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Microphone, VideoCamera, Image, InstagramLogo } from '@phosphor-icons/react';

const services = [
  {
    title: 'Podcast Production',
    image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070',
    icon: Microphone,
    colSpan: 'md:col-span-2',
    description: 'Professional podcast recording, editing, and production services'
  },
  {
    title: 'Video Editing',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070',
    icon: VideoCamera,
    colSpan: 'md:col-span-1',
    description: 'Creative video editing for all platforms'
  },
  {
    title: 'YouTube Thumbnails',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074',
    icon: Image,
    colSpan: 'md:col-span-1',
    description: 'Eye-catching thumbnails that drive clicks'
  },
  {
    title: 'Social Media Handling',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2070',
    icon: InstagramLogo,
    colSpan: 'md:col-span-2',
    description: 'Complete social media management and content strategy'
  }
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="services-section"
      className="py-24 lg:py-32"
      style={{ background: '#0A0A0A' }}
      data-testid="services-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Our Services
          </h2>
          <p className="text-lg" style={{ color: '#e8e8e8ff' }}>
            Comprehensive solutions for your creative needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl ${service.colSpan}`}
                style={{
                  minHeight: '400px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
                data-testid={`service-${index}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    filter: 'brightness(0.4)'
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 relative overflow-hidden"
                    style={{
                      background: '#e8e8e8ff',
                      border: '2px solid #000'
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-b from-[#F59E0B] to-[#F59E0B] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-2xl"></span>
                    <Icon size={32} weight="bold" color="#000" className="relative z-10" />
                  </div>
                  
                  <h3
                    className="text-3xl font-bold mb-3"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#FAFAFA' }}
                  >
                    {service.title}
                  </h3>
                  
                  <p className="text-base" style={{ color: '#e8e8e8ff' }}>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;