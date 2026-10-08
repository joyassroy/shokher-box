import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import OrderStatusDropdown from './OrderStatusDropdown';

export default async function AdminOrdersPage() {
  await dbConnect();
  const orders = await Order.find().sort({ createdAt: -1 });

  return (
    <div>
      <h1 style={{ fontSize: '32px', color: '#2c3e50', margin: '0 0 20px 0' }}>Orders</h1>

      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', color: '#7f8c8d' }}>
              <th style={{ padding: '12px 0' }}>Order ID</th>
              <th>Customer</th>
              <th>Total & Delivery</th>
              <th>Advance Paid</th>
              <th>TrxID & Number</th>
              <th style={{ width: '150px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? orders.map(order => (
              <tr key={order._id.toString()} style={{ borderBottom: '1px solid #f1f2f6' }}>
                <td style={{ padding: '16px 0', color: '#2c3e50', fontWeight: '500' }}>
                  #{order.orderNo}
                </td>
                <td style={{ color: '#2c3e50' }}>
                  {order.shipping?.name || 'Unknown'}<br/>
                  <span style={{ fontSize: '12px', color: '#7f8c8d' }}>{order.shipping?.phone}</span>
                </td>
                <td style={{ color: '#2c3e50' }}>
                  Total: ৳ {order.subtotal + order.deliveryCharge}<br/>
                  <span style={{ fontSize: '12px', color: '#7f8c8d' }}>Delivery: ৳ {order.deliveryCharge}</span>
                </td>
                <td style={{ color: '#27ae60', fontWeight: 'bold' }}>
                  ৳ {order.deliveryPayment?.amount || 0}
                </td>
                <td style={{ color: '#2c3e50', fontSize: '14px' }}>
                  TrxID: {order.deliveryPayment?.trxId || 'N/A'}<br/>
                  Sender: {order.deliveryPayment?.senderNumber || 'N/A'}
                </td>
                <td>
                  <OrderStatusDropdown orderId={order._id.toString()} currentStatus={order.status} />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} style={{ padding: '20px 0', textAlign: 'center', color: '#95a5a6' }}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
