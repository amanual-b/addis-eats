import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import OrderStatus from "./OrderStatus"; 
import { getSession } from "../../lib/session";


async function getOrder(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to execute server-side prefetch:", error);
    return null;
  }
}

export default async function OrderPage({ params }) {
  const user = await getSession();
  
  if (!user) {
    redirect("/signin?next=/orders"); 
  }
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }
  if (order.user !== Number(user)) {
    return(
      <h1 className="status-text error">Not your order</h1>
    )
  }

  return (
    <main className="page">
      <h1 className="page-title">Your Order</h1>
      <OrderStatus id={id} initial={order} />
    </main>
  );
}
