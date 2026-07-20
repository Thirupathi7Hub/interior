import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data';
import { fadeUp, viewportConfig } from '../animations/variants';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div ref={containerRef} className="pt-24 min-h-screen bg-charcoal-800 relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-bronze origin-left z-50"
        style={{ scaleX }}
      />

      {/* Page header */}
      <section className="py-20 lg:py-28 container-studio">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-label text-bronze mb-4"
        >
          Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-6xl lg:text-8xl font-light text-ivory-200 leading-[0.9] mb-6"
        >
          Our Work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-body max-w-lg"
        >
          Each project is a unique story — of people, spaces, and the meaning between them. Browse our selected portfolio of residential and commercial work.
        </motion.p>
      </section>

      {/* Animated Filters */}
      <section className="container-studio mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-2 sm:gap-4 relative"
        >
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-5 py-2.5 text-xs uppercase tracking-widest font-sans transition-colors duration-300 z-10 ${
                  isActive ? 'text-charcoal-800 font-medium' : 'text-taupe hover:text-ivory-200 border border-ivory-200/20 hover:border-ivory-200/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-bronze z-[-1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* Projects grid with scroll reveal */}
      <section className="container-studio pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                featured={i === 0 && activeFilter === 'All'}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-14"
          >
            <p className="text-taupe text-body">No projects found in this category.</p>
          </motion.div>
        )}
      </section>
    </div>
  );
}

function ProjectCard({ project, index, featured }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className={`group ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      <Link to={`/projects/${project.id}`} className="block">
        {/* Image */}
        <div
          className={`overflow-hidden relative ${
            featured ? 'aspect-[16/9]' : 'aspect-[4/3]'
          }`}
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/35 transition-colors duration-500" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-400 p-6 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent">
            <div className="flex items-center gap-3 text-ivory-200">
              <span className="text-xs uppercase tracking-widest font-sans font-medium">View Project</span>
              <div className="w-8 h-8 border border-ivory-200/60 bg-charcoal-900/40 backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[0.65rem] uppercase tracking-widest font-sans text-ivory-200 bg-charcoal-900/70 backdrop-blur-md px-3 py-1.5 border border-ivory-200/10">
              {project.category}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="pt-5 pb-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-sans font-light text-ivory-200 text-lg group-hover:text-bronze transition-colors duration-300 mb-1">
                {project.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-taupe/70 font-sans">
                <span>{project.location}</span>
                <span>·</span>
                <span>{project.year}</span>
              </div>
            </div>
            <motion.div
              className="w-7 h-7 rounded-full border border-ivory-200/10 flex items-center justify-center text-taupe/40 group-hover:text-bronze group-hover:border-bronze/40 transition-colors duration-300 flex-shrink-0"
            >
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
