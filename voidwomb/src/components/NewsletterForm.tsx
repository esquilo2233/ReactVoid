import { useState } from 'react';
import { toast } from 'react-toastify';

export default function NewsletterForm() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/newsletter/subscription', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Erro ao inscrever na newsletter');
      }

      setIsSubscribed(true);
      toast.success('Inscrição realizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao inscrever na newsletter');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/newsletter/subscription', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao cancelar inscrição');
      }

      setIsSubscribed(false);
      toast.success('Inscrição cancelada com sucesso!');
    } catch (error) {
      toast.error('Erro ao cancelar inscrição');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
      <p className="text-gray-600 mb-4">
        Receba atualizações sobre novos produtos, promoções e novidades!
      </p>
      {!isSubscribed ? (
        <button
          onClick={handleSubscribe}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Inscrevendo...' : 'Inscrever-se'}
        </button>
      ) : (
        <button
          onClick={handleUnsubscribe}
          disabled={isLoading}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {isLoading ? 'Cancelando...' : 'Cancelar Inscrição'}
        </button>
      )}
    </div>
  );
} 