"use client"
import Link from "next/link";
import useSwr from "swr"
import fetcher from "../lib/fetcher";
import LogOut from "./logout";
export default function SignInOut() {
    const {data, isLoading} = useSwr("/api/session", fetcher, {
        revalidateOnFocus: false
    })
    const user = data?.user
    if (isLoading) return <span className="nav-placeholder" aria-hidden="true" />
    return(
        user ? <LogOut/>  : <Link href="/Signin">Sign in</Link>  
    )
}