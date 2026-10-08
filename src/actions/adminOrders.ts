'use server';

import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(orderId: string, status: string, paymentStatus?: string) {
  try {
    await dbConnect();
    
    const updateData: any = { status };
    
    // Also update payment status based on order status if not explicitly provided
    if (status === 'Confirmed' || status === 'Packed' || status === 'Shipped') {
      updateData['deliveryPayment.status'] = 'verified';
    } else if (status === 'Payment যাচাই') {
      updateData['deliveryPayment.status'] = 'pending';
    } else if (status === 'Cancelled') {
      updateData['deliveryPayment.status'] = 'rejected';
    }

    if (paymentStatus) {
       updateData['deliveryPayment.status'] = paymentStatus;
    }

    await Order.findByIdAndUpdate(orderId, updateData);
    
    revalidatePath('/[locale]/admin/orders', 'page');
    revalidatePath('/[locale]/admin', 'page');
    return { success: true };
  } catch (error: any) {
    console.error('Update status failed:', error);
    return { success: false, error: error.message };
  }
}
