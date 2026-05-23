  "use client";

  import { useState } from "react";

  type SexType = "" | "Male" | "Female";

  export default function EditUserModal({
    user,
    onClose,
    onSaved,
  }: any) {
    const [form, setForm] = useState({
  name: user.name || "",
  email: user.email || "",
  password: "",
  phone: user.phone || "",
  address: user.address || "",
  department: user.department || "",
  position: user.position || "",
  birthdate: user.birthdate || "",
  salary: user.salary || "",
  sex: user.sex || "",
  notes: user.notes || "",
});
const [saving, setSaving] = useState(false);
const [success, setSuccess] = useState(false);
   const save = async () => {
  setSaving(true);
  setSuccess(false);

  try {
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log("STATUS:", res.status);
    console.log("RESPONSE:", data);

    if (!res.ok) {
      alert(JSON.stringify(data));
      return;
    }

    setSuccess(true);

    // optional refresh
    if (onSaved) onSaved();

    setTimeout(() => {
      onClose();
    }, 800);

  } catch (err) {
    console.log(err);
  } finally {
    setSaving(false);
  }
};
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        
        {/* MODAL CARD */}
        <div className="bg-white p-6 rounded-2xl w-[420px] space-y-3 shadow-xl border border-gray-200">
{success && (
  <div className="text-xs text-green-600 bg-green-50 border border-green-200 p-2 rounded-lg">
    Changes saved successfully
  </div>
)}
          <h2 className="text-gray-900 text-lg font-semibold">
            Edit Employee
          </h2>

          {/* NAME */}
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg outline-none focus:border-gray-400"
            placeholder="Name"
          />

          {/* EMAIL */}
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg outline-none focus:border-gray-400"
            placeholder="Email"
          />
{/* PASSWORD */}
<input
  type="password"
  value={form.password}
  onChange={(e) =>
    setForm({ ...form, password: e.target.value })
  }
  className="w-full p-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg outline-none focus:border-gray-400"
  placeholder="New Password"
/>
          {/* SEX */}
          <select
            value={form.sex}
            onChange={(e) =>
              setForm({ ...form, sex: e.target.value as SexType })
            }
            className="w-full p-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg"
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* BIRTHDATE */}
          <input
            type="date"
            value={form.birthdate}
            onChange={(e) =>
              setForm({ ...form, birthdate: e.target.value })
            }
            className="w-full p-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg"
          />

          {/* PHONE */}
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full p-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg"
            placeholder="Phone"
          />

          {/* ADDRESS */}
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full p-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg"
            placeholder="Address"
          />

          {/* DEPARTMENT */}
          <input
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
            className="w-full p-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg"
            placeholder="Department"
          />

          {/* POSITION */}
          <input
            value={form.position}
            onChange={(e) =>
              setForm({ ...form, position: e.target.value })
            }
            className="w-full p-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg"
            placeholder="Position"
          />

          {/* SALARY */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              ₱
            </span>
            <input
              value={form.salary}
              onChange={(e) =>
                setForm({ ...form, salary: e.target.value })
              }
              className="w-full p-2 pl-8 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg"
              placeholder="Salary"
            />
          </div>


          {/* BUTTONS */}
          <div className="flex gap-2 pt-3">
            <button
  onClick={save}
  disabled={saving}
  className={`px-3 py-2 rounded-lg w-full text-white transition ${
    saving
      ? "bg-green-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {saving ? "Saving..." : "Save"}
</button>

            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-3 py-2 rounded-lg w-full"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    );
  }