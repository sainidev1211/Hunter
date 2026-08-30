import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/design-system/ThemeProvider';
import { useAuthStore } from '@/store/authStore';
import { NAVIGATION_LINKS, ROUTES } from '@/config/appConfig';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { cn } from '@/utils/cn';
import { Logo } from './Logo';

export function Navbar() {
  const { isDark, setTheme, theme } = useTheme();
  const { user, profile, signOut } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notificationsOpen && notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, notificationsOpen]);
  
  // Mock notifications array for landing page navbar
  const [mockNotifications, setMockNotifications] = useState([
    {
      id: '1',
      title: 'Welcome to ApplyOne!',
      description: 'Your startup frontend foundation database synchronization is configured cleanly.',
      time: '2m ago',
      unread: true,
    },
    {
      id: '2',
      title: 'Resume Parse Complete',
      description: 'Resume structure parsed successfully. ATS suitability score checks finished at 92%.',
      time: '1h ago',
      unread: true,
    },
    {
      id: '3',
      title: 'Theme Config Sync',
      description: 'Local storage settings synchronized with your preference for light/dark templates.',
      time: '3h ago',
      unread: false,
    },
  ]);

  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setMockNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    setDropdownOpen(false);
    navigate(ROUTES.HOME);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border-light bg-white/80 backdrop-blur-md transition-colors duration-300">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
          <Logo textClass="text-lg" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {NAVIGATION_LINKS.marketing.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-text-secondary-light hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Panel */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3.5">
              {/* Dashboard Button */}
              <Link to={ROUTES.DASHBOARD}>
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>

              {/* Notification Menu */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-lg border border-border-light text-text-secondary-light cursor-pointer hover:bg-slate-50 transition-colors relative"
                  aria-label="Toggle notifications menu"
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 bg-white border border-border-light rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-border-light flex items-center justify-between">
                        <span className="font-bold text-sm text-text-primary-light">Notifications</span>
                        {unreadCount > 0 && (
                          <button
                            onClick={handleMarkAllRead}
                            className="text-xs text-primary hover:underline font-semibold"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-64 overflow-y-auto divide-y divide-border-light">
                        {mockNotifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-3.5 text-left text-xs transition-colors hover:bg-bg-alt-light ${
                              notif.unread ? 'bg-blue-50/20' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className={`font-semibold ${notif.unread ? 'text-text-primary-light' : 'text-text-secondary-light'}`}>
                                {notif.title}
                              </span>
                              <span className="text-xs text-slate-400 whitespace-nowrap">{notif.time}</span>
                            </div>
                            <p className="text-text-secondary-light mt-1 leading-relaxed">
                              {notif.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Avatar / Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold shadow-sm border border-white">
                    {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                  </div>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl border border-border-light bg-white shadow-lg py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-border-light">
                        <p className="text-sm font-semibold text-text-primary-light">
                          {profile?.full_name || 'My Profile'}
                        </p>
                        <p className="text-xs text-text-secondary-light truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to={ROUTES.DASHBOARD}
                        onClick={() => setDropdownOpen(false)}
                        className="block w-full px-4 py-2 text-left text-sm text-text-primary-light hover:bg-bg-alt-light"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to={ROUTES.SUBSCRIPTIONS}
                        onClick={() => setDropdownOpen(false)}
                        className="block w-full px-4 py-2 text-left text-sm text-text-primary-light hover:bg-bg-alt-light"
                      >
                        Subscriptions
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to={ROUTES.SIGNUP}>
                <Button variant="gradient" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-border-light text-text-primary-light cursor-pointer hover:bg-slate-50 transition-colors"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border-light bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {NAVIGATION_LINKS.marketing.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-text-primary-light py-2"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-border-light" />
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 py-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                      {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary-light">
                        {profile?.full_name || 'My Profile'}
                      </p>
                      <p className="text-xs text-text-secondary-light truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Link to={ROUTES.DASHBOARD} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} variant="ghost" className="w-full text-red-600">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link to={ROUTES.LOGIN} onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to={ROUTES.SIGNUP} onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="gradient" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
