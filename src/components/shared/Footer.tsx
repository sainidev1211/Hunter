import React from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION_LINKS, ROUTES, APP_METADATA } from '@/config/appConfig';
import { Container } from '../ui/Container';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-light bg-bg-alt-light transition-colors duration-300">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="space-y-6 text-left">
            <Link to={ROUTES.HOME} className="block">
              <Logo showTagline={true} />
            </Link>
            <p className="text-sm text-text-secondary-light leading-relaxed mt-3">
              Simplify your job application campaign. Apply once, access verified opportunities everywhere, and get matched to jobs matching your profile.
            </p>
          </div>

          {/* Product Links */}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-text-primary-light tracking-wider uppercase mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.footer.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary-light hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-text-primary-light tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.footer.company.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-sm text-text-secondary-light hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary-light hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Contact Links */}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-text-primary-light tracking-wider uppercase mb-4">
              Contact & Support
            </h3>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.footer.contact.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary-light hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lower Banner */}
        <div className="mt-12 pt-8 border-t border-border-light flex flex-col md:flex-row items-center justify-between text-left gap-4">
          <p className="text-xs text-text-secondary-light">
            &copy; {currentYear} {APP_METADATA.name} Inc. All rights reserved. Designed for active job candidates.
          </p>
          <div className="flex space-x-6">
            <Link to={ROUTES.PRIVACY} className="text-xs text-text-secondary-light hover:text-primary">
              Privacy Policy
            </Link>
            <Link to={ROUTES.TERMS} className="text-xs text-text-secondary-light hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
