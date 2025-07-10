import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">Contact Us</h1>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200 mb-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input id="name" name="name" type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" name="email" type="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Contact Information</h2>
          <p className="text-gray-700 mb-1">📍 123 Main Street, Agios Athanasios, Cyprus</p>
          <p className="text-gray-700 mb-1">📞 +357 25 123456</p>
          <p className="text-gray-700">✉️ info@agiosathanasios.org.cy</p>
        </div>
        <div className="bg-gray-200 rounded h-48 flex items-center justify-center text-gray-500">
          [Map Placeholder]
        </div>
      </main>
      <Footer />
    </div>
  );
} 