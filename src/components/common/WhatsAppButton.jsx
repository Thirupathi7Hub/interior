import { motion } from 'framer-motion';
import { STUDIO_INFO } from '../../data';

export default function WhatsAppButton() {
  const phoneNumber = STUDIO_INFO.whatsapp.replace(/[^0-9]/g, ''); // Ensure only digits
  const message = encodeURIComponent(
    `Hi ${STUDIO_INFO.brand}, I would like to inquire about your interior design services.`
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 1.5,
      }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[999] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_18px_rgba(37,211,102,0.4)] cursor-pointer focus:outline-none"
      aria-label="Contact us on WhatsApp"
    >
      {/* Pulse/Glow animation effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10" />

      {/* SVG Icon */}
      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.906-6.99C16.246 1.875 13.766.845 11.13.845 5.698.845 1.275 5.27 1.271 10.715c-.001 1.709.453 3.381 1.313 4.885L1.633 21.07l5.014-1.316zm12.355-6.52c-.3-.15-1.77-.875-2.04-.975-.27-.1-.47-.15-.67.15-.2.3-.77.975-.94 1.175-.17.2-.34.225-.64.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.77-1.665-2.07-.17-.3-.018-.462.13-.61.137-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.67-1.625-.92-2.225-.24-.58-.51-.5-.67-.513-.15-.008-.325-.01-.5-.01-.175 0-.46.066-.7.325-.24.26-.92.9-1.05 2.1-.13 1.2.75 2.36 1.05 2.76s2.535 3.87 6.14 5.425c.857.371 1.528.59 2.05.756.86.273 1.64.235 2.26.14.69-.1 2.04-.83 2.33-1.63.29-.8.29-1.48.2-1.63-.09-.15-.33-.25-.63-.4z" />
      </svg>
    </motion.a>
  );
}
