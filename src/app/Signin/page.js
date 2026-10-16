import { Suspense } from "react";
import SignInForm from "./signinForm";

export default function SignInPage(){
  return(
    <Suspense fallback = {<p className="status-text">Loading form...</p>}>
        <SignInForm />
    </Suspense>
  )
}