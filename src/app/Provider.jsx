'use client'
import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useCartStore = create(persist((set, get)=>({
    item:[],
    orderStatus: "",

    addItem: (dish)=>set((state)=>{
        const check = state.item.find(d=> d.id === dish.id)
        if (check) {
            return{item: state.item.map((i)=>i.id===dish.id ? {...i, qty: i.qty + 1} : i)}
        }

        return {item: [...state.item, {...dish, qty: 1}]}

    }),

    changeQty: (dish)=> set((state)=>{
        const check = state.item.find(d=>d.id===dish.id)
        if(!check){
            return alert("someting went wrong")
        }
        if (check.qty > 1) {
            return {item: state.item.map(i=>i.id===dish.id ? {...i, qty: i.qty - 1 } : i)}
        }
        if(check.qty === 1){
            return {item: state.item.filter(i=> i.id !== dish.id)}
        }
    }),
    remove: (dish)=>set((state)=>{
        const check = state.item.find(d=>d.id===dish.id)
        if (!check) {
            return alert("something went wrong")
        }
        if (check) {
            return {item: state.item.filter((i)=> i.id !== dish.id)}
        }
    }),
    
    clear: ()=> set({item: []}),

    orderNows: async (user)=> {
        const userId = Number(user)
        const currentItems = get().item
        const toOrder = {user: userId, status: "Cooking", items: currentItems}
        const orderOnLocal = localStorage.getItem("orders")
        if (orderOnLocal) {
            try {
                const parsedData = JSON.parse(orderOnLocal)
                const orderWithId = {id: parsedData.length + 1, ...toOrder}
                parsedData.push(orderWithId)
                localStorage.setItem("orders", JSON.stringify(parsedData))
                set({orderStatus: "success"})
                return "success";
            } catch (error) {
                set({orderStatus: "failld"})
                return "failld";
            }
            
        }
            try {
                const response = await fetch(`/api/orders/${userId}`)
                if (response.ok) {
                    const data = await response.json()
                    if (data && Array.isArray(data)) {
                        const orderWithId = {id: data.length + 1, ...toOrder}
                        data.push(orderWithId)
                        localStorage.setItem("orders", JSON.stringify(data))
                        set({orderStatus: "success"})
                        return "success";
                    }
                    else{
                        const finalData = {id: 1, ...toOrder}
                        localStorage.setItem("orders", JSON.stringify([finalData]))
                        set({orderStatus: "success"})
                        return "success";
                    }
                }
            } catch (error) {
                set({orderStatus: "failld"})
                return "failld";
            }
            
        
        return "faild"
    }
})))