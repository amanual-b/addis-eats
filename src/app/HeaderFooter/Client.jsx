"use client"
import Link from "next/link";
import useSwr from "swr"
import fetcher from "../lib/fetcher";
import CartLink from "./CartLink";
export function Client() {
    const {data, isLoading} = useSwr("api/session", fetcher,{
        revalidateOnFocus: false
    })
    const user = data?.user
    if(isLoading) return <span className="nav-placeholder" aria-hidden="true" />
    return(
        <>
        {user && <Link href={`/orders/${user}`}>Orders</Link>}
        {user && <Link href={`/order-status/${user}`}>Order-status</Link>}
        <CartLink />
        </>
    )
}