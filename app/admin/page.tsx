"use client";

import { useEffect, useState } from "react";
import SearchTable from "../components/SearchTable";
import AdminHeader from "../components/AdminHeader";
import EditUserModal from "../components/EditUserModal";


type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  address: string | null;
  department: string | null;
  position: string | null;
  birthdate?: string | null;
  salary?: string | null;
  sex?: string | null;
  notes?: string | null;
  isActive?: boolean;
};


export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  // FAKE LOADING PROGRESS
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          loadUsers();
          return 100;
        }
        return prev + 1;
      });
    }, 12);

    return () => clearInterval(interval);
  }, []);

  const employees = users.filter((u) => u.role === "EMPLOYEE");

  const activeUsers = employees.filter((u) => u.isActive);
  const inactiveUsers = employees.filter((u) => !u.isActive);

  const adminUsers = users.filter((u) => u.role === "ADMIN");

  if (loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-mono antialiased">

      {/* LOADER DOTS */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce [animation-delay:0.15s]" />
        <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce [animation-delay:0.3s]" />
      </div>

      {/* TEXT */}
      <p className="mt-4 text-xs tracking-widest text-gray-500 uppercase">
        loading dashboard
      </p>

    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-mono px-6 py-8 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gray-200 blur-[140px] opacity-40 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">

        <AdminHeader />

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

          {/* TOTAL EMPLOYEES */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Total Employees
            </p>
            <h2 className="text-3xl font-bold mt-2">
              {employees.length}
            </h2>
          </div>

          {/* ACTIVE STATUS */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Active Accounts
            </p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {activeUsers.length}
            </h2>
          </div>

          {/* INACTIVE STATUS */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Inactive Accounts
            </p>
            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {inactiveUsers.length}
            </h2>
          </div>

          {/* ADMINS */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Admin Users
            </p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {adminUsers.length}
            </h2>
          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold">
              EMPLOYEE MANAGEMENT
            </h2>
          </div>

          <div className="p-5">
            <SearchTable
              users={employees}
              onEdit={(user) => setSelectedUser(user)}
              onRefresh={loadUsers}
            />
          </div>

        </div>

        {/* MODAL */}
        {selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onSaved={loadUsers}
          />
        )}

        {/* FOOTER */}
        <div className="mt-6 text-center text-[10px] text-gray-400">
          by <span className="text-gray-900">dylanweb</span>
        </div>

      </div>
    </div>
  );
}