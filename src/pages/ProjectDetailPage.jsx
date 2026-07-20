import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, MapPin, Calendar, Maximize } from 'lucide-react';
import { PROJECTS } from '../data';
import { fadeUp, viewportConfig } from '../animations/variants';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const project = PROJECTS.find((p) => p.id === id);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal-800">
        <div className="text-center">
          <p className="text-taupe mb-6">Project not found.</p>
          <Link to="/projects" className="btn-primary">Back to Projects</Link>
        </div>
      </div>
    );
  }



  return (
    <article className="bg-charcoal-800 relative">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-bronze origin-left z-50"
        style={{ scaleX }}
      />
      {/* Header */}
      <section className="pt-32 pb-16 bg-charcoal-900 border-b border-ivory-200/5">
        <div className="container-studio relative">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-ivory-200/60 hover:text-ivory-200 transition-colors duration-300 text-xs uppercase tracking-widest font-sans mb-8"
          >
            <ArrowLeft size={14} />
            Back
          </motion.button>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-label text-bronze mb-4"
            >
              {project.category}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display text-5xl sm:text-6xl lg:text-8xl font-light text-ivory-200 leading-[0.9] mb-6"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 text-ivory-200/60 text-xs font-sans"
            >
              <span className="flex items-center gap-2">
                <MapPin size={12} />
                {project.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={12} />
                {project.year}
              </span>
              {project.size && (
                <span className="flex items-center gap-2">
                  <Maximize size={12} />
                  {project.size}
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project story */}
      <section className="py-12 lg:py-16 container-studio">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-label text-bronze mb-6"
            >
              The Story
            </motion.p>
            {project.story.split('\n\n').map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="text-body mb-6 leading-loose"
              >
                {para}
              </motion.p>
            ))}
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <motion.div
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="sticky top-28"
            >
              <p className="text-label text-bronze mb-6">Design Concept</p>
              <p className="text-body text-sm leading-loose mb-10 italic font-display text-xl text-ivory-200/80">
                "{project.concept}"
              </p>

              <div className="space-y-4">
                {[
                  { label: 'Category', value: project.category },
                  { label: 'Location', value: project.location },
                  { label: 'Year', value: project.year },
                  project.size && { label: 'Area', value: project.size },
                  project.duration && { label: 'Duration', value: project.duration },
                ].filter(Boolean).map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-3 border-b border-ivory-200/8">
                    <span className="text-xs uppercase tracking-widest text-taupe/60 font-sans">{item.label}</span>
                    <span className="text-xs text-ivory-200/80 font-sans">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Gallery at the end */}
      {project.images && project.images.length > 0 && (
        <section className="pb-24 lg:pb-32 container-studio">
          <div className="space-y-8 lg:space-y-12">
            {project.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={viewportConfig}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden aspect-[16/9] w-full bg-charcoal-900/50 group border border-ivory-200/5"
              >
                <img
                  src={img}
                  alt={`${project.title} - ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

    </article>
  );
}

