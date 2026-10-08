import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Link from 'next/link';

export default async function AdminProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 });
  const { locale } = await params;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', color: '#2c3e50', margin: 0 }}>Products</h1>
        <Link href={`/${locale}/admin/products/new`} style={{ padding: '10px 20px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none' }}>
          + Add New Product
        </Link>
      </div>

      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', color: '#7f8c8d' }}>
              <th style={{ padding: '12px 0' }}>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map(product => (
              <tr key={product._id.toString()} style={{ borderBottom: '1px solid #f1f2f6' }}>
                <td style={{ padding: '16px 0', color: '#2c3e50', fontWeight: '500' }}>
                  {product.title['bn'] || product.title['en']}
                </td>
                <td style={{ color: '#2c3e50' }}>৳ {product.price}</td>
                <td>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    background: product.isActive ? '#e8f8f5' : '#fdedec',
                    color: product.isActive ? '#27ae60' : '#e74c3c'
                  }}>
                    {product.isActive ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td>
                  <button style={{ background: 'transparent', border: 'none', color: '#3498db', cursor: 'pointer', marginRight: '10px' }}>Edit</button>
                  <button style={{ background: 'transparent', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} style={{ padding: '20px 0', textAlign: 'center', color: '#95a5a6' }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
