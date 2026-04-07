'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <nav className="backdrop-blur-lg bg-white/80 border-b border-sky-200/60 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h1 className="text-xl font-bold bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Portal</h1>
            </div>
            <div className="hidden sm:flex sm:gap-2">
              <Link
                href="/users"
                className="text-gray-700 hover:text-sky-600 hover:bg-sky-50 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              >
                Users
              </Link>
              <Link
                href="/posts"
                className="text-gray-700 hover:text-sky-600 hover:bg-sky-50 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              >
                Posts
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="hidden sm:flex text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg text-gray-700 hover:bg-sky-50 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-sky-200/60 bg-white/95 backdrop-blur-lg">
          <div className="px-4 py-3 space-y-2">
            <Link
              href="/users"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-sky-600 hover:bg-sky-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
            >
              Users
            </Link>
            <Link
              href="/posts"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-sky-600 hover:bg-sky-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
            >
              Posts
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-left text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
