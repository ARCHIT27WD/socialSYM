import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quotes, CaretLeft, CaretRight } from '@phosphor-icons/react';

const TestimonialsSection = ({ testimonials }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const itemsPerView = 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerView);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, testimonials.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentTestimonials = () => {
    const start = currentIndex * itemsPerView;
    const end = start + itemsPerView;
    return testimonials.slice(start, end);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: '#050505' }}
      data-testid="testimonials-section"
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
            What Clients Say
          </h2>
          <p className="text-lg" style={{ color: '#A1A1AA' }}>
            Testimonials from our satisfied partners
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {getCurrentTestimonials().map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="relative p-8 rounded-3xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  data-testid={`testimonial-${index}`}
                >
                  <Quotes
                    size={48}
                    weight="fill"
                    color="#F59E0B"
                    className="opacity-20 mb-4"
                  />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} weight="fill" color="#F59E0B" />
                    ))}
                  </div>
                  
                  <p
                    className="text-base mb-6 leading-relaxed"
                    style={{ color: '#FAFAFA' }}
                  >
                    {testimonial.content}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    {testimonial.avatar_url && (
                      <img
                        src={testimonial.avatar_url}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                        style={{ border: '2px solid rgba(245, 158, 11, 0.5)' }}
                      />
                    )}
                    <div>
                      <h4 className="font-bold" style={{ color: '#FAFAFA' }}>
                        {testimonial.name}
                      </h4>
                      {testimonial.role && (
                        <p className="text-sm" style={{ color: '#A1A1AA' }}>
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {totalSlides > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.5)'
                }}
                data-testid="testimonials-prev-button"
              >
                <CaretLeft size={24} weight="bold" color="#F59E0B" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.5)'
                }}
                data-testid="testimonials-next-button"
              >
                <CaretRight size={24} weight="bold" color="#F59E0B" />
              </button>

              <div className="flex justify-center gap-2 mt-8">
                {[...Array(totalSlides)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1);
                      setCurrentIndex(i);
                    }}
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

export default TestimonialsSection;