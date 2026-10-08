import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export default async function AdminOrdersPage() {
  await dbConnect();
  const orders = await Order.find().sort({ createdAt: -1 });

  return (
    <div>
      <h1 style={{ fontSize: '32px', color: '#2c3e50', margin: '0 0 20px 0' }}>Orders</h1>

      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', color: '#7f8c8d' }}>
              <th style={{ padding: '12px 0' }}>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? orders.map(order => (
              <tr key={order._id.toString()} style={{ borderBottom: '1px solid #f1f2f6' }}>
                <td style={{ padding: '16px 0', color: '#2c3e50', fontWeight: '500' }}>
                  #{order._id.toString().slice(-6).toUpperCase()}
                </td>
                <td style={{ color: '#2c3e50' }}>{order.shippingAddress?.name || 'Unknown'}</td>
                <td style={{ color: '#2c3e50' }}>৳ {order.totalAmount}</td>
                <td>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    background: '#fef9e7',
                    color: '#f1c40f'
                  }}>
                    {order.orderStatus}
                  </span>
                </td>
                <td>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    background: order.paymentStatus === 'Paid' ? '#e8f8f5' : '#fdedec',
                    color: order.paymentStatus === 'Paid' ? '#27ae60' : '#e74c3c'
                  }}>
                    {order.paymentStatus}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} style={{ padding: '20px 0', textAlign: 'center', color: '#95a5a6' }}>
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
