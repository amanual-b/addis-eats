"use client";

import useSWR from "swr";
import fetcher from "../../lib/fetcher";

export default function OrderStatus({ id, initial }) {
  const { data: order, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initial,
    refreshInterval: 5000,
  });

  if (error) return <div className="status-text error">Failed to fetch order updates.</div>;
  if (!order) return <div className="status-text">Loading order...</div>;

  const orderTotal = order.items?.reduce((acc, item) => acc + (item.price * item.qty), 0) || 0;

  return (
    <div className="order-list">
      <div className="order-card">
        <div className="order-head">
          <div>
            <h2>Order #{order.id}</h2>
            <p className="order-sub">orders</p>
          </div>
          <span className={`badge ${order.status === "Delivered" ? "badge-done" : ""}`}>
            {order.status}
          </span>
        </div>

        <h3 className="order-label">Ordered Selection</h3>
        <ul className="order-items">
          {order.items?.map((item) => (
            <li key={item.id} className="order-item">
              <div className="order-item-row">
                <span>{item.name} <span className="order-qty">x{item.qty}</span></span>
                <span>{item.price * item.qty} ETB</span>
              </div>
              <p className="order-desc">{item.description}</p>
              <div className="chips">
                {item.ingredients?.map((ing, idx) => (
                  <span key={idx} className="chip">{ing}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="order-total">
          <span>Total</span>
          <span className="amount">{orderTotal.toLocaleString()} ETB</span>
        </div>
      </div>
    </div>
  );
}
