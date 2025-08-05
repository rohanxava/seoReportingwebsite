

import { Suspense } from 'react';
import { LoginForm } from "@/components/auth/login-form";
import { loginUser } from './actions/auth';

function LoginPageContent() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40 px-4">
      <LoginForm loginUser={loginUser} />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageContent />
    </Suspense>
  );
}
