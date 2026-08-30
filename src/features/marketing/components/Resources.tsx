import React from 'react';
import { motion } from 'framer-motion';
import { RESOURCES } from '@/config/appConfig';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';

export function Resources() {
  // Exclude redundant FAQ card since a dedicated FAQ section exists
  const activeResources = RESOURCES.filter(
    (res) => res.id !== 'faqs' && res.category.toLowerCase() !== 'faq'
  );

  return (
    <section id="resources" className="py-20 bg-white transition-colors duration-300">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Resources & Guides
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary-light">
            Learning &{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Growth Hub
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary-light">
            Expert resources, roadmap updates, and operational strategies to maximize interview conversion rates.
          </p>
        </div>

        {/* Balanced 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeResources.map((res, idx) => {
            const isFaq = res.category.toLowerCase() === 'faq' || res.link.includes('faq');
            const ctaLabel = isFaq ? 'View FAQ' : 'Read Guide';

            return (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="flex"
              >
                <Card hoverable className="w-full flex flex-col justify-between text-left rounded-2xl border border-border-light bg-white">
                  <CardContent className="p-6 space-y-4 flex-1">
                    <div className="flex justify-between items-center">
                      <Badge variant="primary">{res.category}</Badge>
                      <span className="text-xs text-text-secondary-light font-medium">
                        {res.readTime}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-text-primary-light hover:text-primary transition-colors">
                        {res.title}
                      </h3>
                      <p className="text-sm text-text-secondary-light leading-relaxed">
                        {res.description}
                      </p>
                    </div>
                  </CardContent>

                  <div className="px-6 pb-6 pt-2">
                    <a
                      href={res.link}
                      target={res.link.startsWith('http') || res.link.endsWith('.pdf') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover group"
                    >
                      {ctaLabel}
                      <svg
                        className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
