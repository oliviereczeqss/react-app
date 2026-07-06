/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import Gallery from './components/Gallery';
import ReservationForm from './components/ReservationForm';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-beige-50 text-stone-900 selection:bg-bordo-200 selection:text-bordo-900">
      {/* Navbar with smooth scroll triggers */}
      <Navbar onReserveClick={() => scrollToSection('rezerwacje')} />

      {/* Hero Section */}
      <Hero 
        onReserveClick={() => scrollToSection('rezerwacje')} 
        onMenuClick={() => scrollToSection('menu')} 
      />

      {/* About Section */}
      <About />

      {/* Menu Cards */}
      <MenuSection />

      {/* Gallery Section */}
      <Gallery />

      {/* Testimonials Deck */}
      <Testimonials />

      {/* Booking Form */}
      <ReservationForm />

      {/* Location Map and Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { X, ZoomIn, Eye } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | 'food' | 'interior'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section id="galeria" className="py-20 sm:py-28 bg-beige-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif text-bordo-500 font-medium tracking-widest text-sm uppercase block mb-3">
            Oczami Zmysłów
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Galeria Smaków & Wnętrz
          </h2>
          <div className="h-1 w-16 bg-gold-500 mx-auto mb-6" />
          <p className="text-stone-600 font-light leading-relaxed">
            Zajrzyj do naszej kuchni i poczuj niepowtarzalny klimat Osteria Bella Vista. Ciepłe światło świec, eleganckie detale i zjawiskowe potrawy czekają na Ciebie.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs font-sans tracking-wider uppercase font-semibold border-b-2 transition-all duration-300 cursor-pointer ${
              filter === 'all'
                ? 'border-bordo-500 text-bordo-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Wszystko
          </button>
          <button
            onClick={() => setFilter('food')}
            className={`px-4 py-2 text-xs font-sans tracking-wider uppercase font-semibold border-b-2 transition-all duration-300 cursor-pointer ${
              filter === 'food'
                ? 'border-bordo-500 text-bordo-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Nasze Potrawy
          </button>
          <button
            onClick={() => setFilter('interior')}
            className={`px-4 py-2 text-xs font-sans tracking-wider uppercase font-semibold border-b-2 transition-all duration-300 cursor-pointer ${
              filter === 'interior'
                ? 'border-bordo-500 text-bordo-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Wnętrza
          </button>
        </div>

        {/* Grid Container */}
        <div className="min-h-[400px]">
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="relative aspect-square sm:aspect-video md:aspect-square rounded-sm overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Photo */}
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Dark Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-bordo-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="flex justify-end">
                      <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="font-mono text-[10px] tracking-widest text-gold-400 uppercase mb-1 block">
                        {item.category === 'food' ? 'Kuchnia' : 'Wnętrze'}
                      </span>
                      <p className="font-serif text-sm text-white font-medium leading-snug">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 cursor-pointer"
              aria-label="Zamknij"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="max-w-4xl w-full bg-stone-900 rounded-sm overflow-hidden shadow-2xl border border-stone-850"
              onClick={(e) => e.stopPropagation()} // stop close on clicking content
            >
              <div className="relative aspect-video max-h-[70vh] bg-stone-950 flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-6 bg-stone-900 text-white">
                <span className="font-mono text-xs tracking-widest text-gold-400 uppercase mb-2 block font-semibold">
                  {selectedImage.category === 'food' ? 'Kulinaria' : 'Lokal'}
                </span>
                <p className="font-serif text-lg text-stone-100 italic">
                  „{selectedImage.caption}”
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, CalendarDays, UtensilsCrossed } from 'lucide-react';

interface HeroProps {
  onReserveClick: () => void;
  onMenuClick: () => void;
}

export default function Hero({ onReserveClick, onMenuClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-stone-950 overflow-hidden pt-20"
    >
      {/* Background Image with elegant overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 filter brightness-50"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      {/* Subtle burgundy & gold gradients for deep warmth */}
      <div className="absolute inset-0 bg-gradient-to-t from-bordo-900/90 via-stone-900/50 to-stone-950/40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-bordo-950/45 via-transparent to-black/30" />

      {/* Hero Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          {/* Top Elegant Accent */}
          <div className="flex items-center space-x-3 mb-6">
            <span className="h-[1px] w-8 sm:w-12 bg-gold-400" />
            <span className="font-serif text-gold-400 text-xs sm:text-sm tracking-[0.35em] uppercase font-semibold">
              Tradycja & Nowoczesność
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gold-400" />
          </div>

          {/* Restaurant Title */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white drop-shadow-xl select-none mb-4">
            Osteria Bella Vista
          </h1>

          {/* Tagline */}
          <p className="font-serif text-lg sm:text-2xl md:text-3xl text-gold-200 tracking-wide font-light max-w-3xl mb-10 drop-shadow-md italic">
            „Smak Włoch w sercu Warszawy”
          </p>

          {/* Description */}
          <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl leading-relaxed mb-12 px-4">
            Odkryj autentyczną, rzymską kuchnię przygotowywaną według starych receptur przez rodowitych włoskich kucharzy. Poczuj kameralną atmosferę oświetloną blaskiem świec i delektuj się najlepszymi winami w Warszawie.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-4">
            <button
              onClick={onReserveClick}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-bordo-950 px-8 py-4 rounded-sm font-sans text-sm uppercase tracking-widest font-bold shadow-xl hover:shadow-gold-500/10 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border border-gold-400/50"
            >
              <CalendarDays className="w-4.5 h-4.5" />
              <span>Zarezerwuj stolik</span>
            </button>

            <button
              onClick={onMenuClick}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent hover:bg-white/10 active:bg-white/5 text-white px-8 py-4 rounded-sm font-sans text-sm uppercase tracking-widest font-bold border border-white/40 hover:border-white transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <UtensilsCrossed className="w-4.5 h-4.5 text-gold-400" />
              <span>Zobacz Menu</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Warm Sidelights */}
      <div className="absolute left-0 bottom-0 w-full h-32 bg-gradient-to-t from-beige-50 to-transparent pointer-events-none" />

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-15 hidden sm:block">
        <motion.button
          onClick={onMenuClick}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center text-gold-400 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase mb-2">Przewiń</span>
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { Sparkles } from 'lucide-react';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('przystawki');

  const categories: { id: MenuItem['category']; label: string }[] = [
    { id: 'przystawki', label: 'Przystawki' },
    { id: 'glowne', label: 'Dania Główne' },
    { id: 'desery', label: 'Desery' },
    { id: 'napoje', label: 'Napoje & Wina' },
  ];

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-beige-100 relative">
      {/* Decorative top wave/divider line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif text-bordo-500 font-medium tracking-widest text-sm uppercase block mb-3">
            Kulinarna Podróż
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Nasze Menu
          </h2>
          <div className="h-1 w-16 bg-gold-500 mx-auto mb-6" />
          <p className="text-stone-600 font-light leading-relaxed">
            Każde danie to starannie skomponowana kompozycja najwyższej jakości składników, przygotowywana od podstaw z głębokim szacunkiem do włoskiego dziedzictwa kulinarnego.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-sans tracking-widest uppercase font-semibold border rounded-sm transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-bordo-500 text-white border-bordo-600 shadow-lg shadow-bordo-900/10'
                  : 'bg-white/80 hover:bg-beige-50 text-stone-700 border-stone-200 hover:border-gold-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="bg-white p-5 sm:p-6 rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-300 border border-beige-200 flex flex-col sm:flex-row gap-5 items-start group"
                >
                  {/* Dish Image */}
                  <div className="w-full sm:w-28 h-28 flex-shrink-0 rounded-sm overflow-hidden bg-stone-100 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.tags?.includes('Bestseller') && (
                      <div className="absolute top-1 left-1 bg-gold-500 text-white text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm font-bold flex items-center gap-0.5">
                        <Sparkles className="w-2 h-2" />
                        Hit
                      </div>
                    )}
                  </div>

                  {/* Dish Details */}
                  <div className="flex-1 w-full">
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-bordo-500 transition-colors duration-300">
                        {item.name}
                      </h3>
                      {/* Price Line connecting or standalone */}
                      <span className="font-mono text-base font-bold text-bordo-600 flex-shrink-0">
                        {item.price} PLN
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tags?.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-[9px] font-sans tracking-widest uppercase font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-stone-500 font-light text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Additional dietary info banner */}
        <div className="mt-16 text-center border-t border-beige-200/55 pt-8">
          <p className="text-xs text-stone-500 italic max-w-lg mx-auto">
            Wszystkie nasze makarony są przygotowywane codziennie na świeżo. Jeśli masz jakiekolwiek alergie lub preferencje żywieniowe, prosimy poinformuj o tym obsługę przy składaniu zamówienia.
          </p>
        </div>

      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, CalendarDays, Phone } from 'lucide-react';

interface NavbarProps {
  onReserveClick: () => void;
}

export default function Navbar({ onReserveClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = ['home', 'o-nas', 'menu', 'galeria', 'kontakt'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Start' },
    { id: 'o-nas', label: 'O nas' },
    { id: 'menu', label: 'Menu' },
    { id: 'galeria', label: 'Galeria' },
    { id: 'kontakt', label: 'Kontakt' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-beige-50/90 backdrop-blur-md shadow-md border-b border-beige-200/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => handleLinkClick('home')}
              className="flex flex-col cursor-pointer group"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-bordo-500 group-hover:text-gold-600 transition-colors duration-300">
                OSTERIA
              </span>
              <span className="font-serif text-xs tracking-[0.25em] text-gold-600 -mt-1 font-semibold group-hover:text-bordo-500 transition-colors duration-300">
                BELLA VISTA
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative font-sans text-sm tracking-wide font-medium transition-colors duration-300 py-2 cursor-pointer ${
                    activeSection === link.id
                      ? 'text-bordo-500'
                      : 'text-stone-600 hover:text-bordo-500'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button and Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <a 
                href="tel:+48221234567" 
                className="hidden lg:flex items-center space-x-2 text-stone-600 hover:text-bordo-500 text-sm transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-gold-500" />
                <span className="font-mono">+48 22 123 45 67</span>
              </a>

              <button
                onClick={onReserveClick}
                className="hidden sm:flex items-center space-x-2 bg-bordo-500 hover:bg-bordo-600 text-white px-5 py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold shadow-md hover:shadow-lg transition-all duration-300 border border-bordo-600/20 cursor-pointer"
              >
                <CalendarDays className="w-4 h-4 text-gold-300" />
                <span>Zarezerwuj stolik</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-stone-600 hover:text-bordo-500 hover:bg-beige-100 transition-colors duration-300 cursor-pointer focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[65px] z-40 bg-beige-50 shadow-xl border-b border-beige-200 py-6 px-4 md:hidden flex flex-col space-y-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    activeSection === link.id
                      ? 'bg-bordo-50 text-bordo-600 font-semibold'
                      : 'text-stone-600 hover:bg-beige-100 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="border-t border-beige-200/60 pt-4 flex flex-col space-y-4 px-4">
              <div className="flex items-center space-x-3 text-stone-600">
                <Phone className="w-5 h-5 text-gold-500" />
                <span className="font-mono text-sm">+48 22 123 45 67</span>
              </div>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onReserveClick();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-bordo-500 hover:bg-bordo-600 text-white py-3 rounded-md font-sans text-sm uppercase tracking-wider font-semibold shadow-md transition-colors duration-200"
              >
                <CalendarDays className="w-4 h-4 text-gold-300" />
                <span>Zarezerwuj stolik</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  /* Custom Premium Colors */
  --color-gold-50: #FCFBF7;
  --color-gold-100: #FAF6ED;
  --color-gold-200: #F3EBD9;
  --color-gold-300: #E7D8BC;
  --color-gold-400: #D8C29C;
  --color-gold-500: #C5A850; /* main warm gold */
  --color-gold-600: #B09240;
  --color-gold-700: #917630;
  --color-gold-800: #735D23;
  --color-gold-900: #544318;

  --color-bordo-50: #FDF6F6;
  --color-bordo-100: #FAEBEB;
  --color-bordo-200: #F4CECF;
  --color-bordo-300: #EBA3A6;
  --color-bordo-400: #DE6D72;
  --color-bordo-500: #4A0E17; /* rich dark burgundy */
  --color-bordo-600: #3D0A11; /* deeper burgundy */
  --color-bordo-700: #2E060A; /* dark bordeaux shadow */
  --color-bordo-800: #1F0306;
  --color-bordo-900: #140103;

  --color-beige-50: #FAF8F5; /* soft luxury off-white cream */
  --color-beige-100: #F5EFE6; /* light beige */
  --color-beige-200: #EFE3D3; /* mid warm beige */
  --color-beige-300: #D9C6B0;
}

/* Base style resets and customizations */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* offset for sticky navbar */
  background-color: var(--color-beige-50);
  color: #1c1917; /* warm stone text */
}

body {
  font-family: var(--font-sans);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-beige-50);
}
::-webkit-scrollbar-thumb {
  background: var(--color-bordo-500);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-bordo-600);
}

/* Soft transition utility */
.transition-luxury {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in PLN
  category: 'przystawki' | 'glowne' | 'desery' | 'napoje';
  tags?: string[];
  image: string;
}

export interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  phone?: string;
  email?: string;
  notes?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'food' | 'interior';
}

import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Navigation, ExternalLink, CalendarDays } from 'lucide-react';
import { OPENING_HOURS } from '../data';

export default function Contact() {
  return (
    <section id="kontakt" className="py-20 sm:py-28 bg-beige-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif text-bordo-500 font-medium tracking-widest text-sm uppercase block mb-3">
            Zapraszamy do kontaktu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Gdzie Nas Znaleźć?
          </h2>
          <div className="h-1 w-16 bg-gold-500 mx-auto mb-6" />
          <p className="text-stone-600 font-light leading-relaxed">
            Niezależnie od tego, czy chcesz zarezerwować stół, zapytać o imprezę okolicznościową, czy po prostu dowiedzieć się więcej o naszej kuchni – czekamy na Twój kontakt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Contact Details (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Quick Contact Cards */}
            <div className="space-y-6">
              
              {/* Card: Address */}
              <div className="bg-white p-6 rounded-sm shadow-sm border border-beige-200 flex items-start space-x-4">
                <div className="bg-gold-100 p-3 rounded-sm border border-gold-200 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-bordo-500" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-1">Nasza Lokalizacja</h3>
                  <p className="text-stone-600 font-light text-sm">
                    ul. Piękna 12, 00-549 Warszawa
                  </p>
                  <p className="text-stone-500 text-xs font-light mt-1">
                    Śródmieście Południowe, naprzeciwko Parku Ujazdowskiego
                  </p>
                </div>
              </div>

              {/* Card: Phone */}
              <div className="bg-white p-6 rounded-sm shadow-sm border border-beige-200 flex items-start space-x-4">
                <div className="bg-gold-100 p-3 rounded-sm border border-gold-200 flex-shrink-0">
                  <Phone className="w-5 h-5 text-bordo-500" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-1">Zadzwoń do nas</h3>
                  <a href="tel:+48221234567" className="text-bordo-500 hover:text-bordo-600 font-mono font-bold text-sm hover:underline block">
                    +48 22 123 45 67
                  </a>
                  <p className="text-stone-500 text-xs font-light mt-1">
                    Rezerwacje grupowe powyżej 10 osób: <span className="font-mono">+48 501 987 654</span>
                  </p>
                </div>
              </div>

              {/* Card: Email */}
              <div className="bg-white p-6 rounded-sm shadow-sm border border-beige-200 flex items-start space-x-4">
                <div className="bg-gold-100 p-3 rounded-sm border border-gold-200 flex-shrink-0">
                  <Mail className="w-5 h-5 text-bordo-500" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-1">Napisz do nas</h3>
                  <a href="mailto:kontakt@osteriabellavista.pl" className="text-stone-700 hover:text-bordo-500 text-sm font-medium hover:underline block">
                    kontakt@osteriabellavista.pl
                  </a>
                  <p className="text-stone-500 text-xs font-light mt-1">
                    Odpowiadamy w ciągu maksymalnie 24 godzin.
                  </p>
                </div>
              </div>

            </div>

            {/* Opening Hours Widget */}
            <div className="bg-bordo-500 text-white p-6 sm:p-8 rounded-sm shadow-md border border-bordo-600/30">
              <h3 className="font-serif text-lg font-bold text-gold-300 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Godziny Otwarcia
              </h3>
              <div className="space-y-3 text-xs sm:text-sm font-sans">
                <div className="flex justify-between border-b border-bordo-400/20 pb-2">
                  <span className="text-gold-200/90 font-medium">Poniedziałek – Czwartek</span>
                  <span className="font-mono font-semibold">12:00 – 22:00</span>
                </div>
                <div className="flex justify-between border-b border-bordo-400/20 pb-2">
                  <span className="text-gold-200/90 font-medium">Piątek – Sobota</span>
                  <span className="font-mono font-semibold">12:00 – 23:00</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-gold-200/90 font-medium">Niedziela</span>
                  <span className="font-mono font-semibold">12:00 – 21:00</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Custom Google Map Placeholder (Col Span 7) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative flex-1 min-h-[350px] lg:min-h-[450px] bg-stone-900 rounded-sm overflow-hidden shadow-lg border border-beige-200 flex flex-col justify-between group">
              
              {/* Stylized Simulated Map Design */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-75 mix-blend-luminosity filter saturate-50 group-hover:scale-102 transition-transform duration-[4s]"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')` // warm architectural abstract map feel
                }}
              />
              {/* Simulated Map streets grid with canvas overlays to look incredibly premium */}
              <div className="absolute inset-0 bg-bordo-950/20" />
              
              {/* Premium Floating Indicator for Address */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative">
                  {/* Ripples */}
                  <div className="absolute inset-0 rounded-full bg-bordo-500 scale-200 opacity-20 animate-ping" />
                  <div className="absolute inset-0 rounded-full bg-gold-400 scale-150 opacity-35 animate-pulse" />
                  
                  {/* Pin Circle */}
                  <div className="relative w-12 h-12 bg-bordo-500 rounded-full border-2 border-white shadow-xl flex items-center justify-center">
                    <span className="font-serif text-white font-bold text-[10px]">O.B.V</span>
                  </div>
                </div>
                
                {/* Floating Map tooltip */}
                <div className="bg-white/95 backdrop-blur-sm text-stone-900 rounded-md p-3 shadow-2xl border border-gold-300 text-center mt-3 max-w-[200px]">
                  <span className="font-serif text-xs font-bold block text-bordo-500">Osteria Bella Vista</span>
                  <span className="text-[10px] text-stone-600 block mt-0.5">ul. Piękna 12, Warszawa</span>
                </div>
              </div>

              {/* Map controls decorative buttons */}
              <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-sm shadow-md text-stone-700 font-bold font-mono text-xs text-center w-8 select-none">+</div>
                <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-sm shadow-md text-stone-700 font-bold font-mono text-xs text-center w-8 select-none">-</div>
              </div>

              {/* Interactive bottom bar with navigation launcher */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-md p-4 border-t border-beige-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block">Warszawa Śródmieście</span>
                  <span className="text-stone-500 block">Łatwy dojazd tramwajem lub metrem (Stacja Metro Politechnika)</span>
                </div>
                
                <a 
                  href="https://maps.google.com/?q=Piękna+12,+Warszawa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-stone-900 hover:bg-stone-850 active:bg-stone-950 text-white px-4 py-2.5 rounded-sm font-sans text-xs uppercase tracking-wider font-semibold shadow-md transition-colors duration-200 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-gold-400" />
                  <span>Uruchom nawigację</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import { MenuItem, GalleryItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Przystawki (Appetizers)
  {
    id: 'p1',
    name: 'Bruschetta al Pomodoro',
    description: 'Grillowane pieczywo rzemieślnicze, dojrzałe pomidory San Marzano, czosnek, świeża bazylia, oliwa z oliwek Extra Virgin.',
    price: 29,
    category: 'przystawki',
    tags: ['Wege', 'Klasyk'],
    image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p2',
    name: 'Carpaccio di Manzo',
    description: 'Cienkie plastry polędwicy wołowej, świeża rukola, dzikie kapary, płatki parmezanu dojrzewającego 24 miesiące, oliwa truflowa.',
    price: 49,
    category: 'przystawki',
    tags: ['Premium'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p3',
    name: 'Burrata con Pomodorini',
    description: 'Kremowy ser burrata z Apulii, konfitowane pomidorki koktajlowe, domowe pesto bazyliowe, prażone orzeszki piniowe.',
    price: 42,
    category: 'przystawki',
    tags: ['Wege', 'Polecane'],
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80'
  },

  // Dania główne (Mains)
  {
    id: 'dg1',
    name: 'Spaghetti Carbonara',
    description: 'Oryginalna rzymska receptura: rzemieślniczy makaron spaghetti, chrupiące guanciale, kremowy sos z żółtek jaj i sera Pecorino Romano, czarny pieprz.',
    price: 48,
    category: 'glowne',
    tags: ['Oryginał', 'Bestseller'],
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dg2',
    name: 'Risotto ai Funghi',
    description: 'Kremowy ryż Arborio powoli gotowany na bulionie warzywnym z borowikami leśnymi, aromatycznym białym winem, masłem i Parmigiano Reggiano.',
    price: 52,
    category: 'glowne',
    tags: ['Wege', 'Bezglutenowe'],
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dg3',
    name: 'Tagliatelle al Tartufo',
    description: 'Świeży makaron wstążki z aksamitnym sosem z czarnej trufli, masła i Parmigiano Reggiano, posypany świeżo tartą truflą.',
    price: 58,
    category: 'glowne',
    tags: ['Wege', 'Premium'],
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dg4',
    name: 'Filetto di Branzino',
    description: 'Pieczony filet z okonia morskiego, serwowany na grillowanych warzywach śródziemnomorskich z sosem cytrynowo-maślanym i świeżymi ziołami.',
    price: 69,
    category: 'glowne',
    tags: ['Ryba', 'Lekkie'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80'
  },

  // Desery (Desserts)
  {
    id: 'd1',
    name: 'Tiramisu Klasyczne',
    description: 'Włoskie biszkopty Savoiardi nasączone mocnym espresso i likierem Amaretto, puszysty krem z sera Mascarpone, posypane gorzkim kakao.',
    price: 28,
    category: 'desery',
    tags: ['Klasyk', 'Bestseller'],
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'd2',
    name: 'Panna Cotta al Lampone',
    description: 'Kremowy deser śmietankowy z nutą prawdziwej wanilii Bourbon z Madagaskaru, podawany z aksamitnym, lekko kwaśnym musem z leśnych malin.',
    price: 26,
    category: 'desery',
    tags: ['Lekkie'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'd3',
    name: 'Fondant al Cioccolato',
    description: 'Ciepłe ciastko z belgijskiej czekolady z płynnym, aksamitnym wnętrzem, podawane z rzemieślniczymi lodami waniliowymi i świeżą miętą.',
    price: 32,
    category: 'desery',
    tags: ['Na ciepło'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80'
  },

  // Napoje (Drinks)
  {
    id: 'n1',
    name: 'Wino Domowe Osteria (Rosso / Bianco)',
    description: 'Wyselekcjonowane, klasyczne wino z malowniczych winnic regionu Veneto. Doskonale zbalansowane, pasujące do naszych dań.',
    price: 18, // kieliszek
    category: 'napoje',
    tags: ['Wino', 'Polecane'],
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'n2',
    name: 'Aperol Spritz',
    description: 'Klasyczny włoski aperitif: Aperol, oryginalne włoskie Prosecco DOC, woda gazowana, plaster świeżej pomarańczy i lód.',
    price: 34,
    category: 'napoje',
    tags: ['Koktajl', 'Orzeźwiające'],
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'n3',
    name: 'Limonata della Casa',
    description: 'Tradycyjna, mocno orzeźwiająca lemoniada ze świeżo wyciskanych sycylijskich cytryn, z gałązkami mięty i odrobiną brązowego cukru.',
    price: 18,
    category: 'napoje',
    tags: ['Bezalkoholowe', 'Domowe'],
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=600&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    caption: 'Nasza ciepła, przytulna sala główna z klimatycznym oświetleniem.',
    category: 'interior'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80',
    caption: 'Świeża Bruschetta al Pomodoro przygotowywana codziennie rano.',
    category: 'food'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    caption: 'Kameralny kącik idealny na romantyczną kolację przy winie.',
    category: 'interior'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    caption: 'Nasze słynne rzymskie Spaghetti Carbonara pełne kremowego smaku.',
    category: 'food'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    caption: 'Nasz Szef Kuchni dba o każdy detal na talerzu.',
    category: 'interior'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    caption: 'Domowe Tiramisu oprószone najwyższej jakości ciemnym kakao.',
    category: 'food'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Katarzyna Wiśniewska',
    role: 'Lokalna przewodniczka, Warszawa',
    comment: 'Prawdziwe rzymskie wakacje w środku Warszawy! Carbonara bez śmietanki, idealne guanciale i cudownie kremowy sos z żółtek. Do tego świetna, nienachalna obsługa.',
    rating: 5
  },
  {
    name: 'Mateusz Kowalski',
    role: 'Miłośnik kuchni włoskiej',
    comment: 'Cudowny klimat, elegancko ale bardzo przytulnie. Burrata rozpływa się w ustach, a tiramisu to po prostu poezja smaku. Na pewno będziemy tu wracać z żoną.',
    rating: 5
  },
  {
    name: 'Anna i Piotr',
    role: 'Klienci regularni',
    comment: 'Osteria Bella Vista stała się naszym ulubionym miejscem na rodzinne obiady i rocznice. Przepyszne jedzenie, świetne wina i ten niesamowity, ciepły zapach od wejścia.',
    rating: 5
  }
];

export const OPENING_HOURS = {
  weekdays: 'Poniedziałek – Czwartek: 12:00 – 22:00',
  fridaySaturday: 'Piątek – Sobota: 12:00 – 23:00',
  sunday: 'Niedziela: 12:00 – 21:00'
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarDays, Users, Clock, User, CheckCircle2, Phone, Mail, FileText, Trash2 } from 'lucide-react';
import { Reservation } from '../types';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '18:00',
    guests: 2,
    notes: ''
  });

  const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [latestBooking, setLatestBooking] = useState<Reservation | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Hours available for booking (from 12:00 to 22:00 in 30m steps)
  const bookingTimes = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30'
  ];

  // Load existing reservations from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('osteriabv_bookings');
    if (stored) {
      try {
        setActiveReservations(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load bookings', e);
      }
    }
  }, []);

  // Save reservations
  const saveReservations = (updated: Reservation[]) => {
    localStorage.setItem('osteriabv_bookings', JSON.stringify(updated));
    setActiveReservations(updated);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!formData.name.trim()) {
      setErrorMsg('Wprowadź imię i nazwisko.');
      return;
    }
    if (!formData.date) {
      setErrorMsg('Wybierz datę rezerwacji.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Wprowadź numer telefonu do kontaktu.');
      return;
    }

    // Set minimal date validation to today or future
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setErrorMsg('Data rezerwacji nie może być z przeszłości.');
      return;
    }

    // Create reservation object
    const newReservation: Reservation = {
      id: 'res_' + Math.random().toString(36).substr(2, 9),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      guests: Number(formData.guests),
      notes: formData.notes,
      createdAt: new Date().toISOString()
    };

    const updatedBookings = [newReservation, ...activeReservations];
    saveReservations(updatedBookings);
    setLatestBooking(newReservation);
    setIsSuccess(true);

    // Reset form fields
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '18:00',
      guests: 2,
      notes: ''
    });
  };

  const cancelReservation = (id: string) => {
    const filtered = activeReservations.filter(res => res.id !== id);
    saveReservations(filtered);
  };

  // Get tomorrow's date string for input default min date
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <section id="rezerwacje" className="py-20 sm:py-28 bg-beige-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif text-bordo-500 font-medium tracking-widest text-sm uppercase block mb-3">
            Zarezerwuj Stolik
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Doświadcz Wyjątkowej Kolacji
          </h2>
          <div className="h-1 w-16 bg-gold-500 mx-auto mb-6" />
          <p className="text-stone-600 font-light leading-relaxed">
            Zalecamy rezerwację stolika z wyprzedzeniem, szczególnie na weekendowe wieczory, by zagwarantować sobie najlepsze doświadczenie kulinarne.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Reservation Card / Form (Col Span 7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-sm shadow-xl border border-beige-200">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2 border-b border-beige-100 pb-4">
                    Karta Rezerwacji Online
                  </h3>

                  {errorMsg && (
                    <div className="bg-red-50 text-red-700 text-sm p-4 rounded-sm border-l-4 border-red-600">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full name */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs uppercase tracking-wider font-semibold text-stone-600 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gold-500" /> Imię i Nazwisko *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="np. Jan Kowalski"
                        className="w-full bg-beige-50 border border-stone-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 p-3 rounded-sm text-stone-850 placeholder-stone-400 outline-none transition-all duration-200 text-sm"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs uppercase tracking-wider font-semibold text-stone-600 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-500" /> Numer Telefonu *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="np. +48 500 123 456"
                        className="w-full bg-beige-50 border border-stone-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 p-3 rounded-sm text-stone-850 placeholder-stone-400 outline-none transition-all duration-200 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* E-mail address */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs uppercase tracking-wider font-semibold text-stone-600 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gold-500" /> Adres E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="np. jan.kowalski@email.pl"
                        className="w-full bg-beige-50 border border-stone-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 p-3 rounded-sm text-stone-850 placeholder-stone-400 outline-none transition-all duration-200 text-sm"
                      />
                    </div>

                    {/* Number of guests */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs uppercase tracking-wider font-semibold text-stone-600 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gold-500" /> Liczba Osób *
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full bg-beige-50 border border-stone-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 p-3 rounded-sm text-stone-850 outline-none transition-all duration-200 text-sm"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'osoba' : num < 5 ? 'osoby' : 'osób'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Date */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs uppercase tracking-wider font-semibold text-stone-600 flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-gold-500" /> Data Rezerwacji *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={getTodayDateString()}
                        className="w-full bg-beige-50 border border-stone-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 p-3 rounded-sm text-stone-850 outline-none transition-all duration-200 text-sm"
                        required
                      />
                    </div>

                    {/* Time */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs uppercase tracking-wider font-semibold text-stone-600 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gold-500" /> Godzina Rezerwacji *
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full bg-beige-50 border border-stone-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 p-3 rounded-sm text-stone-850 outline-none transition-all duration-200 text-sm"
                      >
                        {bookingTimes.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special notes */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs uppercase tracking-wider font-semibold text-stone-600 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-gold-500" /> Uwagi Specjalne / Życzenia
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="np. Stolik przy oknie, krzesełko dla dziecka, rocznica, alergia pokarmowa..."
                      rows={3}
                      className="w-full bg-beige-50 border border-stone-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 p-3 rounded-sm text-stone-850 placeholder-stone-400 outline-none transition-all duration-200 text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-bordo-500 hover:bg-bordo-600 active:bg-bordo-700 text-white font-sans font-bold text-xs uppercase tracking-widest py-4 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border border-bordo-600/30"
                  >
                    Rezerwuj Stolik Teraz
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-stone-900 mb-2">
                      Dziękujemy za rezerwację!
                    </h3>
                    <p className="text-stone-600 text-sm font-light max-w-md mx-auto">
                      Twój stolik w Osteria Bella Vista został pomyślnie zarezerwowany. Potwierdzenie wysłaliśmy również na Twój adres e-mail. Do zobaczenia!
                    </p>
                  </div>

                  {latestBooking && (
                    <div className="bg-gold-50 border border-gold-200 max-w-md mx-auto rounded-sm p-6 text-left space-y-4 shadow-inner">
                      <div className="border-b border-gold-200/50 pb-3 text-center">
                        <span className="font-serif text-xs uppercase tracking-widest text-gold-700 font-bold block">
                          KOD REZERWACJI: {latestBooking.id.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-sans">
                        <div>
                          <span className="text-stone-500 font-semibold uppercase block tracking-wider text-[10px]">Gość</span>
                          <span className="text-stone-850 font-bold">{latestBooking.name}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 font-semibold uppercase block tracking-wider text-[10px]">Liczba osób</span>
                          <span className="text-stone-850 font-bold">{latestBooking.guests} {latestBooking.guests === 1 ? 'osoba' : 'osoby'}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 font-semibold uppercase block tracking-wider text-[10px]">Data</span>
                          <span className="text-stone-850 font-bold">{latestBooking.date}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 font-semibold uppercase block tracking-wider text-[10px]">Godzina</span>
                          <span className="text-stone-850 font-bold">{latestBooking.time}</span>
                        </div>
                      </div>

                      {latestBooking.notes && (
                        <div className="border-t border-gold-200/50 pt-3 text-xs">
                          <span className="text-stone-500 font-semibold uppercase block tracking-wider text-[10px] mb-1">Uwagi</span>
                          <span className="text-stone-800 italic">{latestBooking.notes}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-stone-900 hover:bg-stone-800 text-white font-sans font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-sm transition-colors duration-200 cursor-pointer"
                  >
                    Zarezerwuj kolejny stolik
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Practical Info & Booking list sidebar (Col Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Practical information card */}
            <div className="bg-bordo-500 text-white p-8 rounded-sm shadow-xl border border-bordo-600/30">
              <h3 className="font-serif text-xl font-bold text-gold-300 mb-4 pb-2 border-b border-bordo-400/30">
                Informacje dla Gości
              </h3>
              <ul className="space-y-4 text-sm font-light text-gold-100/90">
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Stoliki rezerwujemy na maksymalnie **2.5 godziny**. Jeśli chcesz przedłużyć ten czas, skontaktuj się z nami telefonicznie.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Rezerwację przetrzymujemy przez maksymalnie **15 minut** po wyznaczonej godzinie. Spóźnienia prosimy zgłaszać.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Dla grup powyżej **8 osób** doliczamy serwis serwisowy w wysokości **10%** i sugerujemy wcześniejszy dobór menu.</span>
                </li>
              </ul>
            </div>

            {/* Live bookings in LocalStorage list */}
            {activeReservations.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-sm shadow-md border border-beige-200">
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-4 pb-2 border-b border-beige-100 flex items-center justify-between">
                  <span>Twoje Rezerwacje ({activeReservations.length})</span>
                  <span className="text-[10px] font-sans tracking-widest text-gold-600 uppercase font-bold">W pamięci</span>
                </h3>
                
                <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
                  {activeReservations.map((res) => (
                    <div 
                      key={res.id}
                      className="text-xs bg-beige-50 hover:bg-beige-100/50 p-3 rounded-sm border border-beige-200 flex justify-between items-center transition-colors duration-200"
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-stone-900">{res.name}</div>
                        <div className="text-stone-500 font-medium">
                          {res.date} o godz. <span className="font-semibold text-bordo-600">{res.time}</span> ({res.guests} os.)
                        </div>
                      </div>
                      
                      <button
                        onClick={() => cancelReservation(res.id)}
                        className="p-1.5 rounded-full text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                        title="Anuluj rezerwację"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-bordo-900 text-beige-100 pt-16 pb-8 border-t border-bordo-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          
          {/* Col 1: Brand & Bio (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col cursor-pointer" onClick={() => handleLinkClick('home')}>
              <span className="font-serif text-2xl font-bold tracking-wider text-gold-400">
                OSTERIA
              </span>
              <span className="font-serif text-sm tracking-[0.25em] text-white -mt-1 font-semibold">
                BELLA VISTA
              </span>
            </div>
            
            <p className="text-gold-200/70 font-light text-sm leading-relaxed max-w-sm">
              Tradycyjna włoska gościnność w sercu stolicy. Słyniemy z ręcznie robionego makaronu, selekcji win prosto z Italii oraz klimatycznych, niezapomnianych wieczorów.
            </p>

            <div className="flex items-center space-x-4">
              {/* Styled Social Placeholders */}
              <a href="#" className="w-8 h-8 rounded-full border border-gold-400/40 hover:border-gold-400 text-gold-300 hover:text-white flex items-center justify-center transition-all duration-300 bg-white/5">
                <span className="font-serif text-[10px] font-bold">IG</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gold-400/40 hover:border-gold-400 text-gold-300 hover:text-white flex items-center justify-center transition-all duration-300 bg-white/5">
                <span className="font-serif text-[10px] font-bold">FB</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gold-400/40 hover:border-gold-400 text-gold-300 hover:text-white flex items-center justify-center transition-all duration-300 bg-white/5">
                <span className="font-serif text-[10px] font-bold">TA</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-widest font-bold text-gold-300">
              Szybkie Linki
            </h4>
            <ul className="space-y-2 text-sm text-gold-100/80">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-gold-400 transition-colors duration-200 text-left cursor-pointer">
                  Strona Główna
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('o-nas')} className="hover:text-gold-400 transition-colors duration-200 text-left cursor-pointer">
                  O nas i lokalizacja
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('menu')} className="hover:text-gold-400 transition-colors duration-200 text-left cursor-pointer">
                  Karta Menu
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('galeria')} className="hover:text-gold-400 transition-colors duration-200 text-left cursor-pointer">
                  Nasza Galeria
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('rezerwacje')} className="hover:text-gold-400 transition-colors duration-200 text-left cursor-pointer">
                  Rezerwacja Stolików
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Contact (Col 4) */}
          <div className="lg:col-span-4 space-y-4 text-sm text-gold-100/80">
            <h4 className="font-serif text-sm uppercase tracking-widest font-bold text-gold-300">
              Kontakt i Adres
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <span>ul. Piękna 12, Warszawa, Polska</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+48221234567" className="hover:text-gold-400 transition-colors duration-200">
                  +48 22 123 45 67
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:kontakt@osteriabellavista.pl" className="hover:text-gold-400 transition-colors duration-200">
                  kontakt@osteriabellavista.pl
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>www.osteriabellavista.pl</span>
              </div>
            </div>
          </div>

        </div>

        {/* Horizontal separator */}
        <div className="border-t border-bordo-800/80 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gold-200/50">
          <p>
            &copy; {currentYear} Osteria Bella Vista. Wszystkie prawa zastrzeżone.
          </p>
          <p className="flex space-x-4">
            <a href="#" className="hover:text-gold-400 transition-colors">Polityka prywatności</a>
            <span>•</span>
            <a href="#" className="hover:text-gold-400 transition-colors">Regulamin rezerwacji</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
