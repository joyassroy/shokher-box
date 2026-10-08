export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '32px', color: '#2c3e50', marginBottom: '20px' }}>Dashboard Overview</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', flex: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>Total Sales</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c3e50', margin: 0 }}>৳ 0</p>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', flex: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>Total Orders</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c3e50', margin: 0 }}>0</p>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', flex: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>Total Products</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c3e50', margin: 0 }}>0</p>
        </div>
        
      </div>
      
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginTop: 0, color: '#2c3e50' }}>Recent Orders</h2>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '12px 0' }}>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} style={{ padding: '20px 0', textAlign: 'center', color: '#95a5a6' }}>
                No recent orders found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
