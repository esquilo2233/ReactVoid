import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Newsletter {
  id: number;
  title: string;
  content: string;
  status: string;
  sentAt: string | null;
  createdAt: string;
}

export default function NewsletterPanel() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const response = await fetch('/api/newsletter');
      if (!response.ok) throw new Error('Erro ao carregar newsletters');
      const data = await response.json();
      setNewsletters(data);
    } catch (error) {
      toast.error('Erro ao carregar newsletters');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error('Erro ao criar newsletter');

      toast.success('Newsletter criada com sucesso!');
      setTitle('');
      setContent('');
      fetchNewsletters();
    } catch (error) {
      toast.error('Erro ao criar newsletter');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (id: number) => {
    try {
      const response = await fetch(`/api/newsletter/${id}/send`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Erro ao enviar newsletter');

      toast.success('Newsletter enviada com sucesso!');
      fetchNewsletters();
    } catch (error) {
      toast.error('Erro ao enviar newsletter');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Criar Nova Newsletter</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Conteúdo
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={6}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Criando...' : 'Criar Newsletter'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Newsletters</h2>
        <div className="space-y-4">
          {newsletters.map((newsletter) => (
            <div
              key={newsletter.id}
              className="border rounded-md p-4 space-y-2"
            >
              <h3 className="text-lg font-semibold">{newsletter.title}</h3>
              <p className="text-sm text-gray-600">
                Status: {newsletter.status}
              </p>
              {newsletter.sentAt && (
                <p className="text-sm text-gray-600">
                  Enviada em: {new Date(newsletter.sentAt).toLocaleString()}
                </p>
              )}
              {newsletter.status === 'draft' && (
                <button
                  onClick={() => handleSend(newsletter.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                >
                  Enviar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 