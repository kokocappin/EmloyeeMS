"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 font-mono">

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6">

        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Forgot Password
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            If you forgot your account password,
            please contact the administrator.
          </p>
        </div>

        {/* INFO BOX */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">

          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400">
              Administrator
            </p>

            <p className="text-sm text-gray-800 font-medium">
              Head Office
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400">
              Contact
            </p>

            <p className="text-sm text-gray-800">
              viraykurt09@gmail.com
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400">
              Message
            </p>

            <p className="text-sm text-gray-600">
              Request a password reset from the system administrator.
            </p>
          </div>

        </div>
{/* FOOTER */}
        <div className="mt-6 text-center text-[10px] text-gray-400">
          by <span className="text-gray-900">dylanweb</span>
        </div>
        {/* BUTTON */}
        <Link
          href="/login"
          className="block w-full text-center bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
        >
          Back to Login
        </Link>

      </div>

    </div>
  );
}