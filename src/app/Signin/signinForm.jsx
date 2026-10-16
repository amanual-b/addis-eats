"use client";

import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mutate } from "swr";
import { handleSignIn } from "../auth/actions";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const nextParam = searchParams.get("next") || "/menu";

  const [state, formAction, isPending] = useActionState(handleSignIn, null);

  useEffect(() => {
    mutate("api/session")
    if (state?.success && state?.redirectTo) {
      router.push(state.redirectTo);
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="form-wrap">
      <form action={formAction} className="form-card">
        <h2>Sign In to Addis Eats</h2>
        
        {state?.error && (
          <div className="msg msg-error">{state.error}</div>
        )}

        <input type="hidden" name="next" value={nextParam} />

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            
            placeholder="e.g. 0911223344"
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            
            placeholder="••••••••"
            required 
          />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Verifying Credentials..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
