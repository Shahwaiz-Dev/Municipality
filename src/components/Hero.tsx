import Link from 'next/link';
import Stack from "../app/components/Stack";
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Hero() {
  return (
    <motion.div
      className="relative bg-secondary text-text-light overflow-hidden hero"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-bg-dark/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div variants={containerVariants} className="text-text-light">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to{' '}
              <span className="text-accent">Agios</span>{' '}
              <span className="text-text-dark">Athanasios</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-text-light/80 mb-8">
              Your trusted partner in community development and municipal services. 
              Discover our commitment to excellence and innovation in serving our citizens.
            </motion.p>
            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="bg-[#3E1D11] hover:bg-accent text-text-light px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center hover:scale-105 hover:shadow-lg transition-transform transition-shadow duration-200"
              >
                Our Services
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="bg-[#F3E3C9] hover:bg-accent text-[#3E1D11] px-8 py-3 rounded-lg font-semibold transition-colors border border-border hover:scale-105 hover:shadow-lg transition-transform transition-shadow duration-200"
              >
                Contact Us
              </Link>
            </motion.div>
            {/* Quick Stats */}
            <motion.div variants={containerVariants} className="grid grid-cols-3 gap-6 mt-12">
              {[
                { value: '15,000+', label: 'Residents' },
                { value: '50+', label: 'Services' },
                { value: '24/7', label: 'Support' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  custom={i}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-text-light/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          {/* Visual Element */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative flex items-center justify-center h-96">
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={{ width: 450, height: 450 }}
                cardsData={[
                  { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
                  { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
                  { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
                  { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
                ]}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 