import React, { useState } from 'react';

function Store() {
  const [mainImage, setMainImage] = useState("/img/Merch_FotosSA/T-ShirtRedSA_Front.jpg");
  const [selectedSize, setSelectedSize] = useState("");

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  return (
    <div>
      <section className="py-8  md:py-16 dark:bg-gray-900 antialiased text-white">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <div className="gallery-container flex">
                <div className="image-thumbnails flex flex-col space-y-4 mr-6">
                  <img 
                    src="/img/Merch_FotosSA/T-ShirtRedSA_BackZoom.jpg" 
                    alt="Thumbnail 1" 
                    onClick={() => handleThumbnailClick("/img/Merch_FotosSA/T-ShirtRedSA_BackZoom.jpg")} 
                    className="cursor-pointer w-32 h-32 object-contain border" 
                  />
                  <img 
                    src="/img/Merch_FotosSA/T-ShirtRedSA_Back.jpg" 
                    alt="Thumbnail 3" 
                    onClick={() => handleThumbnailClick("/img/Merch_FotosSA/T-ShirtRedSA_Back.jpg")} 
                    className="cursor-pointer w-32 h-32 object-contain border" 
                  />
                  <img 
                    src="/img/Merch_FotosSA/T-ShirtRedSA_Front.jpg" 
                    alt="Thumbnail 4" 
                    onClick={() => handleThumbnailClick("/img/Merch_FotosSA/T-ShirtRedSA_Front.jpg")} 
                    className="cursor-pointer w-32 h-32 object-contain border" 
                  />
                </div>
                <div className="main-image">
                  <img src={mainImage} alt="Main" className="w-full object-contain" />
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold sm:text-2xl dark:text-white">
                Apple iMac 24" All-In-One Computer, Apple M1, 8GB RAM, 256GB SSD, Mac OS, Pink
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold sm:text-3xl dark:text-white">
                  $1,249.99
                </p>
              </div>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                
<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-black  focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Select a size <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>


<div id="dropdown" className="z-10 hidden bg-black text-white divide-y divide-black rounded-lg shadow w-44 dark:bg-black">
    <ul className="py-2 text-sm text-white bg-black dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" className="block px-4 py-2 bg-black text-white hover:bg-gray-100 dark:hover:bg-black dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 bg-black text-white hover:bg-gray-100 dark:hover:bg-black dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 bg-black text-white hover:bg-gray-100 dark:hover:bg-black dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 bg-black text-white hover:bg-gray-100 dark:hover:bg-black dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div>

                <a
                  href="#"
                  title="Add to cart"
                  className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                  role="button"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Add to cart
                </a>
              </div>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
              <p className="mb-6 text-white dark:text-gray-400">
                Studio quality three mic array for crystal clear calls and voice recordings. Six-speaker sound system for a remarkably robust and high-quality audio experience. Up to 256GB of ultrafast SSD storage.
              </p>
              <p className="text-white dark:text-gray-400">
                Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with Magic Keyboard or Magic Keyboard with Touch ID.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Store;
