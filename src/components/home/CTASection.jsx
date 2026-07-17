import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CTA_IMAGE } from '../../data';

export default function CTASection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px']);

  return (
    <section
      ref={ref}
      className="relative min-h-[85vh] flex items-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-[-10%] z-0"
      >
        <img
          src={CTA_IMAGE}
          alt="Premium interior design"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal-900/75" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 container-studio w-full text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-label text-bronze mb-8 lg:mb-10"
        >
          Ready to Begin?
        </motion.p>

        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-ivory-200 leading-[0.9] tracking-tight"
          >
            Let's create a space
          </motion.h2>
        </div>

        <div className="overflow-hidden mb-12 lg:mb-16">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-taupe leading-[0.9] tracking-tight italic"
          >
            that feels like you.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          viewport={{ once: true }}
          className="text-body max-w-md mx-auto mb-12 text-taupe"
        >
          Every meaningful transformation begins with a conversation. Let's talk about your vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-ivory-200 text-charcoal-800 px-10 py-5 text-xs uppercase tracking-widest font-sans transition-all duration-500 hover:bg-bronze hover:text-ivory-50"
          >
            Start a Conversation
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 border border-ivory-200/30 text-ivory-200 px-10 py-5 text-xs uppercase tracking-widest font-sans transition-all duration-500 hover:border-ivory-200/60"
          >
            View Our Work
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
