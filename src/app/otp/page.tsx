
import { Suspense } from 'react';
import { OtpForm } from "@/components/auth/otp-form";
import { verifyOtp } from '../actions/auth';

function OtpPageContent() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-muted/40 px-4">
            <OtpForm verifyOtp={verifyOtp} />
        </div>
    );
}


export default function OtpPage() {
  return (
    <Suspense>
        <OtpPageContent />
    </Suspense>
  );
}
