import TopNavBar from '@/components/TopNavBar';
import CandidateList from '@/components/CandidateList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <TopNavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Iraq National Election 2025</h2>
          <p className="text-lg text-gray-600">
            7,769 candidates across 18 governorates with real-time civic analytics
          </p>
        </div>
        <CandidateList />
      </div>
    </main>
  );
}
