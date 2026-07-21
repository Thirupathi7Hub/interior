import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { STUDIO_INFO, TEAM, PROJECTS, ABOUT_IMAGE } from '../data';
import { useCountUp } from '../hooks/useAnimations';
import { fadeUp, viewportConfig } from '../animations/variants';

export default function AboutPage() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="pt-24 bg-charcoal-800">
      {/* Hero header */}
      <section className="py-20 lg:py-28">
        <div className="container-studio">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-label text-bronze mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl sm:text-6xl lg:text-8xl font-light text-ivory-200 leading-[0.9] mb-12"
          >
            About Luxe Studio
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              animate="visible"
            >
              <p className="text-body text-lg leading-loose mb-6">
                Luxestudio Turnkey Interiors was founded with a singular commitment: delivering 5.0-star rated turnkey interior transformations combining spatial poetry with architectural precision.
              </p>
              <p className="text-body leading-loose">
                Founded by Prakash, our studio serves Tirunelveli, Madurai, and surrounding regions with a dedicated team of interior designers, space planners, and master craftsmen.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              animate="visible"
            >
              <p className="text-body leading-loose mb-6">
                Our work spans the full spectrum — intimate apartments, sprawling family homes, boutique commercial spaces, and everything in between. But regardless of scale, our process is always the same: deeply personal, rigorously designed, and beautifully executed.
              </p>
              <p className="text-body leading-loose">
                We believe that a truly great interior is not about trends or budgets. It is about understanding who you are, and creating a space that reflects that back to you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Studio image */}
      <section className="container-studio">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.15 }}
          className="relative overflow-hidden aspect-[21/9]"
        >
          <img
            src={ABOUT_IMAGE}
            alt="Luxestudio Turnkey Interiors workspace"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal-900/30" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 lg:py-16 bg-charcoal-900">
        <div className="container-studio">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {STUDIO_INFO.stats.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Designer profile */}
      {TEAM.map((member) => (
        <section key={member.name} className="py-12 lg:py-16 container-studio">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 1.02 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.15 }}
              className="lg:col-span-4 overflow-hidden aspect-[3/4]"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </motion.div>

            <div className="lg:col-span-8">
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="text-label text-bronze mb-4"
              >
                {member.role}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={0.1}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="font-display text-4xl sm:text-5xl font-light text-ivory-200 leading-[1.0] mb-8"
              >
                {member.name}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                custom={0.2}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="text-body leading-loose mb-8"
              >
                {member.bio}
              </motion.p>

              <motion.blockquote
                variants={fadeUp}
                custom={0.3}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="border-l-2 border-bronze/40 pl-6 mb-10"
              >
                <p className="font-display text-xl font-light text-ivory-200/70 italic leading-snug">
                  "{member.philosophy}"
                </p>
              </motion.blockquote>

              <motion.div
                variants={fadeUp}
                custom={0.4}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <p className="text-label text-taupe/60 mb-5">Recognition</p>
                <ul className="space-y-3">
                  {member.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-taupe">
                      <Award size={14} className="text-bronze flex-shrink-0 mt-0.5" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Design Philosophy */}
      <section className="py-12 lg:py-16 bg-charcoal-900">
        <div className="container-studio max-w-3xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-label text-bronze mb-6"
          >
            Design Philosophy
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-display text-4xl sm:text-5xl font-light text-ivory-200 leading-[1.0] mb-10"
          >
            {STUDIO_INFO.philosophy}
          </motion.h2>

          {[
            'We design from the inside out — beginning with who you are before thinking about what things will look like. This means our spaces feel authentic rather than applied.',
            'We have a deep respect for materials and craft. We believe in quality over quantity, in choosing fewer things and choosing them well.',
            'We value longevity over trendiness. Our aim is to create spaces that are as beautiful in twenty years as they are on the day of completion.',
          ].map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={i * 0.1 + 0.2}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-body leading-loose mb-6"
            >
              {para}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Selected projects */}
      <section className="py-12 lg:py-16 container-studio">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-label text-bronze mb-3">Selected Work</p>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-ivory-200">Projects that define us</h2>
          </div>
          <Link to="/projects" className="btn-ghost hidden sm:flex group">
            View All <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="group"
            >
              <Link to={`/projects/${project.id}`}>
                <div className="aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <p className="text-label text-bronze mb-1">{project.category}</p>
                <h3 className="font-sans text-base text-ivory-200 group-hover:text-bronze transition-colors duration-300">
                  {project.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-charcoal-900 text-center">
        <div className="container-studio">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-display text-4xl sm:text-5xl font-light text-ivory-200 mb-6"
          >
            Let's work together
          </motion.h2>
          <motion.div
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <Link to="/contact" className="btn-primary">
              Start a Conversation
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
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
    >
      <span className="block font-display text-5xl sm:text-6xl font-light text-ivory-200 mb-2">
        {count}{stat.suffix}
      </span>
      <span className="text-xs uppercase tracking-widest text-taupe/60 font-sans">
        {stat.label}
      </span>
    </motion.div>
  );
}
