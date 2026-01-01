import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Microphone, VideoCamera, Image, FilmStrip } from '@phosphor-icons/react';

const services = [
  {
    title: 'Podcast Production',
    image: 'https://images.unsplash.com/photo-1643875180552-03b9bb103768',
    icon: Microphone,
    colSpan: 'md:col-span-2',
    description: 'Professional podcast recording, editing, and production services'
  },
  {
    title: 'Video Editing',
    image: 'https://images.unsplash.com/photo-1682506457554-b34c9682e985',
    icon: VideoCamera,
    colSpan: 'md:col-span-1',
    description: 'Creative video editing for all platforms'
  },
  {
    title: 'YouTube Thumbnails',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?q=80&w=2070&auto=format&fit=crop',
    icon: Image,
    colSpan: 'md:col-span-1',
    description: 'Eye-catching thumbnails that drive clicks'
  },
  {
    title: 'Cinematography',
    image: 'https://images.unsplash.com/photo-1762028895833-59a751ccf89e',
    icon: FilmStrip,
    colSpan: 'md:col-span-2',
    description: 'Professional video production and cinematography'
  }
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
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
          <p className="text-lg" style={{ color: '#A1A1AA' }}>
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
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(245, 158, 11, 0.2)',
                      border: '1px solid rgba(245, 158, 11, 0.5)'
                    }}
                  >
                    <Icon size={32} weight="bold" color="#F59E0B" />
                  </div>
                  
                  <h3
                    className="text-3xl font-bold mb-3"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#FAFAFA' }}
                  >
                    {service.title}
                  </h3>
                  
                  <p className="text-base" style={{ color: '#A1A1AA' }}>
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