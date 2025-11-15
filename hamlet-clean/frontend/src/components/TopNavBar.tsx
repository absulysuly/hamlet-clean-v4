import Link from 'next/link';

const navigationLinks: Array<{ href: string; label: string }> = [
  { href: '/', label: 'Home' },
  { href: '/candidates', label: 'Candidates' },
];

export default function TopNavBar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Hamlet Unified Platform
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Iraq Election Dashboard</h1>
          <p className="text-sm text-gray-600">Realtime civic intelligence for 2025</p>
        </div>

        <nav aria-label="Primary" className="flex items-center gap-2 md:gap-4">
          {navigationLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
