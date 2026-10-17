import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import OrderStatus from "./OrderStatus"; 
import { getSession } from "../../lib/session";
// import users from "../../users.json"


async function getOrder(user) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const res = await fetch(`https://addis-eats-xi.vercel.app/api/order/${user}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to execute server-side prefetch:", error);
    return null;
  }
}

export default async function OrderPage() {
  const user = await getSession();
  
  if (!user) {
    redirect("/signin?next=/kitchens"); 
  }

  const allOrder = await getOrder(user);

  if (!allOrder) {
    notFound();
  }
  const orders = allOrder.filter(order=> order.status !== "Delivered")
  if (orders.length === 0) {
    return(
      <p className="status-text">No undelivered orders</p>
    )
  }
  
  return (
    <main className="page">
      <h1 className="page-title">Your Orders</h1>
      <Suspense fallback={<p className="status-text">Loading orders...</p>}>
        <OrderStatus user={user} initial={orders} />
      </Suspense>
      
    </main>
  );
}
