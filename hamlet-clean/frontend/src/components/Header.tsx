export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hamlet Unified</h1>
            <p className="text-sm text-gray-600">Iraq Election Platform 2025</p>
          </div>
          <nav className="flex gap-6">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/candidates" className="text-gray-600 hover:text-gray-900">Candidates</a>
            <a href="/governorates" className="text-gray-600 hover:text-gray-900">Governorates</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
