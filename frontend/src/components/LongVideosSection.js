import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const LongVideosSection = ({ videos }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  useEffect(() => {
    if (!videos || videos.length === 0) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex, videos]);

  if (!videos || videos.length === 0) return null;

  const getVisibleVideos = () => {
    if (videos.length <= 2) return videos;
    
    const visible = [];
    for (let i = 0; i < 2; i++) {
      visible.push(videos[(currentIndex + i) % videos.length]);
    }
    return visible;
  };

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
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

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {getVisibleVideos().map((video, index) => (
              <motion.div
                key={`${video.id}-${currentIndex}-${index}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
                data-testid={`long-video-${index}`}
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(245, 158, 11, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ aspectRatio: '16/9' }}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.youtube_id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold"
                      style={{ color: '#FAFAFA' }}
                    >
                      {video.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {videos.length > 2 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.5)'
                }}
                data-testid="long-videos-prev-button"
              >
                <CaretLeft size={24} weight="bold" color="#F59E0B" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.5)'
                }}
                data-testid="long-videos-next-button"
              >
                <CaretRight size={24} weight="bold" color="#F59E0B" />
              </button>

              <div className="flex justify-center gap-2 mt-8">
                {videos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: i === currentIndex ? '#F59E0B' : 'rgba(255, 255, 255, 0.2)',
                      width: i === currentIndex ? '32px' : '8px'
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default LongVideosSection;