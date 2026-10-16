'use client';
import Link from "next/link";
import { useCartStore } from "../Provider";
export default function Carts() {
    const item = useCartStore((s)=>s.item)
    const addItem = useCartStore((s)=> s.addItem)
    const changeQty = useCartStore((s)=> s.changeQty)
    const remove = useCartStore((s)=> s.remove)
    const clear = useCartStore((s)=> s.clear)

    if (item.length === 0) {
            return(
                <div className="empty">
                    <h2>Your cart is empty</h2>
                    <Link href="/menu" className="btn">Go to menu</Link>
                </div>
            )
        }
    const totalPrice = item.reduce((acc,item)=> acc + (item.price * item.qty),0)

    return(
        <>
        <h1 className="page-title">Your Cart</h1>
        <div className="cart-layout">
            <div className="cart-list">
                {item.map(dish=> {
                    return(
                        <div key={dish.id} className="cart-item">
                            <div>
                                <p className="cart-name">{dish.name}</p>
                                <p className="muted">{dish.price} <span>ETB</span> each</p>
                            </div>
                            <p className="cart-price">{dish.price * dish.qty} <span>ETB</span></p>
                            <div className="cart-controls">
                                <button onClick={()=>changeQty(dish)} className="btn-outline">-</button>
                                <span className="cart-qty">{dish.qty}</span>
                                <button onClick={()=>addItem(dish)} className="btn-outline">+</button>
                            </div>
                            <button onClick={()=>remove(dish)} className="btn-danger">Remove</button>
                        </div>
                    )
                })}
            </div>
            <aside className="cart-summary">
                <h2>Order summary</h2>
                <div className="cart-total">
                    <span>Total</span>
                    <span className="amount">{totalPrice} <span>ETB</span></span>
                </div>
                <Link href="/Checkouts" className="btn">Checkout</Link>
                <button onClick={()=>clear()} className="btn-danger">Clear cart</button>
            </aside>
        </div>
        </>
    )
}
