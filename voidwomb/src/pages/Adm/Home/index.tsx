// src/pages/Adm/Home/index.tsx
import React from 'react';
import withAdminAuth from '../../../components/withAdminAuth';

const AdminHome = () => {
  return (
    <div>
      <h1>Admin Home</h1>
      <p>Welcome, Admin!</p>
    </div>
  );
};

export default withAdminAuth(AdminHome);
