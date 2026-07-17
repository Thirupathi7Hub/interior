import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, LayoutGrid, ChefHat, Layers, Key, ArrowUpRight, Plus, Minus } from 'lucide-react';
import { SERVICES } from '../../data';
import { fadeUp, staggerContainer, viewportConfig } from '../../animations/variants';
import { useMediaQuery } from '../../hooks/useAnimations';

const ICON_MAP = { Home, Building2, LayoutGrid, ChefHat, Layers, Key };

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  return (
    <section className="section-padding bg-charcoal-800">
      <div className="container-studio">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 lg:mb-24">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-label text-bronze mb-4"
            >
              What We Do
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ivory-200 leading-[1.0]"
            >
              Design services
              <br />
              <span className="italic text-taupe">tailored for you</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-body lg:pt-16 max-w-md"
          >
            From concept to completion, we offer a comprehensive range of interior design services — each delivered with the same commitment to quality and detail.
          </motion.p>
        </div>

        {/* Mobile: Accordion */}
        {isMobile ? (
          <MobileAccordion />
        ) : (
          /* Desktop: Hover reveal */
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Service list */}
            <div className="col-span-7">
              {SERVICES.map((service, i) => {
                const Icon = ICON_MAP[service.icon];
                const isHovered = hoveredService === service.id;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                    viewport={{ once: true, amount: 0.1 }}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    className="group border-b border-ivory-200/10 cursor-pointer"
                  >
                    <div className="flex items-center justify-between py-7">
                      <div className="flex items-center gap-5">
                        <span className="text-xs text-taupe/50 font-sans tracking-widest w-6">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className={`transition-colors duration-300 ${isHovered ? 'text-bronze' : 'text-taupe'}`}>
                          <Icon size={18} />
                        </div>
                        <span
                          className={`font-sans text-base font-light transition-colors duration-300 ${
                            isHovered ? 'text-ivory-200' : 'text-ivory-200/70'
                          }`}
                        >
                          {service.title}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className={`transition-all duration-300 ${
                          isHovered
                            ? 'text-bronze translate-x-0.5 -translate-y-0.5'
                            : 'text-taupe/30'
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <Link to="/services" className="btn-primary">
                  Explore All Services
                  <ArrowUpRight size={14} />
                </Link>
              </motion.div>
            </div>

            {/* Preview image */}
            <div className="col-span-5 sticky top-24">
              <div className="aspect-[3/4] overflow-hidden bg-charcoal-700">
                <AnimatePresence mode="wait">
                  {hoveredService ? (
                    <motion.img
                      key={hoveredService}
                      src={SERVICES.find((s) => s.id === hoveredService)?.image}
                      alt="Service preview"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex flex-col items-center justify-center p-12 text-center"
                    >
                      <div className="w-16 h-px bg-bronze/30 mb-6" />
                      <p className="text-label text-taupe/40">
                        Hover a service to preview
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Service label overlay */}
                <AnimatePresence>
                  {hoveredService && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-6 left-6 right-6"
                    >
                      <p className="text-label text-bronze mb-1">
                        {SERVICES.find((s) => s.id === hoveredService)?.category}
                      </p>
                      <p className="font-display text-xl text-ivory-200">
                        {SERVICES.find((s) => s.id === hoveredService)?.title}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function MobileAccordion() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="space-y-0">
      {SERVICES.map((service, i) => {
        const Icon = ICON_MAP[service.icon];
        const isOpen = openId === service.id;

        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            viewport={{ once: true }}
            className="border-b border-ivory-200/10"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : service.id)}
              className="flex items-center justify-between w-full py-6 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <div className={`transition-colors duration-300 ${isOpen ? 'text-bronze' : 'text-taupe'}`}>
                  <Icon size={18} />
                </div>
                <span className={`font-sans font-light text-sm transition-colors duration-300 ${isOpen ? 'text-ivory-200' : 'text-ivory-200/70'}`}>
                  {service.title}
                </span>
              </div>
              {isOpen ? (
                <Minus size={16} className="text-bronze flex-shrink-0" />
              ) : (
                <Plus size={16} className="text-taupe flex-shrink-0" />
              )}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full aspect-video object-cover mb-6"
                      loading="lazy"
                    />
                    <p className="text-body text-sm mb-6">{service.description}</p>
                    <Link
                      to="/services"
                      className="text-xs uppercase tracking-widest text-bronze hover:text-ivory-200 transition-colors duration-300 flex items-center gap-2"
                    >
                      Learn More <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
