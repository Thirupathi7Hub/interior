import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO, ABOUT_IMAGE } from '../../data';
import { useCountUp } from '../../hooks/useAnimations';
import { fadeUp, clipReveal, viewportConfig } from '../../animations/variants';

export default function AboutSection() {
  return (
    <section className="section-padding bg-charcoal-800">
      <div className="container-studio">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 1.02 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-5 relative overflow-hidden aspect-[3/4]"
          >
            <img
              src={ABOUT_IMAGE}
              alt="Studio interior"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-charcoal-800/60 to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7 lg:pl-8">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-label text-bronze mb-4"
            >
              About the Studio
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ivory-200 leading-[1.0] mb-8"
            >
              Designed with
              <br />
              <span className="italic">intention</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-body mb-6 max-w-lg"
            >
              Founded in 2014, Luminae Interior Studio was born from a belief that exceptional design belongs in every home — not just the privileged few. Over a decade, we've grown from a small Mumbai practice into one of the city's most respected design studios.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-body text-sm mb-12 max-w-lg"
            >
              Our process is deeply personal. We listen before we design. We observe before we decide. And we never stop until the space feels truly, undeniably right.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
              {STUDIO_INFO.stats.map((stat, i) => (
                <StatItem key={stat.label} stat={stat} delay={i * 0.1} />
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              custom={0.5}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <Link to="/about" className="btn-ghost group">
                Our Story
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, delay }) {
  const { count, ref } = useCountUp(stat.number, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      viewport={{ once: true, amount: 0.1 }}
      className="flex flex-col"
    >
      <span className="font-display text-3xl sm:text-4xl font-light text-ivory-200 mb-1 stat-number">
        {count}{stat.suffix}
      </span>
      <span className="text-xs text-taupe/70 font-sans leading-snug">
        {stat.label}
      </span>
    </motion.div>
  );
}
