import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, YoutubeLogo } from '@phosphor-icons/react';

const LongVideosSection = ({ videos }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [visibleCount, setVisibleCount] = useState(4);
  const [playingVideo, setPlayingVideo] = useState(null);

  if (!videos || videos.length === 0) return null;

  const visibleVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < videos.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, videos.length));
  };

  const getYouTubeThumbnail = (youtubeId) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  const handlePlayVideo = (videoId) => {
    setPlayingVideo(videoId);
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
                <div className="relative" style={{ aspectRatio: '16/9' }}>
                  {playingVideo === video.id ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div 
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => handlePlayVideo(video.id)}
                    >
                      {/* YouTube Thumbnail */}
                      <img
                        src={getYouTubeThumbnail(video.youtube_id)}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        style={{
                          filter: 'brightness(0.8)',
                          transition: 'filter 0.3s ease'
                        }}
                      />
                      
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* YouTube logo top right */}
                      <div className="absolute top-4 right-4">
                        <YoutubeLogo size={32} weight="fill" style={{ color: '#FF0000' }} />
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
                    </div>
                  )}
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