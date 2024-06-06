// pages/Adm/Produtos/add.tsx
import React from 'react';
import ProductForm from '../../../components/ProductForm';
import withAuth from '../../../components/withAuth';

const AddProductPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ProductForm />
    </div>
  );
};

export default withAuth(AddProductPage);
