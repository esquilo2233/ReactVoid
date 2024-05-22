// pages/auth/verify-request.tsx
import React from 'react';

const VerifyRequest = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
        <p className="text-center">A verification link has been sent to your email address. Please check your email to verify your account.</p>
      </div>
    </div>
  );
};
export default VerifyRequest;
