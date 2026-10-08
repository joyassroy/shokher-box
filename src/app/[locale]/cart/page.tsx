'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { locale } = use(params);
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div style={{ padding: '100px 5%', textAlign: 'center', minHeight: '80vh' }}>
        <h1 style={{ color: 'var(--sindoor)', fontSize: '32px', marginBottom: '20px' }}>
          {locale === 'bn' ? 'আপনার শপিং কার্ট খালি' : 'Your Shopping Cart is Empty'}
        </h1>
        <p style={{ color: 'var(--raat)', marginBottom: '40px' }}>
          {locale === 'bn' ? 'দয়া করে কিছু প্রোডাক্ট কার্টে যোগ করুন।' : 'Please add some products to your cart.'}
        </p>
        <Link href={`/${locale}`} style={{ padding: '15px 30px', background: 'var(--sindoor)', color: '#fff', textDecoration: 'none', borderRadius: '8px' }}>
          {locale === 'bn' ? 'শপিং করুন' : 'Continue Shopping'}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '100px 5%', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ color: 'var(--sindoor)', fontSize: '36px', marginBottom: '40px', fontFamily: 'var(--font-cormorant), serif' }}>
        {locale === 'bn' ? 'আপনার কার্ট' : 'Your Cart'}
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
        <div className="cart-items">
          {items.map(item => (
            <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: '20px', padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #eee', marginBottom: '16px' }}>
              <div style={{ width: '100px', height: '120px', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '20px', color: 'var(--raat)', margin: '0 0 8px 0' }}>{item.name}</h3>
                {item.size && <p style={{ margin: '0 0 8px 0', color: '#777', fontSize: '14px' }}>Size: {item.size}</p>}
                <p style={{ fontWeight: 'bold', color: 'var(--sindoor)', margin: 0 }}>৳ {item.price}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>
                  {locale === 'bn' ? 'মুছে ফেলুন' : 'Remove'}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '6px' }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '5px 12px', background: 'transparent', border: 'none', cursor: 'pointer' }}>-</button>
                  <span style={{ padding: '0 12px' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '5px 12px', background: 'transparent', border: 'none', cursor: 'pointer' }}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary" style={{ background: 'var(--ivory)', padding: '30px', borderRadius: '16px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '24px', margin: '0 0 20px 0', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>
            {locale === 'bn' ? 'অর্ডার সামারি' : 'Order Summary'}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '16px' }}>
            <span>{locale === 'bn' ? 'সাবটোটাল' : 'Subtotal'}</span>
            <span>৳ {totalPrice}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '16px' }}>
            <span>{locale === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery'}</span>
            <span style={{ color: '#e67e22' }}>{locale === 'bn' ? 'চেকআউটে ঠিক হবে' : 'Calculated at checkout'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #ddd', fontSize: '22px', fontWeight: 'bold', color: 'var(--sindoor)' }}>
            <span>{locale === 'bn' ? 'মোট' : 'Total'}</span>
            <span>৳ {totalPrice}</span>
          </div>
          
          <button 
            onClick={() => router.push(`/${locale}/checkout`)}
            style={{ width: '100%', marginTop: '30px', padding: '15px', background: 'var(--sindoor)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}>
            {locale === 'bn' ? 'চেকআউট করুন (COD)' : 'Proceed to Checkout (COD)'}
          </button>
        </div>
      </div>
    </div>
  );
}
