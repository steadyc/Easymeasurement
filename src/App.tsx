import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import WelcomePage from "./pages/WelcomePage";
import OnboardingPage from "./pages/OnboardingPage";
import Dashboard from "./pages/Dashboard";

function AppRoutes() {
  const { isLoggedIn, hasSeenWelcome, hasCompletedOnboarding } = useAuth();

  // 1. Not logged in → Auth
  if (!isLoggedIn) return <AuthPage />;

  // 2. Logged in, hasn't seen the welcome video → Welcome
  if (!hasSeenWelcome) return <WelcomePage />;

  // 3. Seen welcome, hasn't completed onboarding → Onboarding
  if (!hasCompletedOnboarding) return <OnboardingPage />;

  // 4. Fully onboarded → Dashboard
  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="*" element={<AppRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
