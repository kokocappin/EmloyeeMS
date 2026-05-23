"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const login = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      const role = data.user.role;

      setSuccess("Login successful! Redirecting...");

      document.cookie = `token=${data.token}; path=/`;

      setTimeout(() => {
        if (role === "ADMIN") router.push("/admin");
        else if (role === "EMPLOYEE") router.push("/employee");
        else setError("Unknown role");
      }, 1200);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-mono px-4 relative overflow-hidden">
<button
  onClick={() => router.push("/")}
  className="absolute top-5 left-5 px-4 py-2 text-xs rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition"
>
  ← Back
</button>
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gray-200 blur-[140px] opacity-60 rounded-full" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-gray-100 blur-[140px] opacity-70 rounded-full" />
      </div>

      {/* CARD */}
      <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 text-sm mt-1">
          Login to your account
        </p>

        {/* ERROR */}
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mt-4 text-sm text-green-600 bg-green-50 border border-green-200 p-2 rounded-lg text-center">
            {success}
          </div>
        )}

        {/* FORM */}
        <div className="mt-6 space-y-3">

          <input
            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-400 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

         {/* PASSWORD */}
<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    className="w-full p-3 pr-20 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-400 outline-none"
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

{/* FORGOT PASSWORD */}
<div className="text-right mt-2">
  <Link
    href="/forgot-password"
    className="text-xs text-gray-500 hover:text-gray-900 transition"
  >
    Forgot Password?
  </Link>
</div>

        </div>

        {/* BUTTON */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER LINK */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-gray-900 font-medium hover:underline">
            Create account
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