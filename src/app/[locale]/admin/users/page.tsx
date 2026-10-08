import dbConnect from '@/lib/db';
import User from '@/models/User';

export default async function AdminUsersPage() {
  await dbConnect();
  const users = await User.find().sort({ createdAt: -1 });

  return (
    <div>
      <h1 style={{ fontSize: '32px', color: '#2c3e50', margin: '0 0 20px 0' }}>Users</h1>

      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', color: '#7f8c8d' }}>
              <th style={{ padding: '12px 0' }}>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Provider</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map(user => (
              <tr key={user._id.toString()} style={{ borderBottom: '1px solid #f1f2f6' }}>
                <td style={{ padding: '16px 0', color: '#2c3e50', fontWeight: '500' }}>
                  {user.name}
                </td>
                <td style={{ color: '#2c3e50' }}>{user.email}</td>
                <td>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    background: user.role === 'admin' ? '#ebdef0' : '#eaf2f8',
                    color: user.role === 'admin' ? '#8e44ad' : '#2980b9'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ color: '#7f8c8d', fontSize: '14px', textTransform: 'capitalize' }}>
                  {user.provider}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} style={{ padding: '20px 0', textAlign: 'center', color: '#95a5a6' }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
