import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';

export function WhyChooseUs() {
  const benefits = [
    {
      title: 'Advanced Matchmaking Algorithms',
      description: 'Our proprietary parsing models check and pair candidate credentials with high-probability matches in real-time, bypassing recruiter filters entirely.',
      icon: '🧠',
    },
    {
      title: 'Unmatched Cost Affordability',
      description: 'Get standard-setting campaign automation at a fraction of the cost. We are significantly cheaper than consultancies, agencies, or manual resume sending services.',
      icon: '💎',
    },
    {
      title: 'ATS Schema Domination',
      description: 'Clear automated screeners with ease. Our system restructures your credentials to align with Applicant Tracking System criteria, maintaining a 92%+ pass rate.',
      icon: '🎯',
    },
    {
      title: 'Multi-Channel Dispatch Velocity',
      description: 'Configure separate salary goals for Full-Time, Part-Time, or Internship profiles. Our pipeline splits and formats your applications dynamically.',
      icon: '🚀',
    },
  ];

  return (
    <section className="py-20 bg-bg-alt-light transition-colors duration-300 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <Container>
        {/* Centered Section Heading across full layout */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Value Proposition
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary-light">
            Why{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Choose Us?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary-light max-w-2xl mx-auto">
            ApplyOne is not just another job portal. We are an advanced campaign automation pipeline built to accelerate your career placement at an unbeatable value.
          </p>
        </div>

        {/* 2-Column Grid with Reduced Gap & Vertical Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN: Animated Performance Showcase ATS Card */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col"
            >
              <Card className="h-full p-6 sm:p-8 rounded-2xl border border-border-light bg-white shadow-xl flex flex-col justify-between space-y-6 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-500/10 text-primary text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Performance Metrics
                </div>

                {/* ATS Circle Gauge */}
                <div className="flex items-center gap-5 pt-2">
                  <div className="relative h-20 w-20 flex-shrink-0 flex items-center justify-center">
                    <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="stroke-slate-100"
                        strokeWidth="10"
                        fill="none"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="stroke-blue-600"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        whileInView={{ strokeDashoffset: 251.2 - (251.2 * 0.92) }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-lg font-extrabold text-text-primary-light">
                      92%
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-text-primary-light">
                      ATS Compatibility Pass Rate
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary-light mt-1 leading-relaxed">
                      Our parsing schema outperforms industry standards, clearing ATS auto-filters with ease.
                    </p>
                  </div>
                </div>

                {/* Velocity Indicator */}
                <div className="p-4 bg-slate-50 rounded-xl border border-border-light flex items-center justify-between">
                  <div>
                    <span className="block text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      10x Faster
                    </span>
                    <span className="text-xs text-text-secondary-light">
                      Average placement match velocity
                    </span>
                  </div>
                  <span className="text-3xl">🚀</span>
                </div>

                {/* Dispatch Simulator Track */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-text-secondary-light uppercase tracking-wider block">
                    Automation Pipeline Stream
                  </span>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                      <span>✓</span>
                      <span>Resume Parsed & ATS Formatted</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                      <span>✓</span>
                      <span>Salary Goals Split & Match Secured</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-500 font-semibold">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                      <span>Dispatch Queue Active (10 Matches Found)</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Benefit Pillars Grid with Equal Heights & Clean Baseline */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="h-full"
                >
                  <Card className="h-full p-5 rounded-2xl border border-border-light bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl h-9 w-9 rounded-lg bg-blue-50 border border-border-light flex items-center justify-center flex-shrink-0">
                          {benefit.icon}
                        </span>
                        <h3 className="font-bold text-text-primary-light text-sm sm:text-base min-h-[2.5rem] flex items-center leading-snug">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary-light leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
