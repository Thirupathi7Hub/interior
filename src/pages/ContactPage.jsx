import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from 'lucide-react';
import { STUDIO_INFO, CONTACT_IMAGE } from '../data';
import { fadeUp, viewportConfig } from '../animations/variants';

const PROJECT_TYPES = [
  'Residential Interior',
  'Commercial Interior',
  'Modular Kitchen',
  'Space Planning',
  '3D Visualization',
  'Turnkey Project',
  'Other',
];

const BUDGET_RANGES = [
  'Under ₹5 Lakhs',
  '₹5 – 15 Lakhs',
  '₹15 – 30 Lakhs',
  '₹30 – 60 Lakhs',
  '₹60 Lakhs +',
  'Not decided yet',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const phoneNumber = STUDIO_INFO.whatsapp.replace(/[^0-9]/g, '');

    const lines = [
      `*New Inquiry - Dream Paradise Interiors*`,
      ``,
      `*Name:* ${formData.name || 'Not specified'}`,
      `*Email:* ${formData.email || 'Not specified'}`,
      `*Phone:* ${formData.phone || 'Not specified'}`,
      `*Project Type:* ${formData.projectType || 'Not specified'}`,
      `*Budget Range:* ${formData.budget || 'Not specified'}`,
    ];

    if (formData.message) {
      lines.push(`*Vision/Message:* ${formData.message}`);
    }

    const messageText = lines.join('\n');
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;

    setWhatsappUrl(url);

    // Open WhatsApp in a new window
    window.open(url, '_blank');

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="pt-24 bg-charcoal-800">
      {/* Header */}
      <section className="py-20 lg:py-28 container-studio">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-label text-bronze mb-4"
        >
          Get in Touch
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl sm:text-6xl lg:text-8xl font-light text-ivory-200 leading-[0.9]"
        >
          Let's Create
          <br />
          <span className="italic text-taupe">Something Beautiful.</span>
        </motion.h1>
      </section>

      <section className="pb-32 container-studio">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <CheckCircle size={40} className="text-bronze mx-auto mb-6" />
                <h3 className="font-display text-3xl text-ivory-200 mb-4">Inquiry Form Prepared!</h3>
                <p className="text-body max-w-md mx-auto mb-8">
                  Your project details have been formatted for WhatsApp. If WhatsApp did not open automatically, please tap below to send your message.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white border-none"
                >
                  <MessageCircle size={18} />
                  Send on WhatsApp
                </a>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name"
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                  <FormField
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="Phone Number"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />

                  <div className="flex flex-col gap-2">
                    <label htmlFor="projectType" className="text-xs uppercase tracking-widest text-taupe/70 font-sans">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="bg-transparent border-b border-ivory-200/20 py-3 text-ivory-200 text-sm font-sans outline-none focus:border-bronze transition-colors duration-300 appearance-none"
                    >
                      <option value="" className="bg-charcoal-800">Select project type</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-charcoal-800">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-xs uppercase tracking-widest text-taupe/70 font-sans mb-2">
                    Budget Range
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {BUDGET_RANGES.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: range })}
                        className={`px-4 py-2 text-xs font-sans transition-all duration-300 ${
                          formData.budget === range
                            ? 'bg-bronze text-charcoal-800'
                            : 'border border-ivory-200/20 text-taupe hover:border-ivory-200/50 hover:text-ivory-200'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-taupe/70 font-sans">
                    Tell Us About Your Vision
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your project, space, and what you're hoping to achieve..."
                    className="bg-transparent border-b border-ivory-200/20 py-3 text-ivory-200 text-sm font-sans outline-none focus:border-bronze transition-colors duration-300 resize-none placeholder:text-taupe/30"
                  />
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="inline-block w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <MessageCircle size={16} />
                      Send via WhatsApp
                    </span>
                  )}
                </button>
              </motion.form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-5">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 1.02 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.15 }}
              className="overflow-hidden aspect-[4/3] mb-10"
            >
              <img
                src={CONTACT_IMAGE}
                alt="Dream Paradise Interiors studio"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <div className="space-y-8">
              <ContactItem
                icon={<Phone size={16} />}
                label="Phone"
                content={STUDIO_INFO.phone}
                href={`tel:${STUDIO_INFO.phone}`}
              />
              <ContactItem
                icon={<MessageCircle size={16} />}
                label="WhatsApp"
                content="Chat on WhatsApp"
                href={`https://wa.me/${STUDIO_INFO.whatsapp}`}
                external
              />
              <ContactItem
                icon={<Mail size={16} />}
                label="Email"
                content={STUDIO_INFO.email}
                href={`mailto:${STUDIO_INFO.email}`}
              />
              <ContactItem
                icon={<MapPin size={16} />}
                label="Studio"
                content={STUDIO_INFO.address}
              />
            </div>

            {/* Hours */}
            <div className="mt-12 pt-8 border-t border-ivory-200/10">
              <p className="text-label text-taupe/60 mb-4">Studio Hours</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-taupe">Monday — Friday</span>
                  <span className="text-ivory-200/70">10:00 — 19:00</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-taupe">Saturday</span>
                  <span className="text-ivory-200/70">11:00 — 17:00</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-taupe">Sunday</span>
                  <span className="text-ivory-200/40">By appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormField({ label, id, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs uppercase tracking-widest text-taupe/70 font-sans">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="bg-transparent border-b border-ivory-200/20 py-3 text-ivory-200 text-sm font-sans outline-none focus:border-bronze transition-colors duration-300 placeholder:text-taupe/30"
      />
    </div>
  );
}

function ContactItem({ icon, label, content, href, external }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="flex items-start gap-4"
    >
      <div className="w-10 h-10 border border-ivory-200/15 flex items-center justify-center text-bronze flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-taupe/60 font-sans mb-1">{label}</p>
        {href ? (
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="text-sm text-ivory-200 hover:text-bronze transition-colors duration-300 font-sans"
          >
            {content}
          </a>
        ) : (
          <p className="text-sm text-ivory-200/70 font-sans leading-snug">{content}</p>
        )}
      </div>
    </motion.div>
  );
}
