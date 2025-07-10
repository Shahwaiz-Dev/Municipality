import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-md mx-auto px-4 py-12 flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-indigo-800 mb-8 text-center">Admin Login</h1>
        <form className="bg-white rounded-lg shadow p-6 border border-gray-200 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" name="email" type="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="password" name="password" type="password" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </main>
      <Footer />
    </div>
  );
} 