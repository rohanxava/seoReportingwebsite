import { Suspense } from 'react';
import { SignupForm } from "@/components/auth/signup-form";
import { signupUser } from '../actions/auth';

function SignupPageContent() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40 px-4">
      <SignupForm signupUser={signupUser} />
    </div>
  );
}

export default function SignupPage() {
    return (
        <Suspense>
            <SignupPageContent />
        </Suspense>
    )
}
