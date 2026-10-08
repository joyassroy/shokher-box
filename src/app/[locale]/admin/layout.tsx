import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;

  if (!session || session.user.role !== 'admin') {
    redirect(`/${locale}/login`);
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#2c3e50', color: '#fff', padding: '20px' }}>
        <h2 style={{ marginBottom: '30px', color: '#f39c12' }}>Admin Panel</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <li><a href={`/${locale}/admin`} style={{ color: '#ecf0f1', textDecoration: 'none' }}>Dashboard</a></li>
          <li><a href={`/${locale}/admin/products`} style={{ color: '#ecf0f1', textDecoration: 'none' }}>Products</a></li>
          <li><a href={`/${locale}/admin/orders`} style={{ color: '#ecf0f1', textDecoration: 'none' }}>Orders</a></li>
          <li><a href={`/${locale}/admin/users`} style={{ color: '#ecf0f1', textDecoration: 'none' }}>Users</a></li>
          <li style={{ marginTop: 'auto' }}>
            <a href={`/${locale}`} style={{ color: '#e74c3c', textDecoration: 'none' }}>&larr; Back to Store</a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px' }}>
        {children}
      </main>
    </div>
  );
}
