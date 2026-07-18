import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, MapPin, Calendar, Maximize } from 'lucide-react';
import { PROJECTS } from '../data';
import { fadeUp, viewportConfig } from '../animations/variants';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const project = PROJECTS.find((p) => p.id === id);


  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
    <article className="bg-charcoal-800">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[85vh] overflow-hidden">
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-[-10%] z-0"
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800 via-charcoal-900/40 to-charcoal-900/30" />
        </motion.div>

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 sm:left-8 lg:left-16 z-20 flex items-center gap-2 text-ivory-200/60 hover:text-ivory-200 transition-colors duration-300 text-xs uppercase tracking-widest font-sans"
        >
          <ArrowLeft size={14} />
          Back
        </motion.button>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-0 left-0 right-0 z-10 pb-12 lg:pb-20"
        >
          <div className="container-studio">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-label text-bronze mb-4"
            >
              {project.category}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="font-display text-5xl sm:text-6xl lg:text-8xl font-light text-ivory-200 leading-[0.9] mb-6"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
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
        </motion.div>
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



    </article>
  );
}

