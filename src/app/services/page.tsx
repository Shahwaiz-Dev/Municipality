import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  { title: 'Building Permits', description: 'Apply for construction and renovation permits.' },
  { title: 'Business Licenses', description: 'Obtain or renew your business license.' },
  { title: 'Waste Management', description: 'Recycling and waste collection services.' },
  { title: 'Public Safety', description: 'Emergency services and public safety.' },
  { title: 'Parks & Recreation', description: 'Parks, playgrounds, and recreational facilities.' },
  { title: 'Road Maintenance', description: 'Street maintenance and infrastructure.' },
  { title: 'Water Services', description: 'Water supply and utility services.' },
  { title: 'Community Events', description: 'Local events and community programs.' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">Municipal Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">{service.title}</h2>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
} 