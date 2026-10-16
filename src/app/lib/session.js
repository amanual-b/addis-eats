import { cookies } from "next/headers";

export async function getSession() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;
  if(token){
    return token;
  }
  
  // if (token === "mock-customer-token") {
  //   return { id: "usr_31", name: "Almaz", role: "customer" };
  // }
  // if (token === "mock-staff-token") {
  //   return { id: "usr_99", name: "Chef Chala", role: "staff" };
  // }
  return null;
}
