import React from 'react';
import { YoutubeLogo, InstagramLogo, EnvelopeSimple, LinkedinLogo } from '@phosphor-icons/react';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      className="py-16 border-t"
      style={{ background: '#0A0A0A', borderColor: '#27272A' }}
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img
              src="/SS_logo.png"
              alt="Soccial Symphony"
              className="h-16 w-auto"
            />
            <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>
              Creating powerful connections between people, brands, and emotions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#F59E0B', fontFamily: 'Playfair Display, serif' }}>
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                { name: 'About', id: 'about-section' },
                { name: 'Services', id: 'services-section' },
                { name: 'Testimonials', id: 'testimonials-section' },
                { name: 'Contact', id: 'enquiry-section' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block text-sm transition-colors duration-300 hover:text-white"
                  style={{ color: '#A1A1AA' }}
                  data-testid={`footer-link-${item.id}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#F59E0B', fontFamily: 'Playfair Display, serif' }}>
              Connect With Us
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/soccialsymphony/?igsh=MTBlczUza2xlejdjNg%3D%3D&utm_source=qr#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}
                data-testid="footer-instagram-link"
              >
                <InstagramLogo size={24} weight="fill" color="#F59E0B" />
              </a>
              <a
                href="https://youtube.com/@dreamwithneerajshow?si=yF_3qwxCnHOk6mMc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}
                data-testid="footer-youtube-link"
              >
                <YoutubeLogo size={24} weight="fill" color="#F59E0B" />
              </a>
              <a
                href="https://www.linkedin.com/in/neerajvaid?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}
                data-testid="footer-linkedin-link"
              >
                <LinkedinLogo size={24} weight="fill" color="#F59E0B" />
              </a>
              <a
                href="mailto:info@soccialsymphony.com"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}
                data-testid="footer-email-link"
              >
                <EnvelopeSimple size={24} weight="fill" color="#F59E0B" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t" style={{ borderColor: '#27272A' }}>
          <p className="text-center text-sm" style={{ color: '#A1A1AA' }}>
            © 2026 Soccial Symphony. All rights reserved. | Co-founded by Neeraj Vaid & Pijush Singha
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;