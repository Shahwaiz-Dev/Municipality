import Header from '@/components/Header';
import Footer from '@/components/Footer';

const news = [
  { title: 'New Community Center Opening', date: '2024-07-01', summary: 'We are excited to announce the opening of our new community center, providing modern facilities for all residents.' },
  { title: 'Summer Festival 2024', date: '2024-06-15', summary: 'Join us for our annual summer festival featuring local artists, food vendors, and family activities.' },
  { title: 'Online Services Launched', date: '2024-05-20', summary: 'We have launched new online services to make it easier for residents to access municipal services.' },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">News & Announcements</h1>
        <div className="space-y-8">
          {news.map((item, idx) => (
            <article key={idx} className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">{item.title}</h2>
              <div className="text-sm text-gray-500 mb-2">{item.date}</div>
              <p className="text-gray-700">{item.summary}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
} 