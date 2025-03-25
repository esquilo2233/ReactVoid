import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import GuestCheckoutForm from '@/components/Checkout/GuestCheckoutForm';
import { toast } from 'react-toastify';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Carregar itens do carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      
      // Calcular total
      const total = items.reduce((acc: number, item: CartItem) => {
        return acc + (item.price * item.quantity);
      }, 0);
      setTotalAmount(total);
    }
  }, []);

  const handleCheckoutSuccess = () => {
    // Limpar carrinho
    localStorage.removeItem('cart');
    // Redirecionar para página de sucesso
    router.push('/checkout/success');
  };

  if (!cartItems.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Carrinho Vazio</h1>
          <p className="text-gray-600 mb-4">
            Adicione produtos ao seu carrinho antes de prosseguir para o checkout.
          </p>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Ver Produtos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Resumo do Pedido */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.size && <p className="text-sm text-gray-600">Tamanho: {item.size}</p>}
                  <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                </div>
                <p className="font-medium">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">
                  R$ {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Checkout */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {session ? 'Finalizar Compra' : 'Comprar como Convidado'}
          </h2>
          
          {session ? (
            <div>
              <p className="text-gray-600 mb-4">
                Você está logado como {session.user.email}
              </p>
              {/* Aqui você pode adicionar o formulário de checkout para usuários logados */}
              <button
                onClick={() => toast.info('Funcionalidade em desenvolvimento')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Finalizar Compra
              </button>
            </div>
          ) : (
            <GuestCheckoutForm
              cartItems={cartItems}
              totalAmount={totalAmount}
              onSuccess={handleCheckoutSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
} 