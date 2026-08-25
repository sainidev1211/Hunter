import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES, PRICING_PLANS } from '@/config/appConfig';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/store/toastStore';
import { plansApi } from '@/services/api/apiClient';
import RazorpayCheckout from '@/components/ui/RazorpayCheckout';

// Static initial plans derived directly from appConfig for zero-delay hydration
const STATIC_DEFAULT_PLANS = PRICING_PLANS.map((p) => ({
  id: p.id,
  name: p.name,
  monthlyPrice: parseInt(p.price.replace(/[^\d]/g, ''), 10) || 999,
  description: p.description,
  features: p.features,
}));

const normalizeFeatures = (features: any): string[] => {
  if (Array.isArray(features)) return features;
  if (features && typeof features === 'object') return Object.values(features).map(String);
  return [];
};

// Client-side synchronous initializer
const getInitialPlans = () => {
  if (typeof window !== 'undefined') {
    try {
      const cached = sessionStorage.getItem('applyone_cached_plans');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore storage errors
    }
  }
  return STATIC_DEFAULT_PLANS;
};

export function Pricing() {
  const { user } = useAuthStore();
  // Hydrate immediately with initial/cached data for instant <100ms render
  const [plans, setPlans] = useState<any[]>(getInitialPlans);

  // Background non-blocking revalidation (Stale-While-Revalidate)
  useEffect(() => {
    let isMounted = true;

    const revalidatePlans = async () => {
      try {
        const remoteData = await plansApi.getPublic();
        if (isMounted && Array.isArray(remoteData) && remoteData.length > 0) {
          setPlans((currentPlans) => {
            // Compare to avoid unnecessary re-renders
            const isDifferent =
              currentPlans.length !== remoteData.length ||
              remoteData.some(
                (rp, i) =>
                  rp.id !== currentPlans[i]?.id ||
                  rp.monthlyPrice !== currentPlans[i]?.monthlyPrice
              );
            if (isDifferent) {
              try {
                sessionStorage.setItem('applyone_cached_plans', JSON.stringify(remoteData));
              } catch {
                // ignore storage quota errors
              }
              return remoteData;
            }
            return currentPlans;
          });
        }
      } catch (error) {
        // Keep current static/cached plans on network failure
        console.debug('[Pricing] SWR background revalidation note:', error);
      }
    };

    revalidatePlans();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePaymentSuccess = useCallback(async () => {
    toast.success('Subscription activated successfully.', 'Payment Successful');
  }, []);

  const handlePaymentError = useCallback((error: any) => {
    toast.error(error?.message || 'Payment could not be completed.', 'Payment Failed');
  }, []);

  const renderedPlans = useMemo(() => {
    return plans.map((plan) => ({
      ...plan,
      isPopular: plan.id === 'elite' || plan.monthlyPrice === 1499,
      normalizedFeatures: normalizeFeatures(plan.features),
    }));
  }, [plans]);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
            Flexible Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary-light dark:text-text-primary-dark">
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary-light dark:text-text-secondary-dark">
            Choose the membership tier that fits your job search pace. Upgrade anytime and unlock high-velocity application workflows.
          </p>
        </div>

        {/* Pricing Cards Grid — Instant Render */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {renderedPlans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="flex"
            >
              <Card
                className={`relative flex flex-col justify-between w-full h-full text-left p-6 md:p-8 rounded-2xl overflow-visible transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.isPopular
                    ? 'border-2 border-cyan-500 bg-gradient-to-b from-white via-blue-50/60 to-cyan-50/70 shadow-xl scale-[1.02] z-10 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/40'
                    : 'border border-slate-200 bg-white/90 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-none'
                }`}
              >
                {/* Popular Indicator */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <Badge variant="secondary" className="px-3.5 py-1 text-xs font-bold shadow-md uppercase tracking-wider">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="space-y-6 flex-1 flex flex-col">
                  {/* Header Details */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                        {plan.name}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark min-h-[42px] leading-relaxed">
                      {plan.description || 'Choose the plan that best fits your job search goals.'}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-1.5 py-2">
                    <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary-light dark:text-text-primary-dark">
                      ₹{plan.monthlyPrice || 0}
                    </span>
                    <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                      /month
                    </span>
                  </div>

                  {/* Clean Single Feature List */}
                  <div className="pt-2 flex-1">
                    <ul className="space-y-3.5">
                      {plan.normalizedFeatures.map((feat: string, featureIdx: number) => (
                        <li key={`${plan.id}-feature-${featureIdx}`} className="flex items-start text-sm group">
                          <span className="mt-0.5 mr-3 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300 text-xs font-bold">
                            ✓
                          </span>
                          <span className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Button Block */}
                <div className="mt-8 pt-4">
                  {user ? (
                    <RazorpayCheckout
                      planId={plan.id}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  ) : (
                    <Link to={ROUTES.SIGNUP} className="w-full block">
                      <Button variant={plan.isPopular ? 'gradient' : 'outline'} className="w-full h-12 rounded-xl shadow-md transition-all duration-300" size="md">
                        Buy / Unlock
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
