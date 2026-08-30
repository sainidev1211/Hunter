import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export function AboutUs() {
  return (
    <section id="about-us" className="py-20 bg-bg-alt-light transition-colors duration-300 relative overflow-hidden">
      
      {/* Abstract grid lines backdrop */}
      <div className="absolute inset-0 bg-grid-bg opacity-20 pointer-events-none" />

      <Container className="max-w-4xl text-center relative z-10 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary-light">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary-light">
            We exist to remove the friction of applying for jobs, allowing candidates to spend their energy where it matters.
          </p>
        </div>

        {/* Narrative columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 bg-white p-6 rounded-2xl border border-border-light shadow-sm"
          >
            <h3 className="text-lg font-bold text-text-primary-light">
              Why We Started ApplyOne
            </h3>
            <p className="text-sm text-text-secondary-light leading-relaxed">
              Applying for jobs is broken. Candidates spend hours copy-pasting the same profile fields into hundreds of company-specific portals. This administrative burden dilutes focus and delays critical career starts. We built ApplyOne to automate the pipeline completely.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 bg-white p-6 rounded-2xl border border-border-light shadow-sm"
          >
            <h3 className="text-lg font-bold text-text-primary-light">
              Focus on What Matters
            </h3>
            <p className="text-sm text-text-secondary-light leading-relaxed">
              By removing manual form-filling, we return thousands of hours of study and prep time back to candidates. Students, freshers, and professionals can direct their focus towards learning core skills, refining technical projects, and preparing for live interview panels.
            </p>
          </motion.div>
        </div>

        {/* Dynamic callout banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl bg-gradient-to-r from-blue-600/5 to-cyan-600/5 border border-blue-500/10 text-center space-y-4"
        >
          <h3 className="text-lg sm:text-xl font-bold text-text-primary-light">
            Join the automated hiring revolution.
          </h3>
          <p className="text-sm text-text-secondary-light max-w-xl mx-auto">
            Our systems sync your target criteria, credentials, and resume formatting, applying to new matches matching your profile guidelines automatically.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
