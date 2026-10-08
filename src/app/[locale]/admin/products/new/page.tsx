'use client';

import { addProduct } from '@/actions/admin';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage({ params }: { params: { locale: string } }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const res = await addProduct(formData);
    
    if (res.success) {
      router.push(`/${params.locale}/admin/products`);
    } else {
      setError(res.error || 'Failed to add product');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '32px', color: '#2c3e50', marginBottom: '20px' }}>Add New Product</h1>
      
      {error && <div style={{ padding: '15px', background: '#fdedec', color: '#e74c3c', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontWeight: 'bold' }}>Product Title (Bengali) *</label>
          <input type="text" name="titleBn" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #bdc3c7' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontWeight: 'bold' }}>URL Slug (e.g. red-bangle-01) *</label>
          <input type="text" name="slug" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #bdc3c7' }} />
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontWeight: 'bold' }}>Selling Price (৳) *</label>
            <input type="number" name="price" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #bdc3c7' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontWeight: 'bold' }}>Cost Price (৳) *</label>
            <input type="number" name="costPrice" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #bdc3c7' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontWeight: 'bold' }}>Description (Bengali) *</label>
          <textarea name="descriptionBn" required rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #bdc3c7' }}></textarea>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#34495e', fontWeight: 'bold' }}>Product Images (First image will be the main one) *</label>
          <input type="file" name="images" multiple accept="image/*" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #bdc3c7' }} />
        </div>

        <button disabled={loading} type="submit" style={{ padding: '15px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Saving Product...' : 'Save Product'}
        </button>
      </form>
    </div>
  );
}
