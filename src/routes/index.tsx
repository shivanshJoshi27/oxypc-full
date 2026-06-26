import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Call Center Dashboard</h1>
        <p className="text-center text-gray-600 mb-8">Manage your call operations with our comprehensive tools</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/calls/dump" className="group p-6 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Call Dump Module</h2>
            <p className="text-gray-600 text-sm">Upload and manage call dumps, assign contacts, and create follow-ups</p>
          </Link>

          <Link to="/calls/dashboard" className="group p-6 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 hover:border-green-300 transition-all duration-300">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Call Dashboard</h2>
            <p className="text-gray-600 text-sm">View call metrics, analytics, and team performance</p>
          </Link>

          <Link to="/calls/tracking" className="group p-6 bg-purple-50 rounded-xl border border-purple-100 hover:bg-purple-100 hover:border-purple-300 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Call Monitoring</h2>
            <p className="text-gray-600 text-sm">Track call history, monitor activity, and view records</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
