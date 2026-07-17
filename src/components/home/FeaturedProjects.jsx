import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../../data';
import { fadeUp, clipReveal, lineReveal, viewportConfig, viewportConfigEarly } from '../../animations/variants';

const featuredProjects = PROJECTS.filter((p) => p.featured);

export default function FeaturedProjects() {
  return (
    <section className="section-padding bg-charcoal-800">
      <div className="container-studio">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-label text-bronze mb-4"
            >
              Selected Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ivory-200 leading-[1.0]"
            >
              Projects that
              <br />
              <span className="italic">define us</span>
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <Link
              to="/projects"
              className="btn-ghost group"
            >
              View All Projects
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Projects layout — editorial asymmetric */}
        <div className="space-y-24 lg:space-y-40">
          {featuredProjects.map((project, i) => (
            <ProjectItem key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
    >
      {/* Image block */}
      <motion.div
        variants={clipReveal}
        className={`relative overflow-hidden self-center w-full row-start-1 lg:row-start-1 aspect-[4/3] lg:aspect-[16/11] ${
          isEven
            ? 'lg:col-span-7'
            : 'lg:col-span-7 lg:col-start-6'
        }`}
      >
        <Link to={`/projects/${project.id}`} className="group block h-full">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-expo-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors duration-500" />
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <div className="w-10 h-10 bg-bronze flex items-center justify-center">
              <ArrowUpRight size={16} className="text-charcoal-800" />
            </div>
          </div>
        </Link>

        {/* Project number */}
        <span className="absolute top-6 left-6 font-sans text-xs tracking-widest text-ivory-200/40">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Text block */}
      <div
        className={`flex flex-col justify-center self-center row-start-2 lg:row-start-1 ${
          isEven
            ? 'lg:col-span-5 lg:col-start-8'
            : 'lg:col-span-5 lg:col-start-1'
        }`}
      >
        <motion.div
          variants={lineReveal}
          className="h-px bg-bronze/40 mb-8 w-12"
        />

        <motion.p
          variants={fadeUp}
          custom={0.1}
          className="text-label text-bronze mb-4"
        >
          {project.category}
        </motion.p>

        <motion.h3
          variants={fadeUp}
          custom={0.2}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-ivory-200 leading-[1.0] mb-4"
        >
          {project.title}
        </motion.h3>

        <motion.p
          variants={fadeUp}
          custom={0.3}
          className="text-body text-sm mb-6 max-w-xs"
        >
          {project.description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={0.4}
          className="flex items-center gap-6 mb-10 text-taupe/60 text-xs font-sans"
        >
          <span>{project.location}</span>
          <span className="w-1 h-1 rounded-full bg-taupe/40" />
          <span>{project.year}</span>
        </motion.div>

        <motion.div variants={fadeUp} custom={0.5}>
          <Link
            to={`/projects/${project.id}`}
            className="btn-ghost group text-sm"
          >
            View Project
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
