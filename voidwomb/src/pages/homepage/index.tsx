import Image from "next/image";
import Head from 'next/head';
import '../../components/RootLayout'

export default function Home() {
  return (
    <div className="bg-gray-100 text-white" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <Head>
      <title>Voidwomb</title>
      </Head>
      <div className="bg-transparent rounded-lg mx-auto max-w-2xl">
        <header className="bg-transparent p-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center">Spiritual Apotheosis</h1>
          </div>
        </header>

        <main className="container mx-auto mt-8">
          <section className="mt-8 md:mt-0 md:ml-8">
            <div className="mb-8 flex justify-center">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/EwgyST8ZYFI?si=V-vtAvQ5XRpvb3T9"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="container mx-auto flex justify-between items-center">
              <div className="w-full md:w-1/2 px-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Tracklist</h2>
                <ul className="mx-auto text-center">
                  <li className="mb-4">
                    <h3 className="text-xl font-bold">1. Exordium (intro)</h3>
                  </li>
                  {/* Restante da lista de faixas */}
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
