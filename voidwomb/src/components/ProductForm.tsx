import React from 'react';

interface ProductFormProps {
  onSubmit: (formData: FormData) => void;
  product?: any; // Ajuste o tipo conforme necessário
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, product }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" defaultValue={product?.name || ''} />
      </div>
      <div>
        <label>SKU:</label>
        <input type="text" name="sku" defaultValue={product?.sku || ''} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" defaultValue={product?.price || ''} />
      </div>
      <div>
        <label>Total Stock:</label>
        <input type="number" name="totalStock" defaultValue={product?.totalStock || ''} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" defaultValue={product?.description || ''} />
      </div>
      <div>
        <label>Color:</label>
        <input type="text" name="color" defaultValue={product?.color || ''} />
      </div>
      <div>
        <label>Images:</label>
        <input type="file" name="images" multiple />
      </div>
      <div>
        <label>Sizes:</label>
        <input type="text" name="sizes" defaultValue={JSON.stringify(product?.sizes || [])} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
