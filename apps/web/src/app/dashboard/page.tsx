"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/");
    }

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

  function handleLogout() {
    localStorage.removeItem("token");

    router.push("/");
  }

  return (
    <main className="p-10 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">
          Dashboard 🚀
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

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