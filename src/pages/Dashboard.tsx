import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-tight">EasyMeasurement</h1>
        <button
          onClick={signOut}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 text-center gap-8">
        {/* AR Viewfinder placeholder */}
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-3xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center gap-4 bg-slate-800/50">
          <span className="text-6xl">📐</span>
          <p className="text-slate-400 text-sm max-w-[200px] leading-relaxed">
            Point your camera at a surface to start measuring.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white text-slate-900 rounded-full text-sm font-semibold hover:bg-slate-100 active:scale-95 transition-all shadow-lg">
            Start Measuring
          </button>
          <button className="px-6 py-3 border border-slate-600 text-slate-300 rounded-full text-sm font-semibold hover:border-slate-400 hover:text-white active:scale-95 transition-all">
            My Projects
          </button>
        </div>
      </main>
    </div>
  );
}
