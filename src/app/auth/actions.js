'use server'
import { cookies } from "next/headers";
import users from "../users.json"

export async function handleSignIn(prevState, formData) {
  const phone = formData.get("phone");
  const password = formData.get("password");
  let targetNextPath = formData.get("next") || "/";
  const user = users.find(person => person.phone === phone)
  
  if (!phone || !password) {
    return { error: "Please enter both your phone number and password." };
  }
  if (!user) {
    return { error: "Invalid credentials. Please verify your phone number and password." };
  }

  let assignedToken = "";
  if (phone === user.phone && password === user.password) {
    assignedToken = user.id; 
  } else {
    return { error: "Invalid credentials. Please verify your phone number and password." };
  }

  (await cookies()).set("session", assignedToken, {
    httpOnly: true,                 
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/",
  });

  if (!targetNextPath.startsWith("/") || targetNextPath.startsWith("//")) {
    targetNextPath = "/menu";
  }

  return { success: true, redirectTo: targetNextPath };
}
