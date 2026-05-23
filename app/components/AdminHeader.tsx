"use client";

import { useRouter } from "next/navigation";

type Props = {
  hasEditingUser?: boolean;
};

export default function AdminHeader({ hasEditingUser }: Props) {
  const router = useRouter();

  return (
    <div className="relative w-full mb-8">

      {/* HEADER CARD */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* TITLE */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base font-sans">
            Monitor and Manage Employee Accounts
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">

          {/* REFRESH */}
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-xs sm:text-sm rounded-xl bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 transition"
          >
            Refresh
          </button>

          {/* LOGOUT */}
          <button
            onClick={() => {
              if (hasEditingUser) {
                alert("Please save changes before logging out.");
                return;
              }

              document.cookie =
                "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

              router.push("/login");
            }}
            className="px-4 py-2 text-xs sm:text-sm rounded-xl bg-red-100 border border-red-200 text-red-600 hover:bg-red-200 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}