import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, InstagramLogo } from '@phosphor-icons/react';

const ShortVideosSection = ({ videos }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (!videos || videos.length === 0) return null;

  const getInstagramEmbedUrl = (url) => {
    // Extract Instagram post ID and create embed URL
    const match = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
    if (match) {
      return `${url}embed`;
    }
    return url;
  };

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32"
      style={{ background: '#0A0A0A' }}
      data-testid="short-videos-section"
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
            Short Reels
          </h2>
          <p className="text-lg" style={{ color: '#A1A1AA' }}>
            Quick glimpses into our creative world
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#F59E0B #0A0A0A'
            }}
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 snap-center"
                style={{ width: '300px' }}
                data-testid={`short-video-${index}`}
              >
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative rounded-2xl overflow-hidden"
                  style={{
                    aspectRatio: '9/16',
                    background: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%)',
                    border: '2px solid rgba(245, 158, 11, 0.3)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Instagram gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-20" />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Instagram icon at top */}
                  <div className="absolute top-4 right-4 z-10">
                    <InstagramLogo size={32} weight="fill" className="text-white opacity-80" />
                  </div>
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative overflow-hidden"
                      style={{ background: '#FFF', border: '3px solid #000' }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-b from-[#F59E0B] to-[#F59E0B] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full"></span>
                      <Play size={36} weight="fill" color="#000" className="relative z-10" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: '#FAFAFA' }}
                    >
                      {video.title}
                    </h3>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortVideosSection;