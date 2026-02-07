'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';

interface Listing {
  id: number;
  productName: string;
  description: string;
  price: number;
  gender: string;
  imageUrl: string;
  category: string;
}

export default function ListingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart, isInCart } = useCart();
  
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:5207/api/Listing/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch listing');
        }
        
        const data = await response.json();
        console.log('Fetched listing data:', data);
        setListing(data);
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError(err instanceof Error ? err.message : 'Failed to load listing');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 mx-auto mb-4 text-amber-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error || 'Listing not found'}</p>
          <a href="/" className="text-amber-500 hover:text-amber-600 underline">
            Back to Home
          </a>
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

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="bg-zinc-50 rounded-lg shadow-[5px_5px_0px_rgba(0,0,0,1)] p-8">
              <img
                src={listing.imageUrl}
                alt={listing.productName}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="space-y-2">
              {/* Product Name */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {listing.productName}
                </h1>
                
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                  {listing.gender}
                </span>
                <span className="inline-block ml-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                  {listing.category}
                </span>
              </div>

              {/* Price */}
              <div className="bg-zinc-50 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] p-6">
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${listing.price.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div className="bg-zinc-50 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => {
                    if (listing && !isInCart(listing.id)) {
                      addToCart({
                        id: listing.id,
                        productName: listing.productName,
                        price: listing.price,
                        imageUrl: listing.imageUrl,
                        gender: listing.gender,
                        description: listing.description,
                      });
                      setAddedToCart(true);
                      setTimeout(() => setAddedToCart(false), 2000);
                    }
                  }}
                  disabled={listing ? isInCart(listing.id) : false}
                  className="flex-1 bg-amber-500 text-white font-semibold py-3 rounded-lg hover:bg-amber-600 transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {listing && isInCart(listing.id) 
                    ? 'Already in Cart' 
                    : addedToCart 
                    ? '✓ Added to Cart!' 
                    : 'Add to Cart'
                  }
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
