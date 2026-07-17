import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '../../data';
import { staggerContainer, staggerItem, viewportConfig } from '../../animations/variants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 border-t border-ivory-200/5">
      <div className="container-studio py-20 lg:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand column */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-2xl font-light tracking-[0.15em] text-ivory-200 uppercase">
                {STUDIO_INFO.name}
              </span>
              <br />
              <span className="text-[0.6rem] uppercase tracking-widest text-taupe">
                {STUDIO_INFO.tagline}
              </span>
            </Link>
            <p className="text-body text-sm max-w-xs leading-relaxed mb-8">
              {STUDIO_INFO.description} Based in Mumbai, designing for those who believe in the transformative power of space.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={STUDIO_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-ivory-200/20 flex items-center justify-center text-taupe hover:text-ivory-200 hover:border-bronze transition-all duration-300"
                aria-label="Social Media"
              >
                <Share2 size={16} />
              </a>
              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="w-10 h-10 border border-ivory-200/20 flex items-center justify-center text-taupe hover:text-ivory-200 hover:border-bronze transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={staggerItem}>
            <p className="text-label mb-6">Navigate</p>
            <ul className="space-y-3">
              {['Home', 'Projects', 'Services', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-taupe text-sm hover:text-ivory-200 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>{item}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <p className="text-label mb-6">Contact</p>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${STUDIO_INFO.phone}`}
                  className="flex items-start gap-3 text-taupe text-sm hover:text-ivory-200 transition-colors duration-300"
                >
                  <Phone size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{STUDIO_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="flex items-start gap-3 text-taupe text-sm hover:text-ivory-200 transition-colors duration-300"
                >
                  <Mail size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{STUDIO_INFO.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-taupe text-sm">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{STUDIO_INFO.address}</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-ivory-200/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-taupe/60 font-sans">
            &copy; {year} {STUDIO_INFO.brand}. All rights reserved.
          </p>
          <p className="text-xs text-taupe/40 font-sans">
            Design &amp; Craft — Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
}
