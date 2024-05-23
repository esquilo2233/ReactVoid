import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProductById, updateProduct } from '../../../services/productService';

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [totalStock, setTotalStock] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(''); // Novo campo de cor
  const [images, setImages] = useState([{ imageUrl: '' }]);
  const [sizes, setSizes] = useState([{ size: '', stock: 0 }]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const product = await getProductById(parseInt(id as string));
        if (product) {
          setName(product.name);
          setSku(product.sku);
          setPrice(product.price.toString());
          setTotalStock(product.totalStock.toString());
          setDescription(product.description);
          setColor(product.color); // Definir o valor do campo de cor
          setImages(product.images.map((img: { imageUrl: string }) => ({ imageUrl: img.imageUrl })));
          setSizes(product.sizes.map((size: { size: string; stock: number }) => ({ size: size.size, stock: size.stock })));
        }
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData = { name, sku, price: parseFloat(price), totalStock: parseInt(totalStock), description, color }; // Incluindo cor
    await updateProduct(parseInt(id as string), productData, images, sizes);
    router.push('/adm/produtos');
  };

  return (
    <div className="container">
      <h1>Editar Produto</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
        <input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="number" placeholder="Estoque Total" value={totalStock} onChange={(e) => setTotalStock(e.target.value)} />
        <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Cor" value={color} onChange={(e) => setColor(e.target.value)} /> {/* Campo de cor */}
        <div>
          <h3>Imagens</h3>
          {images.map((image, index) => (
            <input
              key={index}
              type="text"
              placeholder="URL da imagem"
              value={image.imageUrl}
              onChange={(e) => {
                const newImages = [...images];
                newImages[index].imageUrl = e.target.value;
                setImages(newImages);
              }}
            />
          ))}
        </div>
        <div>
          <h3>Tamanhos</h3>
          {sizes.map((size, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Tamanho"
                value={size.size}
                onChange={(e) => {
                  const newSizes = [...sizes];
                  newSizes[index].size = e.target.value;
                  setSizes(newSizes);
                }}
              />
              <input
                type="number"
                placeholder="Estoque do tamanho"
                value={size.stock}
                onChange={(e) => {
                  const newSizes = [...sizes];
                  newSizes[index].stock = parseInt(e.target.value);
                  setSizes(newSizes);
                }}
              />
            </div>
          ))}
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditProduct;
