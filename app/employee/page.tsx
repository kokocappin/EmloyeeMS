  "use client";

  import { useEffect, useState } from "react";

  type User = {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  phone?: string;
  address?: string;
  department?: string;
  position?: string;
  salary?: string;
  role: string;
  sex?: "Male" | "Female" | "";
  notes?: string;
};

  export default function Employee() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [changingPassword, setChangingPassword] = useState(false);
const changePassword = async () => {
  if (!password || !confirmPassword) {
    alert("Fill all password fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    setChangingPassword(true);

    const res = await fetch(`/api/users/${user?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed");
      return;
    }

    alert("Password updated");

    setPassword("");
    setConfirmPassword("");

  } catch (err) {
    console.log(err);
  } finally {
    setChangingPassword(false);
  }
};
    useEffect(() => {
      let interval: any;

      const loadUser = async () => {
        try {
          interval = setInterval(() => {
            setProgress((p) => (p < 90 ? p + 5 : p));
          }, 50);

          const res = await fetch("/api/auth/me");
          const data = await res.json();

          setUser(data.user);
          setProgress(100);
        } catch (err) {
          console.log("error loading user", err);
        } finally {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
        }
      };

      loadUser();

      return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    };

    const handlePrint = () => {
      const printContent = document.getElementById("print-area");
      if (!printContent) return;

      const newWindow = window.open("", "_blank");
      if (!newWindow) return;

      newWindow.document.write(`
        <html>
          <head>
            <title>Employee Record</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 30px;
                background: #fff;
                color: #111;
              }

              .title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
              }

              .grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
              }

              .box {
                padding: 12px;
                border: 1px solid #eee;
                border-radius: 8px;
                background: #fafafa;
              }

              .label {
                font-size: 10px;
                color: #777;
                text-transform: uppercase;
                margin-bottom: 5px;
              }

              .value {
                font-size: 14px;
                font-weight: 600;
              }

              .footer {
                margin-top: 20px;
                font-size: 10px;
                color: #666;
                border-top: 1px solid #eee;
                padding-top: 10px;
              }
            </style>
          </head>

          <body>
            <div class="title">Employee Information Record</div>

            <div class="grid">
              ${Array.from(printContent.children)
                .map((el) => `<div class="box">${el.innerHTML}</div>`)
                .join("")}
            </div>

            <div class="footer">
              System generated employee document
            </div>
          </body>
        </html>
      `);

      newWindow.document.close();
      newWindow.print();
      newWindow.close();
    };

    // LOADING UI
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

    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-mono antialiased">
          <p className="text-red-500">User not found</p>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 font-mono antialiased px-6 py-8 relative overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gray-200 blur-[140px] opacity-40 rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto space-y-8">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold tracking-wide">
                EMPLOYEE DASHBOARD
              </h1>
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                personal record overview
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-xs rounded-xl bg-white border border-gray-200 hover:bg-gray-100 transition"
              >
                PRINT
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-xs rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition"
              >
                LOGOUT
              </button>
            </div>
          </div>

         {/* INFO CARD */}
<div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

  <div className="p-5 border-b border-gray-200">
    <h2 className="text-lg font-semibold">
      EMPLOYEE INFORMATION
    </h2>
  </div>

  <div
    id="print-area"
    className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
  >
    <Info label="Name" value={user.name} />
    <Info label="Email" value={user.email} />
    <Info label="Birthdate" value={user.birthdate || "—"} />
    <Info label="Sex" value={user.sex || "—"} />
    <Info label="Phone" value={user.phone || "—"} />
    <Info label="Department" value={user.department || "—"} />
    <Info label="Position" value={user.position || "—"} />
    <Info
      label="Salary"
      value={user.salary ? `₱${user.salary}` : "—"}
    />
    <Info label="Role" value={user.role} />
  </div>

  <div className="p-5 border-t border-gray-200 text-[10px] text-gray-400">
    Please reach out to the administrator for additional details.

    <div className="mt-6 text-center text-[10px] text-gray-400">
      by <span className="text-gray-900">dylanweb</span>
    </div>
  </div>

</div>

{/* PASSWORD CARD */}
<div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

  <div className="p-5 border-b border-gray-200">
    <h2 className="text-lg font-semibold">
      CHANGE PASSWORD
    </h2>
  </div>

  <div className="p-5 space-y-3">

    <input
      type="password"
      placeholder="New Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-gray-400"
    />

    <input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-gray-400"
    />

    <button
      onClick={changePassword}
      disabled={changingPassword}
      className={`w-full py-3 rounded-xl text-white transition ${
        changingPassword
          ? "bg-gray-400"
          : "bg-black hover:bg-gray-800"
      }`}
    >
      {changingPassword
        ? "Updating..."
        : "Update Password"}
    </button>

  </div>

</div>


          </div>
        </div>
    );
  }

  /* INFO COMPONENT */
  function Info({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) {
    return (
      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white transition">
        <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
        
      </div>
      
    );
  }