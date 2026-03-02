import { useState } from "react";

const Reservation = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gmail: "",
    date: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submission logic goes here
    alert("Reservation submitted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Make a Reservation</h1>
        <p className="text-muted-foreground text-center mb-6">
          Fill in your details and we will get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Juan Dela Cruz"
              value={form.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+63 912 345 6789"
              value={form.phone}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Gmail — placed directly under Phone Number */}
          <div className="flex flex-col gap-1">
            <label htmlFor="gmail" className="text-sm font-medium">
              Gmail Address
            </label>
            <input
              id="gmail"
              name="gmail"
              type="email"
              placeholder="yourname@gmail.com"
              value={form.gmail}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="text-sm font-medium">
              Preferred Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1">
            <label htmlFor="notes" className="text-sm font-medium">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Any special requests or details..."
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Submit Reservation
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
