// pages/auth/error.tsx
import React from 'react';
import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Error</h2>
        <p className="text-center">
          {error ? `Error: ${error}` : 'An unknown error occurred.'}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
