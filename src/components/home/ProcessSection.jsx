import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../data';
import { fadeUp, viewportConfig } from '../../animations/variants';

export default function ProcessSection() {
  return (
    <section className="section-padding bg-charcoal-900">
      <div className="container-studio">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-label text-bronze mb-4"
          >
            How We Work
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ivory-200 leading-[1.0]"
          >
            Our design
            <br />
            <span className="italic">process</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-[3.5rem] top-0 bottom-0 w-px bg-ivory-200/10" />

          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12,
      }}
      viewport={{ once: true, amount: 0.1 }}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-10 lg:py-12 border-b border-ivory-200/8 last:border-0"
    >
      {/* Step number + dot */}
      <div className="lg:col-span-2 flex items-start gap-4">
        <div className="relative z-10 flex-shrink-0">
          {/* Dot on the timeline (desktop) */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
            viewport={{ once: true }}
            className="hidden lg:block w-3 h-3 rounded-full border border-bronze bg-charcoal-900 group-hover:bg-bronze transition-colors duration-400"
          />
        </div>
        <span className="font-display text-4xl lg:text-5xl font-light text-ivory-200/10 group-hover:text-bronze/20 transition-colors duration-500 lg:hidden">
          {step.number}
        </span>
      </div>

      <div className="lg:col-span-10 lg:pl-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-sans text-xs tracking-widest text-bronze/70">
                {step.number}
              </span>
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
                viewport={{ once: true }}
                className="h-px w-8 bg-bronze/30"
              />
              <h3 className="font-sans text-base font-light text-ivory-200 group-hover:text-bronze transition-colors duration-300">
                {step.title}
              </h3>
            </div>
            <p className="text-body text-sm max-w-lg">
              {step.description}
            </p>
          </div>

          <div className="flex-shrink-0">
            <div className="inline-flex items-center gap-2 text-xs font-sans text-taupe/50">
              <span className="w-4 h-px bg-taupe/30" />
              <span>{step.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
