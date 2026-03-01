import { useState } from 'react';
import { Link } from 'react-router-dom';

function InputField({ id, label, type = 'text', value, onChange, error, placeholder, autoComplete }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500 ${
          error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
        }`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function validate(fields) {
  const errors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!fields.password) {
    errors.password = 'Password is required.';
  } else if (fields.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (!fields.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

export default function SignupPage() {
  const [fields, setFields] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Account created!</h2>
          <p className="mt-2 text-sm text-gray-500">
            Welcome to Easymeasurement. You can now log in to your account.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo / branding */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-600">Easymeasurement</h1>
          <p className="mt-1 text-sm text-gray-500">Create your free account</p>
        </div>

        <div className="rounded-2xl bg-white px-8 py-10 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Sign up</h2>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <InputField
              id="fullName"
              label="Full Name"
              value={fields.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="Jane Doe"
              autoComplete="name"
            />

            <InputField
              id="email"
              label="Email Address"
              type="email"
              value={fields.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="jane@example.com"
              autoComplete="email"
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              value={fields.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={fields.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Repeat your password"
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
