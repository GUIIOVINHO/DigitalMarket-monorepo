"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(
        "http://localhost:3002/api/products"
      );

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRegister() {
    const response = await fetch(
      "http://localhost:3000/api/auth/register",
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
      "http://localhost:3000/api/auth/login",
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
    <main className="p-10 flex flex-col gap-6">
      <h1 className="text-4xl font-bold">
        DigitalMarket 🚀
      </h1>

      <div className="flex flex-col gap-2 max-w-sm">
        <input
          type="email"
          placeholder="Correo"
          className="border p-2 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleRegister}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Registrarse
        </button>

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Iniciar sesión
        </button>
      </div>

      <hr />

      <h2 className="text-2xl font-bold">
        Productos
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />

            <h3 className="text-xl font-bold mt-2">
              {product.name}
            </h3>

            <p>
              {product.description}
            </p>

            <p className="font-bold">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}