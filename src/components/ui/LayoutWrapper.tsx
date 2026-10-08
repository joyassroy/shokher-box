'use client';

import { usePathname } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';

export default function LayoutWrapper({ 
  children, 
  navbar, 
  footer 
}: { 
  children: React.ReactNode, 
  navbar: React.ReactNode, 
  footer?: React.ReactNode 
}) {
  const pathname = usePathname();
  
  // Check if the current route is an admin route
  const isAdminRoute = pathname?.includes('/admin');

  // If it's an admin route, DO NOT render the main website navbar and footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Otherwise, render the standard storefront layout
  return (
    <CartProvider>
      <div className="layout-container">
        {navbar}
        <main style={{ flex: 1 }}>{children}</main>
        {footer}
      </div>
    </CartProvider>
  );
}
