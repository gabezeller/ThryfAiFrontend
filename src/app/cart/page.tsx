'use client';

import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { FaTrash, FaShoppingBag } from 'react-icons/fa';
import { useState } from 'react';


export default function CartPage() {
  const { cart, removeFromCart, clearCart, getCartTotal, cartCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<string>('');

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsProcessing(true);
    setPurchaseStatus('');

    try {
      // Extract product IDs from cart
      const productIds = cart.map(item => item.id);
      
      // Build query string
      const queryParams = new URLSearchParams();
      productIds.forEach(id => queryParams.append('productIds', id.toString()));
      queryParams.append('userId', 'global-user');

      const response = await fetch(
        `http://localhost:5207/api/Purchase/record?${queryParams.toString()}`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error('Purchase failed');
      }

      const result = await response.json();
      console.log('Purchase successful:', result);
      
      setPurchaseStatus('success');
      
      // Clear cart after successful purchase
      setTimeout(() => {
        clearCart();
        window.location.href = '/';
      }, 2000);
      
    } catch (error) {
      console.error('Purchase error:', error);
      setPurchaseStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-white font-sans">
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1 }}
            src="/fashion-orange.png"
            alt="decoration"
            className="absolute top-10 left-20 w-40 h-40 object-cover rounded-3xl rotate-12 blur-sm"
          />
        </div>

        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <a
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-amber-500 mb-8 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </a>

            <FaShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some items to get started!</p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-tr from-amber-300 to-amber-400 text-black font-semibold rounded-lg shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              Browse Listings
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1 }}
          src="/fashion-orange.png"
          alt="decoration"
          className="absolute top-10 left-20 w-40 h-40 object-cover rounded-3xl rotate-12 blur-sm"
        />
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.2 }}
          src="/fashion-blue.png"
          alt="decoration"
          className="absolute top-40 right-10 w-32 h-32 object-cover rounded-2xl -rotate-6 blur-sm"
        />
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <a
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-amber-500 mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </a>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
              <p className="text-gray-600">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
            </div>
            <button
              onClick={clearCart}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-zinc-50 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] p-6"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <a href={`/listing/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-32 h-32 object-cover rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                      />
                    </a>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <a href={`/listing/${item.id}`} className="hover:text-amber-500 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                          {item.productName}
                        </h3>
                      </a>
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-2">
                        {item.gender}
                      </span>
                      {item.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTrash className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-50 rounded-lg shadow-[5px_5px_0px_rgba(0,0,0,1)] p-6 sticky top-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || purchaseStatus === 'success'}
                  className="w-full py-4 bg-gradient-to-tr from-amber-300 to-amber-400 text-black font-semibold rounded-lg shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : purchaseStatus === 'success' ? (
                    '✓ Purchase Complete!'
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>

                {purchaseStatus === 'error' && (
                  <p className="mt-2 text-sm text-red-600 text-center">
                    Purchase failed. Please try again.
                  </p>
                )}

                {purchaseStatus === 'success' && (
                  <p className="mt-2 text-sm text-green-600 text-center">
                    Redirecting to home...
                  </p>
                )}

                <a
                  href="/"
                  className="block text-center mt-4 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
