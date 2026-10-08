'use client';

import { useState } from 'react';
import { updateOrderStatus } from '@/actions/adminOrders';

export default function OrderStatusDropdown({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus || 'Payment যাচাই');
  const [loading, setLoading] = useState(false);

  const statuses = [
    'Payment যাচাই',
    'Confirmed',
    'Packed',
    'Shipped',
    'Delivered',
    'Returned',
    'Cancelled'
  ];

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);
    
    await updateOrderStatus(orderId, newStatus);
    
    setLoading(false);
  };

  return (
    <select 
      value={status} 
      onChange={handleChange}
      disabled={loading}
      style={{
        padding: '6px 12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        background: '#fff',
        fontSize: '13px',
        cursor: loading ? 'wait' : 'pointer',
        color: '#2c3e50',
        width: '100%'
      }}
    >
      {statuses.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
