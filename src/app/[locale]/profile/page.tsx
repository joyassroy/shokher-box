import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import Link from 'next/link';
import './profile.css';
import { Locale } from '@/dictionaries';

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  await dbConnect();
  
  // Need to populate product to show images/titles
  const orders = await Order.find({ user: session.user.id })
                            .populate({ path: 'items.product', model: Product })
                            .sort({ createdAt: -1 })
                            .lean();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            {session.user.image ? (
              <img src={session.user.image} alt={session.user.name || 'User'} />
            ) : (
              <span>{session.user.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div>
            <h1>{locale === 'bn' ? 'আমার প্রোফাইল' : 'My Profile'}</h1>
            <p>{session.user.name}</p>
            <p className="email">{session.user.email}</p>
          </div>
        </div>
        <form action={async () => {
          'use server';
          await signOut({ redirectTo: `/${locale}/login` });
        }}>
          <button type="submit" className="logout-btn-large">
            {locale === 'bn' ? 'লগআউট করুন' : 'Logout'}
          </button>
        </form>
      </div>

      <div className="orders-section">
        <h2>{locale === 'bn' ? 'আমার অর্ডারসমূহ' : 'My Orders'}</h2>
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>{locale === 'bn' ? 'আপনি এখনো কোনো অর্ডার করেননি।' : 'You have no orders yet.'}</p>
            <Link href={`/${locale}`} className="shop-btn">
              {locale === 'bn' ? 'শপিং শুরু করুন' : 'Start Shopping'}
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order: any) => (
              <div key={order._id.toString()} className="order-card">
                <div className="order-header">
                  <div>
                    <span className="order-no">#{order.orderNo || order._id.toString().substring(0, 8)}</span>
                    <span className="order-date">{new Date(order.createdAt).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className={`order-status status-${order.status ? order.status.replace(/\s+/g, '-').toLowerCase() : 'pending'}`}>
                    {order.status || 'Pending'}
                  </div>
                </div>
                
                <div className="order-items">
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="order-item">
                      {item.product ? (
                        <>
                          <img src={item.product.images?.[0] || '/images/hero_bangles.jpg'} alt={item.product.title?.bn || 'Product'} className="item-image" />
                          <div className="item-details">
                            <h4>{item.product.title?.[locale] || item.product.title?.bn}</h4>
                            <p>{locale === 'bn' ? 'সাইজ' : 'Size'}: {item.variant?.size || 'N/A'}</p>
                            <p>{locale === 'bn' ? 'পরিমাণ' : 'Qty'}: {item.qty}</p>
                          </div>
                          <div className="item-price">
                            ৳ {item.price * item.qty}
                          </div>
                        </>
                      ) : (
                        <div className="item-details">
                          <h4>{locale === 'bn' ? 'অজানা প্রোডাক্ট' : 'Unknown Product'}</h4>
                          <p>{locale === 'bn' ? 'পরিমাণ' : 'Qty'}: {item.qty}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="shipping-info">
                    <strong>{locale === 'bn' ? 'শিপিং ঠিকানা:' : 'Shipping Address:'}</strong>
                    <p>{order.shipping?.name}, {order.shipping?.phone}</p>
                    <p>{order.shipping?.address}, {order.shipping?.district}</p>
                  </div>
                  <div className="order-total">
                    <p><span>{locale === 'bn' ? 'সাবটোটাল' : 'Subtotal'}:</span> ৳ {order.subtotal}</p>
                    <p><span>{locale === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery Charge'}:</span> ৳ {order.deliveryCharge}</p>
                    <h3><span>{locale === 'bn' ? 'মোট' : 'Total'}:</span> ৳ {order.subtotal + order.deliveryCharge - (order.discount || 0)}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
