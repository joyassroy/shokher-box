import Link from 'next/link';
import { getDictionary, Locale } from '@/dictionaries';
import './Footer.css';

export default async function Footer({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h2 className="footer-logo">শখের বাক্স</h2>
          <p>শখের কোনো সীমানা নেই, আর তাই 'শখের বাক্স' নিয়ে এসেছে সবচেয়ে ইউনিক আর ট্রেন্ডি কালেকশন।</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link href={`/${locale}`}>{dict.navigation.home}</Link>
          <Link href={`/${locale}/churi`}>{dict.navigation.churi}</Link>
          <Link href={`/${locale}/threepiece`}>{dict.navigation.saree}</Link>
          <Link href={`/${locale}/jhapi`}>{dict.navigation.jhapi}</Link>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Shokher Baxho. All rights reserved.
      </div>
    </footer>
  );
}
