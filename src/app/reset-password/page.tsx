import { Suspense } from 'react';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { resetPassword } from '../actions/auth';

function ResetPasswordPageContent() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40 px-4">
      <ResetPasswordForm resetPassword={resetPassword} />
    </div>
  );
}

export default function ResetPasswordPage() {
    return (
        <Suspense>
            <ResetPasswordPageContent />
        </Suspense>
    )
}