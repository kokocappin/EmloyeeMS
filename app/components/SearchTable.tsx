"use client";

import { useState } from "react";

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

export default function SearchTable({
  users,
  onEdit,
  onRefresh,
}: {
  users: User[];
  onEdit: (user: User) => void;
  onRefresh: () => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

 const toggleActive = async (id: string) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toggleActive: true }),
  });

  if (!res.ok) {
    alert("Update failed");
    return;
  }

  onRefresh();
};

  return (
    <div className="space-y-4">

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search employees..."
        className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400"
      />

      {/* TABLE */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-sm">

        <table className="w-full text-sm text-left text-gray-900">

          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr
                key={u.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >

                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3 text-gray-600">{u.email}</td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      u.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2">

                  {/* EDIT */}
                  <button
                    onClick={() => onEdit(u)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </button>

                  {/* TOGGLE ACTIVE */}
                  <button
                    onClick={() => toggleActive(u.id)}
                    className={`px-3 py-1 rounded text-xs font-medium transition ${
                      u.isActive
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {u.isActive ? "Deactivate" : "Activate"}
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}