"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { HomeIcon, NewspaperIcon, CalendarIcon, Cog6ToothIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'News', href: '/admin/news', icon: NewspaperIcon },
  { name: 'Events', href: '/admin/events', icon: CalendarIcon },
  { name: 'Services', href: '/admin/services', icon: Cog6ToothIcon },
  { name: 'Pages', href: '/admin/pages', icon: DocumentTextIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const pathname = usePathname();

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, this should be server-side
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('admin_authenticated', 'true');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  const handleNavClick = () => {
    // Only close sidebar on mobile devices
    if (window.innerWidth < 1024) { // lg breakpoint
      setSidebarOpen(false);
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter password to access the admin panel
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Access Admin Panel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel min-h-screen flex bg-gray-50 overflow-x-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-indigo-800 text-white flex flex-col py-8 px-2 shadow-lg z-50 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        {/* Logo at top */}
        <div className={`mb-10 text-2xl font-bold tracking-wide text-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none h-0'}`}>CMS Admin</div>
        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center py-2 rounded hover:bg-indigo-700 focus:bg-indigo-900 transition-all duration-200 ease-in-out font-medium focus:outline-none focus:ring-2 focus:ring-white/50 ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} ${isActive ? 'bg-indigo-900' : ''}`}
              >
                <Icon className="w-8 h-8" />
                <span className={`transition-all duration-300 ease-in-out whitespace-nowrap ${sidebarOpen ? 'opacity-100 ml-1' : 'opacity-0 w-0 ml-0 pointer-events-none'}`}>{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-8 border-t border-indigo-700">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 ease-in-out font-medium flex items-center gap-3"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
            <span className={`transition-all duration-300 ease-in-out whitespace-nowrap ${sidebarOpen ? 'opacity-100 ml-1' : 'opacity-0 w-0 ml-0 pointer-events-none'}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Top Header */}
        <header className="admin-header sticky top-0 z-30 h-16 bg-indigo-800 shadow flex items-center px-4 lg:px-6 border-b border-indigo-900 justify-between">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle button for all screens */}
            <button
              className="text-white focus:outline-none focus:ring-2 focus:ring-indigo-200 p-1 rounded bg-indigo-700 hover:bg-indigo-600 transition-colors duration-200 ease-in-out"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              {sidebarOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <span className="text-lg font-semibold text-white truncate">Agios Athanasios CMS</span>
          </div>
          {/* Right side - Back to Website button and User avatar */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white transition-colors duration-200 ease-in-out border border-indigo-400 rounded-md hover:bg-indigo-700 bg-indigo-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Website</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-indigo-600 text-indigo-200 font-bold text-sm lg:text-lg">A</span>
              <span className="hidden sm:inline text-indigo-200 font-medium">Admin</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 w-full">{children}</main>
      </div>
    </div>
  );
} 