import TopNavBar from '@/components/TopNavBar';
import CandidateList from '@/components/CandidateList';

export default function Home() {
  return (
    <main>
      <TopNavBar />
      <section className="container">
        <div className="header">
          <h1>Iraq National Election 2025</h1>
          <p className="english-name">
            7,769 candidates across 18 governorates with real-time civic analytics
          </p>
        </div>
        <CandidateList />
      </section>
    </main>
  );
}
