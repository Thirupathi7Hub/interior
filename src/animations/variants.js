// Shared animation variants for Framer Motion

const getDelay = (custom) => (typeof custom === 'number' ? custom : 0);

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: getDelay(custom),
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: getDelay(custom),
    },
  }),
};

export const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: (custom) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: getDelay(custom),
    },
  }),
};

export const scaleReveal = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: (custom) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      delay: getDelay(custom),
    },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const slideInLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: getDelay(custom),
    },
  }),
};

export const slideInRight = {
  hidden: { x: 60, opacity: 0 },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: getDelay(custom),
    },
  }),
};

export const imageReveal = {
  hidden: {
    clipPath: 'inset(100% 0 0 0)',
    scale: 1.05,
  },
  visible: (custom) => ({
    clipPath: 'inset(0% 0 0 0)',
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      delay: getDelay(custom),
    },
  }),
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

export const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const mobileMenuVariants = {
  closed: {
    clipPath: 'inset(0 0 100% 0)',
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
  open: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: (custom) => ({
    scaleX: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      delay: getDelay(custom),
    },
  }),
};

// Viewport configuration for scroll-triggered animations
export const viewportConfig = {
  once: true,
  amount: 0.15,
};

export const viewportConfigEarly = {
  once: true,
  amount: 0.1,
};
