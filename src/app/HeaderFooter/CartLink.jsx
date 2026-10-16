'use client'
import Link from "next/link"
import { useCartStore } from "../Provider"
export default function CartLink() {
    const count = useCartStore((s)=>s.item.length)
    return(
        <Link href="/cart">Cart{count > 0 && <span className="cart-count">{count}</span>}</Link>
    )
}