"use client"
import { useCartStore } from "./Provider";
export async function orderNow(user) {
    const item = useCartStore.getState().item
    const userId = Number(user)
    const toOrder = {user: userId, status: "Cooking", items: item}
    const orderOnLocal = localStorage.getItem("orders")
    if (orderOnLocal) {
        const parsedData = JSON.parse(orderOnLocal)
        const orderWithId = {id: parsedData.length + 1, ...toOrder}
        parsedData.push(orderWithId)
        localStorage.setItem("orders", JSON.stringify(parsedData))
        return "success";
    }
    else if(!orderOnLocal){
        const response = await fetch(`/api/orders/${userId}`)
        if (response.ok) {
            const data = await response.json()
            if (data && Array.isArray(data)) {
                const orderWithId = {id: data.length + 1, ...toOrder}
                data.push(orderWithId)
                localStorage.setItem("orders", JSON.stringify(data))
                return "success";
            }
            else{
                const finalData = {id: 1, ...toOrder}
                localStorage.setItem("orders", JSON.stringify([finalData]))
                return "success";
            }
        }
    }
    return "faild"
}