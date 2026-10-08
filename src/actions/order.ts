'use server';

import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { auth } from '@/auth';

export async function createOrder(formData: FormData) {
  try {
    const session = await auth();
    await dbConnect();

    // Parse cart items from hidden input
    const cartItemsRaw = formData.get('cartItems') as string;
    const cartItems = JSON.parse(cartItemsRaw);
    
    if (!cartItems || cartItems.length === 0) {
      return { success: false, error: 'Cart is empty' };
    }

    const paymentMethod = formData.get('paymentMethod') as string || 'cod';
    const location = formData.get('location') as string || 'inside';
    const deliveryCharge = location === 'outside' ? 200 : 100;
    
    const orderData = {
      orderNo: `SB${Date.now()}`,
      user: session?.user?.id || null,
      items: cartItems.map((item: any) => ({
        product: item.id.length === 24 ? item.id : null,
        variant: { size: item.size },
        qty: item.quantity,
        price: item.price,
        costPrice: item.price * 0.7 
      })),
      shipping: {
        name: formData.get('name'),
        phone: formData.get('phone'),
        district: formData.get('district'),
        address: formData.get('address'),
        courier: location === 'outside' ? 'Outside Dhaka' : 'Inside Dhaka'
      },
      subtotal: totalAmount,
      deliveryCharge: deliveryCharge,
      codAmount: paymentMethod === 'cod' ? totalAmount : 0,
      deliveryPayment: {
        method: paymentMethod,
        senderNumber: formData.get('senderNumber') || '',
        trxId: formData.get('trxId') || '',
        amount: paymentMethod === 'cod' ? deliveryCharge : (totalAmount + deliveryCharge),
        status: 'pending'
      },
      status: 'Payment যাচাই',
      locale: formData.get('locale') || 'bn'
    };

    const newOrder = await Order.create(orderData);
    
    return { success: true, orderId: newOrder._id.toString() };

  } catch (error: any) {
    console.error('Order creation failed:', error);
    return { success: false, error: error.message };
  }
}
