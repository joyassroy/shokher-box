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

    const orderData = {
      user: session?.user?.id || null, // Guest checkout supported if null
      items: cartItems.map((item: any) => ({
        product: item.id.length === 24 ? item.id : null, // Assuming 24 char hex is MongoID, else null for mock
        quantity: item.quantity,
        price: item.price,
        size: item.size
      })),
      totalAmount,
      shippingAddress: {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        district: formData.get('district')
      },
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      orderStatus: 'Pending'
    };

    const newOrder = await Order.create(orderData);
    
    return { success: true, orderId: newOrder._id.toString() };

  } catch (error: any) {
    console.error('Order creation failed:', error);
    return { success: false, error: error.message };
  }
}
