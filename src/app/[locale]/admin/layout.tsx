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
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
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
      <main className="admin-main">
        {children}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #f5f6fa;
        }
        .admin-sidebar {
          width: 250px;
          background: #2c3e50;
          color: #fff;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .admin-main {
          flex: 1;
          padding: 40px;
          overflow-x: hidden;
        }
        @media (max-width: 768px) {
          .admin-container {
            flex-direction: column;
          }
          .admin-sidebar {
            width: 100%;
            padding: 15px;
          }
          .admin-sidebar ul {
            flex-direction: row !important;
            flex-wrap: wrap;
            gap: 10px;
          }
          .admin-sidebar h2 {
            margin-bottom: 15px !important;
          }
          .admin-main {
            padding: 15px;
          }
        }
      `}} />
    </div>
  );
}
