import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { HERO_SLIDES } from '../../data';
import { useSwipe } from '../../hooks/useAnimations';

const AUTOPLAY_INTERVAL = 6000;

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.04,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.6, ease: 'easeOut' },
      scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    },
  },
  exit: (dir) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.97,
    transition: {
      x: { duration: 1.1, ease: [0.87, 0, 0.13, 1] },
      opacity: { duration: 0.5, ease: 'easeIn' },
      scale: { duration: 1.1, ease: [0.87, 0, 0.13, 1] },
    },
  }),
};

const textVariants = {
  enter: { y: 30, opacity: 0 },
  center: (delay = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
  exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
};

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const progressStartRef = useRef(null);

  const totalSlides = HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[currentIndex];

  const goTo = useCallback((index, dir) => {
    setDirection(dir);
    setCurrentIndex(index);
    setProgress(0);
    progressStartRef.current = null;
  }, []);

  const next = useCallback(() => {
    goTo((currentIndex + 1) % totalSlides, 1);
  }, [currentIndex, totalSlides, goTo]);

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + totalSlides) % totalSlides, -1);
  }, [currentIndex, totalSlides, goTo]);

  // Progress animation
  useEffect(() => {
    if (isPaused) {
      cancelAnimationFrame(progressRef.current);
      return;
    }

    const animate = (timestamp) => {
      if (!progressStartRef.current) progressStartRef.current = timestamp;
      const elapsed = timestamp - progressStartRef.current;
      const p = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      setProgress(p);

      if (p < 100) {
        progressRef.current = requestAnimationFrame(animate);
      } else {
        next();
      }
    };

    progressRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(progressRef.current);
  }, [currentIndex, isPaused, next]);

  const swipeHandlers = useSwipe(next, prev);

  const formatNumber = (n) => String(n + 1).padStart(2, '0');

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] overflow-hidden bg-charcoal-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      {...swipeHandlers}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 will-change-transform"
        >
          {/* Image */}
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-charcoal-900/40 to-charcoal-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-charcoal-900/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-end container-studio pb-24 lg:pb-32">
          <div className="w-full max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-content-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                  transition: { duration: 0.3, ease: 'easeIn' },
                }}
                className="w-full"
              >
                {/* Slide counter */}
                <div className="flex items-center gap-6 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-bronze font-sans text-sm font-light tracking-widest">
                      {formatNumber(currentIndex)}
                    </span>
                    <div className="w-8 h-px bg-bronze/60" />
                    <span className="text-ivory-200/40 font-sans text-sm">
                      {formatNumber(totalSlides - 1)}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div className="min-h-[3.2rem] sm:min-h-[4.5rem] lg:min-h-[5.5rem] flex items-end mb-4 sm:mb-6">
                  <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-ivory-200 leading-[0.95]">
                    {currentSlide.title}
                  </h1>
                </div>

                {/* Location */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 mb-8 sm:mb-10">
                  <div>
                    <p className="text-label text-taupe/70 mb-1">Location</p>
                    <p className="font-sans text-sm text-ivory-200/80">
                      {currentSlide.location}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div>
                  <Link
                    to={`/projects/${currentSlide.projectId}`}
                    className="group inline-flex items-center gap-4 border border-ivory-200/30 px-8 py-4 text-ivory-200 text-xs uppercase tracking-widest font-sans transition-all duration-500 hover:bg-ivory-200 hover:text-charcoal-800 hover:border-ivory-200"
                  >
                    View Project
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right side controls */}
      <div className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        <button
          id="hero-prev"
          onClick={prev}
          className="w-10 h-10 lg:w-12 lg:h-12 border border-ivory-200/20 flex items-center justify-center text-ivory-200/60 hover:text-ivory-200 hover:border-ivory-200/60 transition-all duration-300 hover:bg-ivory-200/5"
          aria-label="Previous slide"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          id="hero-next"
          onClick={next}
          className="w-10 h-10 lg:w-12 lg:h-12 border border-ivory-200/20 flex items-center justify-center text-ivory-200/60 hover:text-ivory-200 hover:border-ivory-200/60 transition-all duration-300 hover:bg-ivory-200/5"
          aria-label="Next slide"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Dot indicators */}
        <div className="container-studio flex items-center justify-center gap-3 pb-6">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
              className="group relative flex items-center"
              aria-label={`Go to slide ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === currentIndex
                    ? 'w-8 h-1 bg-bronze'
                    : 'w-1 h-1 bg-ivory-200/30 hover:bg-ivory-200/60'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Progress line */}
        <div className="h-px bg-ivory-200/10">
          <motion.div
            className="h-full bg-bronze origin-left"
            style={{ scaleX: progress / 100 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-16 right-8 lg:right-16 z-20 hidden lg:flex flex-col items-center gap-3"
      >
        <span className="text-[0.6rem] uppercase tracking-widest text-ivory-200/40 -rotate-90 mb-6">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-ivory-200/40"
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
