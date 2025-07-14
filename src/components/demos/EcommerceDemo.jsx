import React, { useState } from 'react'

const EcommerceDemo = () => {
  const [cart, setCart] = useState([])
  const [showCheckout, setShowCheckout] = useState(false)

  const products = [
    { id: 1, name: "Wireless Headphones", price: 99.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
    { id: 2, name: "Smart Watch", price: 199.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
    { id: 3, name: "Laptop", price: 999.99, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" }
  ]

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">E-Commerce Platform</h3>
        <p className="text-gray-600">Browse products, add to cart, and complete purchases</p>
      </div>
      
      {/* Navigation */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-gray-800">Shop</span>
            <span className="text-gray-600">Categories</span>
            <span className="text-gray-600">About</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </div>
            <span className="text-gray-600">Login</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-3" />
            <h5 className="font-semibold text-gray-800 mb-1">{product.name}</h5>
            <p className="text-green-600 font-bold mb-3">${product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Shopping Cart */}
      <div className="bg-white rounded-lg p-4">
        <h4 className="font-bold text-gray-800 mb-3">Shopping Cart</h4>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Your cart is empty</p>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="text-gray-400">x{item.quantity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors mt-3"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Checkout</h3>
            <p className="text-gray-600 mb-4">Total: ${getTotalPrice().toFixed(2)}</p>
            <div className="space-y-3">
              <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="MM/YY" className="p-2 border rounded" />
                <input type="text" placeholder="CVV" className="p-2 border rounded" />
              </div>
              <input type="text" placeholder="Name on Card" className="w-full p-2 border rounded" />
            </div>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => setShowCheckout(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Order placed successfully!')
                  setShowCheckout(false)
                  setCart([])
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EcommerceDemo 