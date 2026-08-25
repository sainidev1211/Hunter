import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';

interface Review {
  id: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  content: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Aarav Mehta',
    role: 'SDE-1 (Fresher Placed)',
    company: 'Bengaluru Tech Park',
    rating: 5,
    content:
      'Applying manually to 50+ portals every week was exhausting. ApplyOne automated my job hunt and within 3 weeks I received 4 interview invites and cracked my first full-time SDE job!',
    avatar: 'AM',
  },
  {
    id: '2',
    name: 'Sneha Patel',
    role: 'Software Engineering Intern',
    company: 'Fintech Startup, Pune',
    rating: 5,
    content:
      'As a pre-final year B.Tech student, internship season was stressful. ApplyOne matched my resume to relevant tech openings and helped me secure a 6-month paid Software Engineering Internship.',
    avatar: 'SP',
  },
  {
    id: '3',
    name: 'Rohan Sharma',
    role: 'Associate Data Analyst',
    company: 'Gurugram',
    rating: 5,
    content:
      'The ATS resume insights helped me fix missing keywords. ApplyOne automatically dispatched tailored applications on my behalf, leading directly to my first full-time corporate job offer.',
    avatar: 'RS',
  },
  {
    id: '4',
    name: 'Ananya Iyer',
    role: 'Frontend Development Intern',
    company: 'Hyderabad',
    rating: 4.5,
    content:
      'ApplyOne took the tedious form filling out of my daily routine. I set my tech preferences, and within 10 days I was interviewing for React frontend internships and got selected!',
    avatar: 'AI',
  },
  {
    id: '5',
    name: 'Karan Malhotra',
    role: 'Graduate Trainee Engineer',
    company: 'Noida',
    rating: 5,
    content:
      'Being from a tier-2 college, finding off-campus opportunities was tough. ApplyOne gave my profile visibility across 80+ top companies and helped me land my first full-time developer role.',
    avatar: 'KM',
  },
  {
    id: '6',
    name: 'Priya Nair',
    role: 'Product Management Intern',
    company: 'Mumbai',
    rating: 5,
    content:
      'I was looking for an APM internship before graduating. The automated dispatch matched me to early-stage product teams, and I landed my dream internship in less than a month.',
    avatar: 'PN',
  },
  {
    id: '7',
    name: 'Aditya Verma',
    role: 'Junior Backend Developer',
    company: 'Delhi NCR',
    rating: 4.5,
    content:
      'ApplyOne is an absolute lifesaver for freshers. The dashboard clearly tracks every dispatch and status. It helped me secure multiple interview rounds and my first full-time job.',
    avatar: 'AV',
  },
  {
    id: '8',
    name: 'Tanvi Deshmukh',
    role: 'Cloud & DevOps Intern',
    company: 'Remote Tech Labs',
    rating: 5,
    content:
      'Got matched and applied to 60+ curated cloud and DevOps roles effortlessly. Received two paid internship offers in just two weeks. Must-have for college students.',
    avatar: 'TD',
  },
  {
    id: '9',
    name: 'Ishaan Gupta',
    role: 'Full Stack Developer (Fresher)',
    company: 'Bengaluru',
    rating: 5,
    content:
      'Saved me hours every day. The automated pipeline dispatched applications consistently in the background while I focused on LeetCode and DSA interview preparation.',
    avatar: 'IG',
  },
];

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Sync window widths to determine responsive items per view
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive fractional itemsPerView for next-card scroll hint
  const itemsPerView = windowWidth >= 1024 ? 3.2 : windowWidth >= 768 ? 2.2 : 1.15;
  const maxIndex = Math.max(0, Math.floor(reviews.length - Math.floor(itemsPerView)));

  // Clamp current index when viewport resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerView, currentIndex, maxIndex]);

  // Left slide auto-transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Translation percentage sliding left
  const translateX = -currentIndex * (100 / reviews.length);

  return (
    <section className="py-20 bg-white dark:bg-bg-dark transition-colors duration-300 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-500/5 dark:bg-cyan-600/5 blur-3xl pointer-events-none" />

      <Container>
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 text-left">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
              Community Reviews
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary-light dark:text-text-primary-dark">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary-light dark:text-text-secondary-dark">
              Hear from students and freshers across India who landed internships and their first full-time jobs with ApplyOne.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark hover:bg-bg-alt-light dark:hover:bg-bg-alt-dark text-text-primary-light dark:text-text-primary-dark shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Previous review"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark hover:bg-bg-alt-light dark:hover:bg-bg-alt-dark text-text-primary-light dark:text-text-primary-dark shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Next review"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Viewport with Smooth Left Slide Transition */}
        <div className="overflow-hidden w-full py-4 -mx-2 sm:-mx-3 px-2 sm:px-3">
          <motion.div
            className="flex"
            animate={{ x: `${translateX}%` }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 18,
              mass: 0.8,
            }}
            style={{
              width: `${(reviews.length / itemsPerView) * 100}%`,
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  width: `${100 / reviews.length}%`,
                }}
                className="px-2.5 sm:px-3"
              >
                <Card className="p-6 h-full flex flex-col justify-between rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 text-left">
                  <div className="space-y-3.5 flex-1 flex flex-col">
                    {/* Stars Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => {
                        const starNum = i + 1;
                        if (review.rating >= starNum) {
                          return (
                            <svg
                              key={i}
                              className="h-4.5 w-4.5 text-amber-400 fill-current"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          );
                        } else if (review.rating >= starNum - 0.5) {
                          return (
                            <div key={i} className="relative h-4.5 w-4.5">
                              <svg
                                className="absolute inset-0 h-4.5 w-4.5 text-slate-200 dark:text-slate-700 fill-current"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <div className="absolute inset-0 w-[50%] overflow-hidden pointer-events-none">
                                <svg
                                  className="h-4.5 w-4.5 text-amber-400 fill-current"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  style={{ maxWidth: 'none' }}
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <svg
                              key={i}
                              className="h-4.5 w-4.5 text-slate-200 dark:text-slate-700 fill-current"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          );
                        }
                      })}
                    </div>

                    {/* Review Content */}
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                      "{review.content}"
                    </p>
                  </div>

                  {/* Clean Divider & Profile Signature */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border-light dark:border-border-dark mt-6">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-semibold shadow-inner flex-shrink-0">
                      {review.avatar}
                    </div>
                    <div className="min-w-0 text-left">
                      <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark truncate">
                        {review.name}
                      </h3>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
                        {review.role} {review.company ? `@ ${review.company}` : ''}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-6 bg-blue-600 dark:bg-cyan-400' : 'w-2 bg-slate-200 dark:bg-slate-700'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
