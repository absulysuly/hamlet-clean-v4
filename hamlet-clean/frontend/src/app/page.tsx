import CandidateList from '@/components/CandidateList';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Iraq National Election 2025
          </h1>
          <p className="text-lg text-gray-600">
            7,769 candidates across 18 governorates
          </p>
        </div>
        <CandidateList />
      </div>
    </main>
  );
}
