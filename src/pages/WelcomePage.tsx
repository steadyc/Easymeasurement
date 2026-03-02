import { useAuth } from "../context/AuthContext";

/**
 * Replace VIDEO_URL with your actual video URL or local path, e.g.:
 *   "/videos/ar-scan.mp4"
 *   "https://cdn.example.com/ar-measurement-loop.mp4"
 */
const VIDEO_URL = "/videos/ar-scan.mp4";

export default function WelcomePage() {
  const { isNewUser, markWelcomeSeen } = useAuth();

  const caption = isNewUser
    ? "Welcome! Let's get you started."
    : "Welcome back! Ready to measure?";

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Full-screen looping video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Caption — centered */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-6">
        <p className="text-white text-3xl sm:text-4xl font-bold text-center drop-shadow-lg leading-snug">
          {caption}
        </p>
      </div>

      {/* Next button — bottom-right */}
      <div className="absolute bottom-8 right-8 z-20">
        <button
          onClick={markWelcomeSeen}
          className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full text-sm font-bold shadow-xl hover:bg-slate-100 active:scale-95 transition-all"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
