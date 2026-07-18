import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { STUDIO_INFO } from '../../data';
import { useScrollDirection } from '../../hooks/useAnimations';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const location = useLocation();
  const { scrollY } = useScrollDirection();

  useEffect(() => {
    setAtTop(scrollY < 50);
  }, [scrollY]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-700 ${
          atTop && !menuOpen
            ? 'py-6 bg-transparent'
            : 'py-4 bg-charcoal-800/95 backdrop-blur-md border-b border-ivory-200/5'
        }`}
      >
        <div className="container-studio flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex flex-col leading-none">
            <span className="font-display text-xl font-light tracking-[0.15em] text-ivory-200 uppercase">
              {STUDIO_INFO.name}
            </span>
            <span className="text-[0.55rem] uppercase tracking-widest text-taupe group-hover:text-bronze transition-colors duration-300">
              {STUDIO_INFO.tagline}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${
                  location.pathname === link.path ? 'text-ivory-200' : ''
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="navActive"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-bronze"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${STUDIO_INFO.phone}`}
              className="text-xs tracking-widest text-taupe hover:text-ivory-200 transition-colors duration-300"
            >
              {STUDIO_INFO.phone}
            </a>
            <Link to="/contact" className="btn-primary text-xs py-3 px-6">
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-ivory-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[850] bg-charcoal-900/98 backdrop-blur-xl flex flex-col overflow-y-auto"
          >
            {/* Top spacer */}
            <div className="h-24 flex-shrink-0" />

            <div className="container-studio pb-12 flex flex-col">
              <nav className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1 + i * 0.07,
                    }}
                  >
                    <Link
                      to={link.path}
                      className="group flex items-center justify-between py-5 border-b border-ivory-200/10"
                    >
                      <span
                        className={`font-display text-4xl sm:text-5xl font-light tracking-tight transition-colors duration-300 ${
                          location.pathname === link.path
                            ? 'text-bronze'
                            : 'text-ivory-200 group-hover:text-bronze'
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12 space-y-4"
              >
                <p className="text-label">Contact</p>
                <a
                  href={`tel:${STUDIO_INFO.phone}`}
                  className="block font-sans text-lg text-ivory-200 hover:text-bronze transition-colors"
                >
                  {STUDIO_INFO.phone}
                </a>
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="block font-sans text-sm text-taupe hover:text-ivory-200 transition-colors"
                >
                  {STUDIO_INFO.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
