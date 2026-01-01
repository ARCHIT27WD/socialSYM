import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quotes } from '@phosphor-icons/react';

const TestimonialsSection = ({ testimonials }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;