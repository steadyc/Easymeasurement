import { Routes, Route, Navigate } from 'react-router-dom'
import SignupPage from './pages/SignupPage'

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <p className="text-gray-500 text-sm">Login page — coming soon.</p>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  )
}
