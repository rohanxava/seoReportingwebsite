import { Suspense } from 'react';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { requestPasswordReset } from '../actions/auth';

function ForgotPasswordPageContent() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40 px-4">
      <ForgotPasswordForm requestPasswordReset={requestPasswordReset} />
    </div>
  );
}

export default function ForgotPasswordPage() {
    return (
        <Suspense>
            <ForgotPasswordPageContent />
        </Suspense>
    )
}