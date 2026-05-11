import { User } from "@repo/shared-types";
import { formatCurrency } from "@repo/shared-utils";

export default function Home() {
  const user: User = {
    id: "1",
    name: "Guiovanni",
    email: "guiovanni@email.com",
    role: "admin"
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">
        DigitalMarket Monorepo
      </h1>

      <div className="text-center">
        <p>Usuario: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Rol: {user.role}</p>
      </div>

      <div className="text-2xl font-semibold">
        {formatCurrency(25000)}
      </div>
    </main>
  );
}