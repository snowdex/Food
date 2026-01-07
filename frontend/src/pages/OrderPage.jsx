import React from 'react'

const OrderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <p className="text-sm text-gray-500 mt-1">Review your order and complete payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2">
            <section className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-medium">Your Item</h2>

              <div className="mt-4 flex gap-4">
                <img src="https://picsum.photos/seed/pizza/200/160" alt="Selected food" className="w-40 h-32 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-md font-semibold">Margherita Pizza</h3>
                      <p className="text-sm text-gray-500 mt-1">Classic margherita with fresh basil and mozzarella. Serves 1</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">₹299</div>
                      <div className="text-xs text-green-600 mt-1">10% off</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700">Qty: 1</div>
                    <button className="text-sm text-indigo-600 underline">Edit</button>
                    <button className="text-sm text-red-600 underline">Remove</button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Suggested for you</h2>
                <span className="text-sm text-gray-500">Based on your choice</span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Suggested card */}
                <div className="flex items-center gap-4 border rounded-md p-3">
                  <img src="https://picsum.photos/seed/burger/120/90" alt="Suggested 1" className="w-24 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Cheese Burst Burger</div>
                        <div className="text-xs text-gray-500">With molten cheese</div>
                      </div>
                      <div className="font-semibold">₹149</div>
                    </div>
                    <div className="mt-2">
                      <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Add</button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 border rounded-md p-3">
                  <img src="https://picsum.photos/seed/pasta/120/90" alt="Suggested 2" className="w-24 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Creamy Alfredo Pasta</div>
                        <div className="text-xs text-gray-500">Rich and creamy</div>
                      </div>
                      <div className="font-semibold">₹179</div>
                    </div>
                    <div className="mt-2">
                      <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Add</button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 border rounded-md p-3">
                  <img src="https://picsum.photos/seed/salad/120/90" alt="Suggested 3" className="w-24 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Garden Salad</div>
                        <div className="text-xs text-gray-500">Fresh and healthy</div>
                      </div>
                      <div className="font-semibold">₹99</div>
                    </div>
                    <div className="mt-2">
                      <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Add</button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 border rounded-md p-3">
                  <img src="https://picsum.photos/seed/dessert/120/90" alt="Suggested 4" className="w-24 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Chocolate Lava Cake</div>
                        <div className="text-xs text-gray-500">Warm and gooey</div>
                      </div>
                      <div className="font-semibold">₹129</div>
                    </div>
                    <div className="mt-2">
                      <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium">Order Summary</h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-700">
                <div>Margherita Pizza x1</div>
                <div className="font-medium">₹299</div>
              </div>

              <div className="flex justify-between text-sm text-gray-700">
                <div>Delivery Fee</div>
                <div className="font-medium">₹29</div>
              </div>

              <div className="flex justify-between text-sm text-gray-700">
                <div>Tax & Charges</div>
                <div className="font-medium">₹30</div>
              </div>

              <div className="border-t pt-3 flex justify-between items-center">
                <div className="text-sm text-gray-500">Promo</div>
                <div className="text-sm text-green-600 font-medium">-₹30</div>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-xl font-bold">₹327</div>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm text-gray-600">Apply Coupon</label>
              <div className="mt-2 flex gap-2">
                <input className="flex-1 border rounded px-3 py-2 text-sm" placeholder="Enter code" disabled />
                <button className="bg-gray-200 text-gray-600 px-3 rounded" disabled>Apply</button>
              </div>
            </div>

            <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold">Pay ₹327</button>

            <p className="text-xs text-gray-500 mt-3">By continuing, you agree to our terms. Payment UI is a placeholder (no functionality).</p>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
