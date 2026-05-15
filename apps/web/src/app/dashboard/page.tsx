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

  const [cartItems, setCartItems] =
    useState<any[]>([]);

  const [orders, setOrders] =
  useState<any[]>([]);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    fetchProducts();
    fetchCart();
    fetchOrders();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(
        "http://localhost:3002/api/products"
      );

      const data =
        await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCart() {
    try {
      const response = await fetch(
        "http://localhost:3003/api/cart"
      );

      const data =
        await response.json();

      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchOrders() {
  try {
    const response = await fetch(
      "http://localhost:3004/api/orders"
    );

    const data =
      await response.json();

    setOrders(data);
  } catch (error) {
    console.log(error);
  }
}

  function handleLogout() {
    localStorage.removeItem("token");

    router.push("/");
  }

  async function handleAddToCart(
    product: any
  ) {
    try {
      const response = await fetch(
        "http://localhost:3003/api/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            user_email:
              "cliente@digitalmarket.cl",
            product_id: product.id,
            product_name:
              product.name,
            price: product.price,
            quantity: 1,
            image_url:
              product.image_url,
          }),
        }
      );

      const data =
        await response.json();

      alert(
        data.message || data.error
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteItem(
    id: number
  ) {
    try {
      const response = await fetch(
        "http://localhost:3003/api/cart/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      const data =
        await response.json();

      alert(
        data.message || data.error
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCheckout() {
  try {
    const response = await fetch(
      "http://localhost:3004/api/orders/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          user_email:
            "cliente@digitalmarket.cl",
          items: cartItems,
          total: subtotal,
        }),
      }
    );

    const data =
      await response.json();

    alert(
      data.message || data.error
    );

    fetchCart();
    fetchOrders();
  } catch (error) {
    console.log(error);
  }
}

  const subtotal =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.quantity,
      0
    );

  return (
  <main className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto flex flex-col gap-10">

      <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            DigitalMarket 🚀
          </h1>

          <p className="text-gray-500 mt-2">
            Plataforma ecommerce basada en microservicios
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
        >
          Cerrar sesión
        </button>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Productos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h3 className="text-2xl font-bold text-gray-800">
                  {product.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-5">
                  <p className="text-2xl font-bold text-green-600">
                    ${product.price}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Carrito 🛒
          </h2>

          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex items-center gap-4"
              >
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg">
                    {item.product_name}
                  </h3>

                  <p className="text-gray-500">
                    Cantidad: {item.quantity}
                  </p>

                  <p className="font-bold text-green-600 mt-1">
                    ${item.price}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Total:
              <span className="text-green-600 ml-2">
                ${subtotal}
              </span>
            </h2>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl mt-6 text-lg font-bold"
            >
              Finalizar compra
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Mis órdenes 📦
          </h2>

          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-xl p-5"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xl">
                    Orden #{order.id}
                  </h3>

                  <p className="text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between"
                    >
                      <p>{item.product_name}</p>
                      <p className="font-bold">
                        x{item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4">
                  <h3 className="text-xl font-bold text-green-600">
                    Total: ${order.total}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </main>
);

}