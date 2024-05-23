// pages/auth/new-user.tsx
import React from 'react';

const NewUser = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Welcome!</h2>
        <p className="text-center">Your account has been successfully created. You can now log in with your credentials.</p>
      </div>
    </div>
  );
};

export default NewUser;
