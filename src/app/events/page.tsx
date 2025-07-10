import Header from '@/components/Header';
import Footer from '@/components/Footer';

const events = [
  { title: 'Summer Festival 2024', date: '2024-08-10', description: 'A celebration with music, food, and fun for the whole family at the central park.' },
  { title: 'Blood Donation Drive', date: '2024-09-05', description: 'Join us for a community blood donation event at the municipal hall.' },
  { title: 'Clean-Up Day', date: '2024-10-12', description: 'Help us keep our city clean! Meet at the main square for supplies and instructions.' },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">Events</h1>
        <div className="space-y-8">
          {events.map((event, idx) => (
            <article key={idx} className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">{event.title}</h2>
              <div className="text-sm text-gray-500 mb-2">{event.date}</div>
              <p className="text-gray-700">{event.description}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
} 