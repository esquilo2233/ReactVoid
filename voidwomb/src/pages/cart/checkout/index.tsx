import React from 'react';

function Cart() {
  return (
    <div>
      <section className="bg-transparent py-16 antialiased dark:bg-gray-900">
        <form action="#" className="mx-auto max-w-6xl px-8 2xl:px-16">
          <ol className="items-center flex w-full max-w-4xl mx-auto text-center text-lg font-medium text-white dark:text-gray-400">
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-white sm:after:hidden">
                <svg className="me-2 h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Cart
              </span>
            </li>

            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-white sm:after:hidden">
                <svg className="me-2 h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Checkout
              </span>
            </li>

            <li className="flex shrink-0 items-center">
              <svg className="me-2 h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Order summary
            </li>
          </ol>

          <div className="mt-12 sm:mt-16 flex lg:gap-16 xl:gap-20">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-semibold text-white dark:text-white">Delivery Details</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="your_name" className="mb-2 block text-lg font-medium text-white dark:text-white">Your name*</label>
                  <input type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-lg text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Your Name" required />
                </div>

                <div>
                  <label htmlFor="your_email" className="mb-2 block text-lg font-medium text-white dark:text-white">Your email*</label>
                  <input type="email" id="your_email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-lg text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@email.com" required />
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label htmlFor="select-country-input-3" className="block text-lg font-medium text-white dark:text-white">Country/ Shipping*</label>
                  </div>
                  <select id="select-country-input-3" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-lg text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                    <option selected disabled>Select Country</option>
                    <option value="AS">Australia</option>
                    <option value="FR">France</option>
                    <option value="ES">Spain</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label htmlFor="select-city-input-3" className="block text-lg font-medium text-white dark:text-white">City*</label>
                  </div>
                  <select id="select-city-input-3" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-lg text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                    <option selected>San Francisco</option>
                    <option value="NY">New York</option>
                    <option value="LA">Los Angeles</option>
                    <option value="CH">Chicago</option>
                    <option value="HU">Houston</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="phone-input-3" className="mb-2 block text-lg font-medium text-white dark:text-white">Phone Number*</label>
                  <div className="flex items-center">
                    <button id="dropdown-phone-button-3" data-dropdown-toggle="dropdown-phone-3" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-lg font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700" type="button">
                      +1
                      <svg className="-me-0.5 ms-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                      </svg>
                    </button>
                    <div id="dropdown-phone-3" className="z-10 hidden w-56 divide-y divide-gray-100 rounded-lg bg-transparent shadow dark:bg-gray-700">
                      <ul className="p-2 text-lg font-medium text-gray-900 dark:text-gray-200" aria-labelledby="dropdown-phone-button-2">
                        <li>
                          <button type="button" className="inline-flex w-full rounded-md px-3 py-2 text-lg text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                            United States (+1)
                          </button>
                        </li>
                        <li>
                          <button type="button" className="inline-flex w-full rounded-md px-3 py-2 text-lg text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                            United Kingdom (+44)
                          </button>
                        </li>
                        <li>
                          <button type="button" className="inline-flex w-full rounded-md px-3 py-2 text-lg text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                            Australia (+61)
                          </button>
                        </li>
                        <li>
                          <button type="button" className="inline-flex w-full rounded-md px-3 py-2 text-lg text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                            France (+33)
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="relative w-full">
                      <input type="text" id="phone-input" className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-4 text-lg text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-lg font-medium text-white dark:text-white">Email*</label>
                  <input type="email" id="email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-lg text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500" placeholder="name@flowbite.com" required />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-semibold text-white dark:text-white">Order Summary</h2>
              <div className="w-full space-y-12 border rounded-lg p-6">
                <div className="flow-root">
                  <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-lg font-normal text-white dark:text-gray-400">Subtotal</dt>
                      <dd className="text-lg font-medium text-white dark:text-white">$8,094.00</dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-lg font-normal text-white dark:text-gray-400">Store Pickup</dt>
                      <dd className="text-lg font-medium text-white dark:text-white">$99</dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-lg font-bold text-white dark:text-white">Total</dt>
                      <dd className="text-lg font-bold text-white dark:text-white">$8,392.00</dd>
                    </dl>
                  </div>
                </div>
                <div className="space-y-3">
                  <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-lg font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border">Proceed to Payment</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Cart;
