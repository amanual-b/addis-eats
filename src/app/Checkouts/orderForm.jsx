'use client'
import { useActionState } from "react";
import createOrder from "../action";
import { useCartStore } from "../Provider";
import { orderNow } from "../orderDishes";

export default function OrderForm() {
    
    const [state, formAction, isPendig] = useActionState(createOrder ,{success:false, errors: {}})
    const clear = useCartStore((s)=> s.clear)
    const orderNows = useCartStore((s)=> s.orderNows)

    if (state.success) {
        orderNows(state.user).then((orderStat)=>{
            if (orderStat === "success") {
                clear()
            }
            else{
                state.message = "faild to set orderNow"
            }
        }).catch((error)=>{
            state.message = "faild becaus of error"
        })
        
    }

    return(
        <div className="form-card">
            <h1>Checkout</h1>
            <form action={formAction}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" />
                    {state.errors?.name && <p className="field-error">{state.errors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" />
                    {state.errors?.phone && <p className="field-error">{state.errors.phone}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input id="address" name="address" />
                    {state.errors?.address && <p className="field-error">{state.errors.address}</p>}
                </div>
                {state.errors?.global && <p className="msg msg-error">{state.errors.global}</p>}
                {state.success && <p className="msg msg-success">{state.message}</p>}
                <button type="submit" disabled={isPendig}>{isPendig ? "Placing order..." : "Order"}</button>
            </form>
        </div>
    )
}
