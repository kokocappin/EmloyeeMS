"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [sex, setSex] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const register = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !department ||
      !position ||
      !sex ||
      !birthdate
    ) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    const phPhoneRegex = /^(\+63|0)9\d{9}$/;
    if (!phPhoneRegex.test(phone)) {
      setError("Invalid PH phone number.");
      setLoading(false);
      return;
    }

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!strongPassword.test(password)) {
      setError("Weak password.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          address,
          department,
          position,
          sex,
          birthdate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setSuccess("Account created successfully!");

      setTimeout(() => router.push("/login"), 1200);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-mono px-4 relative overflow-hidden">

      {/* SOFT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gray-200 blur-[140px] opacity-60 rounded-full" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-gray-100 blur-[140px] opacity-70 rounded-full" />
      </div>

      {/* CARD */}
      <div className="relative w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 text-sm mt-1">
          Register as an employee
        </p>

        {/* ERROR / SUCCESS */}
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 text-sm text-green-600 bg-green-50 border border-green-200 p-2 rounded-lg text-center">
            {success}
          </div>
        )}

        {/* FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">

          <input
            className="sm:col-span-2 p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-400 outline-none"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-400 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-400 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-gray-200 px-2 py-1 rounded"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            className="p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-400 outline-none"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <select
            className="p-3 rounded-xl bg-gray-50 border border-gray-200"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option value="">Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="date"
            className="p-3 rounded-xl bg-gray-50 border border-gray-200"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />

          <input
            className="p-3 rounded-xl bg-gray-50 border border-gray-200"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <input
            className="p-3 rounded-xl bg-gray-50 border border-gray-200"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          <input
            className="sm:col-span-2 p-3 rounded-xl bg-gray-50 border border-gray-200"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={register}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* LOGIN */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-gray-900 font-medium hover:underline">
            Login
          </Link>
        </p>
{/* FOOTER */}
        <div className="mt-6 text-center text-[10px] text-gray-400">
          by <span className="text-gray-900">dylanweb</span>
        </div>
      </div>
    </div>
  );
}