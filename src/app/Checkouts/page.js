import { redirect } from "next/navigation";
import { getSession } from "../lib/session";
import { Suspense } from "react";
import OrderForm from "./orderForm";

export default async function Checkout() {
    const user = await getSession();
    if (!user) {
        redirect("/Signin?next=/checkout")
    }
    return(
        <main className="page">
        <Suspense fallback={<p className="status-text">Loading form...</p>}>
            <OrderForm />
        </Suspense>
        </main>
    )
}
