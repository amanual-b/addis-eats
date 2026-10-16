'use client'
import { useCartStore } from "../Provider"
export default function AddToCart({dish}) {
    const addItem = useCartStore((s)=> s.addItem)
    let inCartQty = useCartStore((s)=> s.item.find((i)=> i.id === dish.id )?.qty ?? 0)
    
    return(
        <>
            <button onClick={()=>{addItem(dish)}}>Add{inCartQty > 0 && <span>({inCartQty})</span>}</button>
        </>
    )
}