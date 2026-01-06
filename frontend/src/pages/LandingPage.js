import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ShortVideosSection from '../components/ShortVideosSection';
import LongVideosSection from '../components/LongVideosSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import EnquirySection from '../components/EnquirySection';
import Footer from '../components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LandingPage = () => {
  const [shortVideos, setShortVideos] = useState([]);
  const [longVideos, setLongVideos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [shortRes, longRes, testimonialRes] = await Promise.all([
        axios.get(`${API}/short-videos`),
        axios.get(`${API}/long-videos`),
        axios.get(`${API}/testimonials`)
      ]);
      setShortVideos(shortRes.data);
      setLongVideos(longRes.data);
      setTestimonials(testimonialRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquirySubmit = async (data) => {
    try {
      await axios.post(`${API}/enquiries`, data);
      toast.success('Thank you! We\'ll get back to you soon.');
      return true;
    } catch (error) {
      toast.error('Failed to submit enquiry. Please try again.');
      return false;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      {shortVideos.length > 0 && <ShortVideosSection videos={shortVideos} />}
      {longVideos.length > 0 && <LongVideosSection videos={longVideos} />}
      <ServicesSection />
      {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}
      <EnquirySection onSubmit={handleEnquirySubmit} />
      <Footer />
    </div>
  );
};

export default LandingPage;