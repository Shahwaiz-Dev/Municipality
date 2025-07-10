"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { HomeIcon, NewspaperIcon, CalendarIcon, Cog6ToothIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

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
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`z-50 inset-y-0 left-0 ${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-800 text-white flex flex-col py-8 px-2 shadow-lg transition-all duration-300 ease-in-out fixed lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>        
        {/* Logo at top */}
        <div className={`mb-10 text-2xl font-bold tracking-wide text-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none h-0'}`}>CMS Admin</div>
        
        {/* Toggle button at top right */}
        <button
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded hover:bg-indigo-700 transition-colors duration-200 ease-in-out"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? (
            <svg className="w-5 h-5 transition-transform duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 transition-transform duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
        
        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className={`flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2 rounded hover:bg-indigo-700 focus:bg-indigo-900 transition-all duration-200 ease-in-out font-medium focus:outline-none focus:ring-2 focus:ring-white/50 ${isActive ? 'bg-indigo-900' : ''}`}
              >
                <Icon className="w-6 h-6" />
                <span className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 ml-1' : 'opacity-0 w-0 ml-0 pointer-events-none'}`}>{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-8 border-t border-indigo-700">
          <button 
            onClick={handleLogout}
            className={`w-full text-left ${sidebarOpen ? 'px-4' : 'px-2'} py-2 rounded hover:bg-indigo-700 transition-all duration-200 ease-in-out font-medium flex items-center ${sidebarOpen ? 'gap-3' : 'justify-center'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
            <span className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 ml-1' : 'opacity-0 w-0 ml-0 pointer-events-none'}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white shadow flex items-center px-4 lg:px-6 border-b border-gray-200 justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-1 transition-colors duration-200 ease-in-out"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label="Open sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-lg font-semibold text-indigo-800 truncate">Agios Athanasios CMS</span>
          </div>
          {/* Right side - Back to Website button and User avatar */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200 ease-in-out border border-indigo-200 rounded-md hover:bg-indigo-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Website</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-indigo-200 text-indigo-800 font-bold text-sm lg:text-lg">A</span>
              <span className="hidden sm:inline text-indigo-800 font-medium">Admin</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 xl:p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  );
} 