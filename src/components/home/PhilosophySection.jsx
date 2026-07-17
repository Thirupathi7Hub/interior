import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportConfig } from '../../animations/variants';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const dividerVariants = {
  hidden: { scaleX: 0, originX: 0.5 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function PhilosophySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section
      ref={ref}
      className="relative py-32 lg:py-48 overflow-hidden bg-charcoal-900"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-[-10%] z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=60"
          alt="Design philosophy background"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal-900/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container-studio">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Label */}
          <motion.p
            variants={fadeUpVariants}
            className="text-label text-bronze mb-12 lg:mb-16"
          >
            Our Philosophy
          </motion.p>

          {/* Large statement */}
          <div className="mb-10 lg:mb-14">
            {/* "Every space has a story." */}
            <p className="overflow-hidden">
              <motion.span
                variants={lineVariants}
                className="inline-block font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-ivory-200 leading-tight tracking-tight"
              >
                Every space has <span className="italic">a story.</span>
              </motion.span>
            </p>
          </div>

          <div className="mb-16">
            <p className="overflow-hidden">
              <motion.span
                variants={lineVariants}
                className="inline-block font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-taupe leading-[0.9] tracking-tight"
              >
                We help it speak.
              </motion.span>
            </p>
          </div>

          {/* Divider */}
          <motion.div
            variants={dividerVariants}
            className="h-px bg-bronze/30 max-w-xs mx-auto mb-10"
          />

          {/* Subtext */}
          <motion.p
            variants={fadeUpVariants}
            className="font-sans font-light text-taupe text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            We believe that thoughtful design is not a luxury — it is a fundamental human need. 
            We create spaces that resonate deeply, designed to be lived in and loved.
          </motion.p>
        </motion.div>
      </div>

      {/* Subtle decorative element */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        viewport={{ once: true }}
        className="absolute bottom-12 right-12 hidden lg:block"
      >
        <div className="w-16 h-16 border border-bronze/20 rotate-45" />
      </motion.div>
    </section>
  );
}
