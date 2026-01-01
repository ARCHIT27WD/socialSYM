import React from 'react';
import { YoutubeLogo, InstagramLogo, EnvelopeSimple } from '@phosphor-icons/react';

const Footer = () => {
  return (
    <footer
      className="py-12 border-t"
      style={{ background: '#050505', borderColor: '#27272A' }}
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <img
            src="/SS_logo.png"
            alt="Soccial Symphony"
            style={{ maxWidth: '200px', width: '100%', height: 'auto' }}
          />
          
          <div className="flex gap-6">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110"
              data-testid="footer-youtube-link"
            >
              <YoutubeLogo size={32} weight="fill" color="#F59E0B" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110"
              data-testid="footer-instagram-link"
            >
              <InstagramLogo size={32} weight="fill" color="#F59E0B" />
            </a>
            <a
              href="mailto:info@soccialsymphony.com"
              className="transition-all duration-300 hover:scale-110"
              data-testid="footer-email-link"
            >
              <EnvelopeSimple size={32} weight="fill" color="#F59E0B" />
            </a>
          </div>
          
          <p className="text-center" style={{ color: '#A1A1AA' }}>
            © 2025 Soccial Symphony. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;