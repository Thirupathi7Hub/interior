import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data';
import { useSwipe } from '../../hooks/useAnimations';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const goTo = (i, direction) => {
    setDir(direction);
    setCurrent(i);
  };

  const next = () => goTo((current + 1) % TESTIMONIALS.length, 1);
  const prev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, -1);

  const swipeHandlers = useSwipe(next, prev);

  const t = TESTIMONIALS[current];

  return (
    <section className="section-padding bg-charcoal-900 overflow-hidden">
      <div className="container-studio">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 lg:mb-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-label text-bronze mb-4"
            >
              Client Stories
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl font-light text-ivory-200"
            >
              What they say
            </motion.h2>
          </div>

          {/* Controls */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              id="testimonial-prev"
              onClick={prev}
              className="w-12 h-12 border border-ivory-200/20 flex items-center justify-center text-taupe hover:text-ivory-200 hover:border-ivory-200/50 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              id="testimonial-next"
              onClick={next}
              className="w-12 h-12 border border-ivory-200/20 flex items-center justify-center text-taupe hover:text-ivory-200 hover:border-ivory-200/50 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          {...swipeHandlers}
        >
          {/* Quote */}
          <div className="lg:col-span-8">
            {/* Large quote mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-bronze/20 mb-6"
            >
              <Quote size={48} />
            </motion.div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, x: dir < 0 ? 60 : -60, transition: { duration: 0.4 } }}
              >
                <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-ivory-200 leading-[1.3] mb-10 italic">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-bronze" />
                  <div>
                    <p className="font-sans text-sm font-light text-ivory-200">
                      {t.author}
                    </p>
                    <p className="text-xs text-taupe/60 font-sans mt-0.5">
                      {t.project}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Project image */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${current}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="aspect-[4/5] overflow-hidden"
              >
                <img
                  src={t.image}
                  alt={t.project}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className={`transition-all duration-400 ${
                i === current
                  ? 'w-8 h-1 bg-bronze'
                  : 'w-1 h-1 rounded-full bg-ivory-200/20 hover:bg-ivory-200/40'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
