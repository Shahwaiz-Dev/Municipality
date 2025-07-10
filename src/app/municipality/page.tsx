import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MunicipalityPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">About the Municipality</h1>
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">History</h2>
          <p className="text-gray-700 mb-4">Agios Athanasios is a municipality with a rich history and vibrant culture. [Add more historical info here]</p>
        </section>
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Municipal Council</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Mayor: [Name]</li>
            <li>Deputy Mayor: [Name]</li>
            <li>Council Members: [List of members]</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Departments</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Technical Services</li>
            <li>Social Services</li>
            <li>Finance Department</li>
            <li>Citizen Service Center</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
} 