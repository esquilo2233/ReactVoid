import { useState } from 'react';
import { toast } from 'react-toastify';

interface GuestCheckoutFormProps {
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    size?: string;
  }>;
  totalAmount: number;
  onSuccess: () => void;
}

export default function GuestCheckoutForm({
  cartItems,
  totalAmount,
  onSuccess,
}: GuestCheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'credit_card',
    shippingAddress: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/guest/sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          totalAmount,
          items: cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            size: item.size,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar venda');
      }

      toast.success('Compra realizada com sucesso!');
      onSuccess();
    } catch (error) {
      toast.error('Erro ao processar venda');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Telefone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Endereço de Entrega
        </label>
        <input
          type="text"
          name="shippingAddress"
          value={formData.shippingAddress}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Método de Pagamento
        </label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="credit_card">Cartão de Crédito</option>
          <option value="debit_card">Cartão de Débito</option>
          <option value="pix">PIX</option>
          <option value="boleto">Boleto</option>
        </select>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-4">
          <span className="text-lg font-medium">Total:</span>
          <span className="text-lg font-medium">
            R$ {totalAmount.toFixed(2)}
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Processando...' : 'Finalizar Compra'}
        </button>
      </div>
    </form>
  );
} 