import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center px-6 bg-gray-50 text-gray-900 overflow-hidden font-mono">

      {/* BACKGROUND GLOW (LIGHT MODE SOFT) */}
      <div className="absolute inset-0">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gray-200 blur-[160px] opacity-60 rounded-full" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-gray-100 blur-[160px] opacity-70 rounded-full" />
      </div>

      {/* CARD */}
      <div className="relative w-full max-w-2xl text-center">

        <div className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur-xl shadow-xl p-10">

          {/* TITLE */}
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-gray-900 to-gray-500 bg-clip-text text-transparent">
            Employee Management System
          </h1>

          <p className="text-gray-500 text-sm mt-4 leading-relaxed">
            Secure role-based system for managing employees, access control, and admin operations.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

            <Link
              href="/login"
              className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition shadow-md"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition font-medium text-gray-900"
            >
              Register
            </Link>

          </div>

          {/* CREATOR */}
          <div className="mt-8 text-xs text-gray-400">
            by <span className="text-gray-900 font-semibold">dylanweb</span>
          </div>

        </div>
      </div>
    </main>
  );
}