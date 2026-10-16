'use server'
import z, { success }  from "zod"
import { getSession } from "./lib/session";

const validationSchema = z.object({
    name: z.string().regex(/^[A-Za-z-\s,']{2,}$/,{message: "Name must be at least two caracters"}),
    phone: z.string().regex(/^(?:\+251|0)(9|7)\d{8}$/,{message: "Phone use 0900000000 this forrmat"}),
    address: z.string().regex(/^[A-Za-z]{2,}$/,{message: "enter valid address"})
})

export default async function createOrder (prevState, formData){
    const rawData = { name: formData.get("name"), phone: formData.get("phone"), address: formData.get("address") }
    const result = validationSchema.safeParse(rawData)
    if (!result.success) {
        const formattedErrors = {}
        result.error.issues.forEach(issue =>{formattedErrors[issue.path[0]] = issue.message })
        return {success: false, errors: formattedErrors}
    }
    try {
        const user =await getSession()
        return{success: true, message: "ordered successfully", user: user}
        
    } catch (error) {
        return{success: false, errors: {global: "faild to order"}}
    }
}


// Stand-in database record query
async function getOrderFromDB(orderId) {
  return { id: orderId, userId: "usr_31", item: "Kitfo" };
}

export async function cancelOrder(orderId) {
  const user = await getSession();
  if (!user) {
    throw new Error("401: Unauthorized access denied.");
  }

  const order = await getOrderFromDB(orderId);
  if (!order) {
    throw new Error("404: Order resource not found.");
  }

  if (order.userId !== user.id) {
    throw new Error("403: Forbidden. You do not own this order.");
  }

  console.log(`Order ${orderId} successfully marked cancelled by ${user.id}`);
  return { success: true };
}
