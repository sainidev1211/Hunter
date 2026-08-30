import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-light text-text-primary-light transition-colors duration-300 light">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
