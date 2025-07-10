"use client";
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowCookieConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowCookieConsent(false);
  };

  if (!showCookieConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              We use cookies
            </h3>
            <p className="text-sm text-gray-600">
              This website uses cookies to enhance your browsing experience and provide personalized content. 
              By continuing to use this site, you consent to our use of cookies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-200"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 