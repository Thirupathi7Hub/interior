import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
import { Home, Building2, LayoutGrid, ChefHat, Layers, Key } from 'lucide-react';
import { SERVICES } from '../data';
import { fadeUp, viewportConfig } from '../animations/variants';

const ICON_MAP = { Home, Building2, LayoutGrid, ChefHat, Layers, Key };

export default function ServicesPage() {
  return (
    <div className="pt-24 bg-charcoal-800">
      {/* Header */}
      <section className="py-12 lg:py-16 container-studio">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-label text-bronze mb-4"
        >
          What We Offer
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl sm:text-6xl lg:text-8xl font-light text-ivory-200 leading-[0.9] mb-6"
        >
          Our Services
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          animate="visible"
          className="text-body max-w-lg"
        >
          A comprehensive range of interior design services, each delivered with the same commitment to quality and attention to detail that defines everything we do.
        </motion.p>
      </section>

      {/* Services */}
      <div className="pb-32">
        {SERVICES.map((service, i) => (
          <ServiceBlock key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* CTA */}
      <section className="py-14 bg-charcoal-900">
        <div className="container-studio text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ivory-200 mb-6"
          >
            Ready to start
            <span className="italic text-taupe"> your project?</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-body max-w-md mx-auto mb-10"
          >
            Let's have a conversation about your vision and find the right service for your needs.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <Link to="/contact" className="btn-primary">
              Book a Consultation
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ServiceBlock({ service, index }) {
  const Icon = ICON_MAP[service.icon];
  const isEven = index % 2 === 0;

  return (
    <section
      id={`service-${service.id}`}
      className={`py-12 lg:py-16 border-b border-ivory-200/8 ${
        index % 2 === 1 ? 'bg-charcoal-900' : ''
      }`}
    >
      <div className="container-studio">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.1 }}
            className={`relative overflow-hidden aspect-[4/3] ${
              !isEven ? 'lg:order-last' : ''
            }`}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Content */}
          <div className={isEven ? 'lg:order-last' : ''}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="text-bronze">
                <Icon size={20} />
              </div>
              <span className="text-label text-bronze">{service.category}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              viewport={{ once: true, amount: 0.1 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-ivory-200 leading-[1.0] mb-6"
            >
              {service.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-body mb-8"
            >
              {service.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-xs uppercase tracking-widest text-taupe/60 font-sans mb-4">
                What's Included
              </p>
              <ul className="space-y-2.5">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-taupe">
                    <CheckCircle size={14} className="text-bronze flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-10 p-6 border border-ivory-200/8 bg-charcoal-900/40"
            >
              <p className="text-xs uppercase tracking-widest text-taupe/60 font-sans mb-3">
                Our Approach
              </p>
              <p className="text-sm text-taupe leading-relaxed">{service.process}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              viewport={{ once: true }}
            >
              <Link to="/contact" className="btn-primary">
                Enquire About This Service
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
