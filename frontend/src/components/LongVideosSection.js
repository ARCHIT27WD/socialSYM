import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { YoutubeLogo } from '@phosphor-icons/react';

const LongVideosSection = ({ videos }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [visibleCount, setVisibleCount] = useState(4);

  if (!videos || videos.length === 0) return null;

  const visibleVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < videos.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, videos.length));
  };

  const getYouTubeUrl = (youtubeId) => {
    return `https://www.youtube.com/watch?v=${youtubeId}`;
  };

  return (
    <section
      ref={ref}
      id="long-videos-section"
      className="py-24 lg:py-32"
      style={{ background: '#050505' }}
      data-testid="long-videos-section"
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
            Featured Videos
          </h2>
          <p className="text-lg" style={{ color: '#A1A1AA' }}>
            Dive deep into our portfolio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
              data-testid={`long-video-${index}`}
            >
              <a
                href={getYouTubeUrl(video.youtube_id)}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.6)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(245, 158, 11, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div 
                  className="flex flex-col items-center justify-center p-12"
                  style={{ aspectRatio: '16/9' }}
                >
                  {/* YouTube Logo */}
                  <div className="mb-6 transition-all duration-300 group-hover:scale-110">
                    <YoutubeLogo 
                      size={120} 
                      weight="fill" 
                      style={{ color: '#FF0000' }}
                    />
                  </div>
                  
                  {/* Video Title */}
                  <h3
                    className="text-2xl font-bold text-center transition-colors duration-300"
                    style={{ 
                      color: '#FAFAFA',
                      fontFamily: 'Playfair Display, serif'
                    }}
                  >
                    {video.title}
                  </h3>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-bold text-lg relative overflow-hidden group"
              style={{
                background: '#FFF',
                border: '2px solid #000',
                color: '#000'
              }}
              data-testid="load-more-videos-button"
            >
              <span className="absolute inset-0 bg-gradient-to-b from-[#F59E0B] to-[#F59E0B] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10">Load More Videos</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LongVideosSection;