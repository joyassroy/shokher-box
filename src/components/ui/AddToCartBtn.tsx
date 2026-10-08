'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddToCartBtn({ product, locale }: { product: any, locale: string }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.variants?.[0]?.size || '');
  const router = useRouter();

  const handleAdd = () => {
    addToCart({
      id: product._id || product.slug,
      name: product.title[locale],
      price: product.price,
      quantity: qty,
      image: product.images[0],
      size: size
    });
    router.push(`/${locale}/cart`);
  };

  return (
    <>
      {product.variants && product.variants.length > 0 && (
        <div className="product-options">
          <h3>{locale === 'bn' ? 'সাইজ নির্বাচন করুন' : 'Select Size'}</h3>
          <div className="size-selector">
            {product.variants.map((v: any, i: number) => (
              <button 
                key={i} 
                onClick={() => setSize(v.size)}
                className={`size-btn ${size === v.size ? 'selected' : ''}`}
              >
                {v.size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="add-to-cart-section">
        <div className="quantity-selector">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>
        <button className="btn-add-cart" onClick={handleAdd}>
          {locale === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}
        </button>
      </div>
    </>
  );
}
