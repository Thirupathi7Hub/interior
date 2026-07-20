import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data';
import { fadeUp, viewportConfig } from '../animations/variants';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter(
      (p) => p.tags.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <div className="pt-24 min-h-screen bg-charcoal-800">
      {/* Page header */}
      <section className="py-20 lg:py-28 container-studio">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-label text-bronze mb-4"
        >
          Portfolio
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl sm:text-6xl lg:text-8xl font-light text-ivory-200 leading-[0.9] mb-6"
        >
          Our Work
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          animate="visible"
          className="text-body max-w-lg"
        >
          Each project is a unique story — of people, spaces, and the meaning between them. Browse our selected portfolio of residential and commercial work.
        </motion.p>
      </section>

      {/* Filters */}
      <section className="container-studio mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-2 sm:gap-4"
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest font-sans transition-all duration-400 ${
                activeFilter === cat
                  ? 'bg-bronze text-charcoal-800'
                  : 'border border-ivory-200/20 text-taupe hover:border-ivory-200/50 hover:text-ivory-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Projects grid */}
      <section className="container-studio pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
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
          <div className="text-center py-14">
            <p className="text-taupe text-body">No projects found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function ProjectCard({ project, index, featured }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.08,
        },
      }}
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
            className="w-full h-full object-cover transition-transform duration-1000 ease-expo-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/25 transition-colors duration-500" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-400 p-6">
            <div className="flex items-center gap-3 text-ivory-200">
              <span className="text-xs uppercase tracking-widest font-sans">View Project</span>
              <div className="w-8 h-8 border border-ivory-200/50 flex items-center justify-center">
                <ArrowUpRight size={12} />
              </div>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="text-[0.6rem] uppercase tracking-widest font-sans text-ivory-200/70 bg-charcoal-900/60 backdrop-blur-sm px-3 py-1.5">
              {project.category}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="pt-5 pb-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-sans font-light text-ivory-200 text-base group-hover:text-bronze transition-colors duration-300 mb-1">
                {project.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-taupe/60 font-sans">
                <span>{project.location}</span>
                <span>·</span>
                <span>{project.year}</span>
              </div>
            </div>
            <ArrowUpRight
              size={16}
              className="text-taupe/30 group-hover:text-bronze transition-all duration-300 flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
