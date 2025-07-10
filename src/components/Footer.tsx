import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-text-light py-8 px-4 rounded-t-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Municipality Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h3 className="text-xl font-bold">Agios Athanasios Municipality</h3>
            </div>
            <p className="text-indigo-100 mb-4">
              Serving our community with dedication and commitment to excellence.
            </p>
            <div className="space-y-2 text-sm text-indigo-100">
              <p>📍 123 Main Street, Agios Athanasios, Cyprus</p>
              <p>📞 +357 25 123456</p>
              <p>✉️ info@agiosathanasios.org.cy</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/municipality" className="text-indigo-100 hover:text-emerald-400 transition-colors">
                  About Municipality
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-indigo-100 hover:text-emerald-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-indigo-100 hover:text-emerald-400 transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-indigo-100 hover:text-emerald-400 transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-indigo-100 hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-indigo-100 hover:text-emerald-400 transition-colors">
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-indigo-100 hover:text-emerald-400 transition-colors">
                  Emergency Contacts
                </Link>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-3 text-indigo-200">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-indigo-200 hover:text-emerald-400 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-indigo-200 hover:text-emerald-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-indigo-200 hover:text-emerald-400 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-indigo-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-200 text-sm">
            © 2024 Agios Athanasios Municipality. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-indigo-200 hover:text-emerald-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-indigo-200 hover:text-emerald-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-indigo-200 hover:text-emerald-400 text-sm transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 