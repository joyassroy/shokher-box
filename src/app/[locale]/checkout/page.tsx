'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/actions/order';

export default function CheckoutPage({ params }: { params: { locale: string } }) {
  const { items, totalPrice, clearCart } = useCart();
  const locale = params.locale || 'bn';
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [location, setLocation] = useState('inside');

  const deliveryCharge = location === 'outside' ? 200 : 100;
  const finalTotal = totalPrice + deliveryCharge;
  const advanceAmount = paymentMethod === 'cod' ? deliveryCharge : finalTotal;

  if (items.length === 0 && !success) {
    router.push(`/${locale}/cart`);
    return null;
  }

  if (success) {
    return (
      <div style={{ padding: '100px 5%', textAlign: 'center', minHeight: '80vh' }}>
        <div style={{ width: '80px', height: '80px', background: '#2ecc71', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h1 style={{ color: 'var(--sindoor)', fontSize: '36px', marginBottom: '16px' }}>
          {locale === 'bn' ? 'অর্ডার সফল হয়েছে!' : 'Order Successful!'}
        </h1>
        <p style={{ color: 'var(--raat)', fontSize: '18px', marginBottom: '40px' }}>
          {locale === 'bn' 
            ? 'আপনার অর্ডারটি কনফার্ম করার জন্য আমাদের প্রতিনিধি খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।' 
            : 'Our representative will contact you shortly to confirm your order.'}
        </p>
        <button onClick={() => router.push(`/${locale}`)} style={{ padding: '15px 30px', background: 'var(--sindoor)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>
          {locale === 'bn' ? 'হোমপেজে ফিরে যান' : 'Back to Home'}
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    formData.append('cartItems', JSON.stringify(items));
    formData.append('paymentMethod', paymentMethod);
    formData.append('location', location);
    formData.append('locale', locale);

    const res = await createOrder(formData);
    
    if (res.success) {
      clearCart();
      setSuccess(true);
    } else {
      setError(res.error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="checkout-container" style={{ padding: '100px 5%', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ color: 'var(--sindoor)', fontSize: '36px', marginBottom: '40px', fontFamily: 'var(--font-cormorant), serif' }}>
        {locale === 'bn' ? 'চেকআউট' : 'Checkout'}
      </h1>

      <div className="checkout-grid">
        {/* Form */}
        <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', border: '1px solid #eee' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--raat)' }}>
            {locale === 'bn' ? 'শিপিং এড্রেস' : 'Shipping Address'}
          </h2>
          
          {error && <div style={{ padding: '15px', background: '#fdedec', color: '#e74c3c', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--raat)' }}>{locale === 'bn' ? 'পুরো নাম' : 'Full Name'} *</label>
              <input type="text" name="name" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--raat)' }}>{locale === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'} *</label>
              <input type="tel" name="phone" required pattern="01[3-9][0-9]{8}" placeholder="01XXXXXXXXX" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--raat)' }}>{locale === 'bn' ? 'জেলা / শহর' : 'District / City'} *</label>
              <input type="text" name="district" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--raat)' }}>{locale === 'bn' ? 'সম্পূর্ণ ঠিকানা (বাসা নং, রাস্তা)' : 'Full Address (House, Road)'} *</label>
              <textarea name="address" required rows={3} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', resize: 'vertical' }}></textarea>
            </div>

            <h2 style={{ fontSize: '24px', marginTop: '20px', color: 'var(--raat)' }}>
              {locale === 'bn' ? 'ডেলিভারি এরিয়া' : 'Delivery Area'}
            </h2>
            <div className="options-flex">
              <label style={{ flex: 1, padding: '15px', border: location === 'inside' ? '2px solid var(--sindoor)' : '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', background: location === 'inside' ? 'var(--ivory)' : '#fff' }}>
                <input type="radio" name="locationOption" checked={location === 'inside'} onChange={() => setLocation('inside')} style={{ display: 'none' }} />
                <div style={{ fontWeight: 'bold' }}>{locale === 'bn' ? 'ঢাকার ভিতরে' : 'Inside Dhaka'}</div>
                <div style={{ color: '#777', fontSize: '14px', marginTop: '5px' }}>৳ 100</div>
              </label>
              <label style={{ flex: 1, padding: '15px', border: location === 'outside' ? '2px solid var(--sindoor)' : '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', background: location === 'outside' ? 'var(--ivory)' : '#fff' }}>
                <input type="radio" name="locationOption" checked={location === 'outside'} onChange={() => setLocation('outside')} style={{ display: 'none' }} />
                <div style={{ fontWeight: 'bold' }}>{locale === 'bn' ? 'ঢাকার বাইরে' : 'Outside Dhaka'}</div>
                <div style={{ color: '#777', fontSize: '14px', marginTop: '5px' }}>৳ 200</div>
              </label>
            </div>

            <h2 style={{ fontSize: '24px', marginTop: '20px', color: 'var(--raat)' }}>
              {locale === 'bn' ? 'পেমেন্ট মেথড' : 'Payment Method'}
            </h2>
            <div className="options-flex" style={{ marginBottom: '15px' }}>
              <label style={{ flex: 1, padding: '15px', border: paymentMethod === 'cod' ? '2px solid var(--sindoor)' : '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', background: paymentMethod === 'cod' ? 'var(--ivory)' : '#fff' }}>
                <input type="radio" name="payOption" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} style={{ display: 'none' }} />
                <div style={{ fontWeight: 'bold' }}>{locale === 'bn' ? 'ক্যাশ অন ডেলিভারি (শুধু ডেলিভারি চার্জ অগ্রিম)' : 'Cash on Delivery (Advance Delivery Charge)'}</div>
              </label>
              <label style={{ flex: 1, padding: '15px', border: paymentMethod === 'bkash' ? '2px solid var(--sindoor)' : '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', background: paymentMethod === 'bkash' ? 'var(--ivory)' : '#fff' }}>
                <input type="radio" name="payOption" checked={paymentMethod === 'bkash'} onChange={() => setPaymentMethod('bkash')} style={{ display: 'none' }} />
                <div style={{ fontWeight: 'bold' }}>{locale === 'bn' ? 'সম্পূর্ণ পেমেন্ট (bKash/Nagad)' : 'Full Payment (bKash/Nagad)'}</div>
              </label>
            </div>

            <div style={{ background: 'rgba(201, 162, 75, 0.1)', padding: '20px', borderRadius: '8px', border: '1px dashed var(--sindoor)' }}>
              <p style={{ marginBottom: '15px', color: 'var(--raat)' }}>
                {locale === 'bn' ? 'অনুগ্রহ করে নিচের নম্বরে সেন্ড মানি করুন:' : 'Please Send Money to the number below:'}
                <br /><strong style={{ fontSize: '20px', color: 'var(--sindoor)' }}>01403926676</strong>
                <br /><span style={{ fontSize: '14px', fontWeight: 'bold' }}>{locale === 'bn' ? '(bKash Personal Number - Only Send Money)' : '(bKash Personal Number - Only Send Money)'}</span>
                <br /><br />
                {locale === 'bn' ? `অর্ডার কনফার্ম করতে আপনাকে ৳ ${advanceAmount} সেন্ড মানি করতে হবে।` : `You need to Send Money ৳ ${advanceAmount} to confirm the order.`}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>{locale === 'bn' ? 'যে নম্বর থেকে টাকা পাঠিয়েছেন' : 'Sender Number'} *</label>
                  <input type="text" name="senderNumber" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Transaction ID (TrxID) *</label>
                  <input type="text" name="trxId" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                </div>
              </div>
            </div>

            <button disabled={loading} type="submit" style={{ width: '100%', marginTop: '20px', padding: '16px', background: 'var(--sindoor)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
              {loading ? (locale === 'bn' ? 'অপেক্ষা করুন...' : 'Processing...') : (locale === 'bn' ? 'অর্ডার কনফার্ম করুন' : 'Confirm Order')}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ background: 'var(--ivory)', padding: '30px', borderRadius: '16px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '24px', margin: '0 0 20px 0', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>
            {locale === 'bn' ? 'আপনার অর্ডার' : 'Your Order'}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--raat)' }}>{item.name} <strong style={{ color: '#777' }}>x{item.quantity}</strong></span>
                <span style={{ fontWeight: '500' }}>৳ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '16px' }}>
            <span>{locale === 'bn' ? 'সাবটোটাল' : 'Subtotal'}</span>
            <span>৳ {totalPrice}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '16px' }}>
            <span>{locale === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery Charge'}</span>
            <span style={{ color: '#27ae60' }}>৳ {deliveryCharge}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #ddd', fontSize: '22px', fontWeight: 'bold', color: 'var(--sindoor)' }}>
            <span>{locale === 'bn' ? 'মোট' : 'Total'}</span>
            <span>৳ {finalTotal}</span>
          </div>
          <div style={{ marginTop: '20px', background: 'rgba(39, 174, 96, 0.1)', padding: '15px', borderRadius: '8px', textAlign: 'center', color: '#27ae60', fontWeight: 'bold' }}>
            {locale === 'bn' ? `এখন পে করতে হবে: ৳ ${advanceAmount}` : `Pay Now: ৳ ${advanceAmount}`}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 40px;
        }
        .options-flex {
          display: flex;
          gap: 15px;
        }
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
          .options-flex {
            flex-direction: column;
          }
          .checkout-container {
            padding: 40px 5% !important;
          }
        }
      `}} />
    </div>
  );
}
