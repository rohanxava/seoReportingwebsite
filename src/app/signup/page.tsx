
import { Suspense } from 'react';
import { SignupForm } from "@/components/auth/signup-form";

function SignupPageContent() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40 px-4">
      <SignupForm />
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
