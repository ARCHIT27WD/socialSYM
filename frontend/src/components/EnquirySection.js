import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PaperPlaneRight } from '@phosphor-icons/react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <p className="text-lg" style={{ color: '#A1A1AA' }}>
            Ready to create something extraordinary together?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 md:p-12 rounded-3xl"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" style={{ color: '#FAFAFA', marginBottom: '0.5rem', display: 'block' }}>Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                data-testid="enquiry-name-input"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FAFAFA',
                  padding: '0.75rem',
                  borderRadius: '0.5rem'
                }}
              />
            </div>

            <div>
              <Label htmlFor="email" style={{ color: '#FAFAFA', marginBottom: '0.5rem', display: 'block' }}>Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                data-testid="enquiry-email-input"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FAFAFA',
                  padding: '0.75rem',
                  borderRadius: '0.5rem'
                }}
              />
            </div>

            <div>
              <Label htmlFor="contact" style={{ color: '#FAFAFA', marginBottom: '0.5rem', display: 'block' }}>Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
                data-testid="enquiry-contact-input"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FAFAFA',
                  padding: '0.75rem',
                  borderRadius: '0.5rem'
                }}
              />
            </div>

            <div>
              <Label htmlFor="comment" style={{ color: '#FAFAFA', marginBottom: '0.5rem', display: 'block' }}>Comment</Label>
              <Textarea
                id="comment"
                rows={5}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                required
                data-testid="enquiry-comment-input"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FAFAFA',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
              style={{
                background: '#F59E0B',
                color: '#000',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
              }}
              data-testid="enquiry-submit-button"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <PaperPlaneRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default EnquirySection;