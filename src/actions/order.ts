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

    const totalAmount = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

    const paymentMethod = formData.get('paymentMethod') as string || 'cod';
    const courier = formData.get('courier') as string || 'steadfast';
    const deliveryCharge = courier === 'express' ? 120 : 60; // Just example pricing
    
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
        courier: courier
      },
      subtotal: totalAmount,
      deliveryCharge: deliveryCharge,
      codAmount: paymentMethod === 'cod' ? (totalAmount + deliveryCharge) : 0,
      deliveryPayment: {
        method: paymentMethod,
        senderNumber: paymentMethod !== 'cod' ? formData.get('senderNumber') : 'COD',
        trxId: paymentMethod !== 'cod' ? formData.get('trxId') : `COD-${Date.now()}`,
        amount: paymentMethod !== 'cod' ? (totalAmount + deliveryCharge) : 0,
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
