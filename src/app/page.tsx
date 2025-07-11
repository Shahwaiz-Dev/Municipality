"use client";

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-bg-light text-text-dark"
    >
      <Header />
      <Hero />
      {/* Latest News Section */}
      <section className="py-16 bg-surface text-text-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-dark mb-4 uppercase tracking-widest">Latest News & Updates</h2>
            <p className="text-lg text-text-dark">Stay informed about municipal activities and community events</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'New Community Center Opening',
                category: 'Municipal News',
                description: "We're excited to announce the opening of our new community center, providing modern facilities for all residents.",
                href: '/news',
                icon: (
                <svg className="w-16 h-16 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                ),
                color: 'bg-primary',
                tagClass: 'text-accent',
              },
              {
                title: 'Summer Festival 2024',
                category: 'Events',
                description: 'Join us for our annual summer festival featuring local artists, food vendors, and family activities.',
                href: '/events',
                icon: (
                <svg className="w-16 h-16 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                ),
                color: 'bg-accent',
                tagClass: 'text-secondary',
              },
              {
                title: 'Online Services Available',
                category: 'Services',
                description: "We've launched new online services to make it easier for residents to access municipal services.",
                href: '/services',
                icon: (
                <svg className="w-16 h-16 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ),
                color: 'bg-primary',
                tagClass: 'text-accent',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className={`bg-surface rounded-lg shadow-md overflow-hidden border border-border hover:shadow-lg transition-shadow`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: "easeInOut" }}
              >
                <div className={`h-48 ${card.color} flex items-center justify-center`}>{card.icon}</div>
              <div className="p-6">
                  <div className={`text-sm ${card.tagClass} font-medium mb-2`}>{card.category}</div>
                  <h3 className="text-xl font-semibold text-text-dark mb-3">{card.title}</h3>
                  <p className="text-text-dark mb-4">{card.description}</p>
                  <Button href={card.href}>{card.category === 'Events' ? 'Learn More' : card.category === 'Services' ? 'Explore Services' : 'Read More'}</Button>
              </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-16 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-dark mb-4 uppercase tracking-widest">Our Services</h2>
            <p className="text-lg text-text-dark">Comprehensive municipal services for our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Building Permits', icon: '🏗️', description: 'Construction and renovation permits' },
              { title: 'Business Licenses', icon: '🏢', description: 'Commercial and business licensing' },
              { title: 'Waste Management', icon: '♻️', description: 'Recycling and waste collection services' },
              { title: 'Public Safety', icon: '🚨', description: 'Emergency services and public safety' },
              { title: 'Parks & Recreation', icon: '🌳', description: 'Parks, playgrounds, and recreational facilities' },
              { title: 'Road Maintenance', icon: '🛣️', description: 'Street maintenance and infrastructure' },
              { title: 'Water Services', icon: '💧', description: 'Water supply and utility services' },
              { title: 'Community Events', icon: '🎉', description: 'Local events and community programs' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                className="bg-surface rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: "easeInOut" }}
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-text-dark mb-2">{service.title}</h3>
                <p className="text-text-dark text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/services">View All Services</Button>
          </div>
        </div>
      </section>
      {/* Contact CTA Section */}
      <section className="py-16 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-accent mb-4 uppercase tracking-widest">Need Help?</h2>
          <p className="text-xl text-accent mb-8">
            Our team is here to assist you with any questions or concerns about municipal services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact">Contact Us</Button>
            <Button href="/emergency" className="bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-700">Emergency Contacts</Button>
          </div>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
}
