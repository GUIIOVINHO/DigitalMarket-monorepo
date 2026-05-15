"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function handleRegister() {
    const response = await fetch(
      "http://localhost:3001/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    alert(data.message || data.error);
  }

  async function handleLogin() {
    const response = await fetch(
      "http://localhost:3001/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (
      data.data?.session?.access_token
    ) {
      localStorage.setItem(
        "token",
        data.data.session.access_token
      );
    }

    alert(data.message || data.error);

    if (response.ok) {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center">
          DigitalMarket 🚀
        </h1>

        <input
          type="email"
          placeholder="Correo"
          className="border p-3 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="border p-3 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleRegister}
          className="bg-black text-white px-4 py-3 rounded hover:opacity-90 transition"
        >
          Registrarse
        </button>

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-3 rounded hover:opacity-90 transition"
        >
          Iniciar sesión
        </button>
      </div>
    </main>
  );
}