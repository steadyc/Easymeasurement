import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
}

const STEPS: OnboardingStep[] = [
  {
    title: "Point & Measure",
    description:
      "Use your camera to detect surfaces. Simply point at any object and the AR overlay will lock on automatically.",
    icon: "📷",
  },
  {
    title: "Tap to Set Points",
    description:
      "Tap two points on the screen to place measurement markers. EasyMeasurement calculates the real-world distance instantly.",
    icon: "📍",
  },
  {
    title: "Save & Share",
    description:
      "Save your measurements to a project, export as PDF, or share directly with your team — all from the dashboard.",
    icon: "📤",
  },
];

export default function OnboardingPage() {
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(0);

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  const handleNext = () => {
    if (isLast) {
      completeOnboarding();
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-6">
      {/* Step indicators */}
      <div className="flex gap-2 mb-12">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`block h-2 rounded-full transition-all duration-300 ${
              i === step ? "w-8 bg-white" : "w-2 bg-slate-600"
            }`}
          />
        ))}
      </div>

      {/* Content card */}
      <div className="w-full max-w-sm text-center">
        <div className="text-7xl mb-8 select-none">{current.icon}</div>
        <h2 className="text-2xl font-bold text-white mb-4">{current.title}</h2>
        <p className="text-slate-400 text-base leading-relaxed">
          {current.description}
        </p>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-sm mt-16 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-slate-400 text-sm hover:text-white disabled:opacity-0 transition-all"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-7 py-3 bg-white text-slate-900 rounded-full text-sm font-bold shadow-xl hover:bg-slate-100 active:scale-95 transition-all"
        >
          {isLast ? "Get Started" : "Next"}
          {!isLast && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
