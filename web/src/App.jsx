import { useState } from "react";

export default function AdminStarterScreen() {
  const [form, setForm] = useState({
    clinicName: "",
    email: "",
    address: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    // Handle your submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full grid md:grid-cols-10">

        {/* Left side: Visuals */}
        <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-8 flex flex-col items-center justify-center text-white md:col-span-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            alt="Pet Clinic"
            className="w-32 mb-4 animate-bounce"
          />
          <h2 className="text-3xl font-bold mb-2">Welcome to Pet Hub Admin</h2>
          <p className="text-center text-lg">Manage your clinic, events, and bookings in one place.</p>
        </div>

        {/* Right side: Form */}
        <div className="p-8 md:col-span-7">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Clinic Registration Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="clinicName"
              placeholder="Clinic Name"
              value={form.clinicName}
              onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Clinic Address"
              value={form.address}
              onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <textarea
              name="description"
              rows="3"
              placeholder="Brief Description"
              value={form.description}
              onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            ></textarea>
            <button
              type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Apply for Approval
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}