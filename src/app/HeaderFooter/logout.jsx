'use client'
import { useActionState } from "react"
import { logout } from "../auth/logoutAction"
export default function LogOut() {
    const [, formAction, isPending] = useActionState(logout, null);
        return(
            <form action={formAction}>
                <button type="submit">Sign out</button>
            </form>
        )
}