import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PaperPlaneRight } from '@phosphor-icons/react';

const EnquirySection = ({ onSubmit }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await onSubmit(formData);
    if (success) {
      setFormData({ name: '', email: '', contact: '', comment: '' });
    }
    setIsSubmitting(false);
  };

  return (
    <section
      ref={ref}
      id="enquiry-section"
      className="py-24 lg:py-32"
      style={{ background: '#0A0A0A' }}
      data-testid="enquiry-section"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Let's Connect
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#e8e8e8ff' }}>
            Ready to create something extraordinary together? Drop us a message and we'll get back to you soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Your Name"
                  data-testid="enquiry-name-input"
                  className="w-full px-0 py-3 bg-transparent border-b-2 outline-none transition-all duration-300 placeholder:text-white/30"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#FAFAFA'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="Your Email"
                  data-testid="enquiry-email-input"
                  className="w-full px-0 py-3 bg-transparent border-b-2 outline-none transition-all duration-300 placeholder:text-white/30"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#FAFAFA'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
              </div>
            </div>

            <div className="relative">
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
                placeholder="Contact Number"
                data-testid="enquiry-contact-input"
                className="w-full px-0 py-3 bg-transparent border-b-2 outline-none transition-all duration-300 placeholder:text-white/30"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FAFAFA'
                }}
                onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>

            <div className="relative">
              <textarea
                rows={5}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                required
                placeholder="Your Message"
                data-testid="enquiry-comment-input"
                className="w-full px-0 py-3 bg-transparent border-b-2 outline-none transition-all duration-300 resize-none placeholder:text-white/30"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FAFAFA'
                }}
                onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>

            <div className="flex justify-center pt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg relative overflow-hidden"
                style={{
                  background: '#e8e8e8ff',
                  color: '#000',
                  border: '2px solid #000'
                }}
                data-testid="enquiry-submit-button"
              >
                <span className="absolute inset-0 bg-gradient-to-b from-[#F59E0B] to-[#F59E0B] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <PaperPlaneRight 
                  size={22} 
                  weight="bold" 
                  className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default EnquirySection;