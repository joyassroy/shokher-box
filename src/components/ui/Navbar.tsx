import Link from 'next/link';
import { getDictionary, Locale } from '@/dictionaries';
import LanguageToggle from './LanguageToggle';
import './Navbar.css';
import { auth, signOut } from '@/auth';

export default async function Navbar({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const session = await auth();

  return (
    <header className="navbar-container">
      <div className="announcement-bar">
        ঢাকায় ২৪ ঘণ্টায় ডেলিভারি · উৎসবের নতুন কালেকশন
      </div>
      <nav className="navbar">
        <div className="navbar-left">
          <Link href={`/${locale}`} className="logo">
            শখের বাক্স
          </Link>
        </div>

        <div className="navbar-center hidden-mobile">
          <Link href={`/${locale}/churi`}>{dict.navigation.churi}</Link>
          <Link href={`/${locale}/threepiece`}>{dict.navigation.saree}</Link>
          <Link href={`/${locale}/jhapi`}>{dict.navigation.jhapi}</Link>
        </div>

        <div className="navbar-search hidden-mobile">
          <form action={`/${locale}/search`} method="GET" className="search-form">
            <input type="text" name="q" placeholder={locale === 'bn' ? 'চুড়ি বা থ্রি পিস খুঁজুন...' : 'Search bangles...'} required />
            <button type="submit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </form>
        </div>
        <div className="navbar-right">
          <LanguageToggle currentLocale={locale} />
          
          {session?.user ? (
            <form action={async () => {
              'use server';
              await signOut();
            }} className="auth-nav-form">
              <span className="user-greeting hidden-mobile">
                {locale === 'bn' ? 'হ্যালো, ' : 'Hi, '}{session.user.name?.split(' ')[0]}
              </span>
              <button type="submit" className="logout-btn hidden-mobile">
                {locale === 'bn' ? 'লগআউট' : 'Logout'}
              </button>
            </form>
          ) : (
            <Link href={`/${locale}/login`} className="login-link hidden-mobile">
              {locale === 'bn' ? 'লগইন' : 'Login'}
            </Link>
          )}

          <Link href={`/${locale}/cart`} className="cart-icon">
            <span className="cart-badge">0</span>
            {dict.navigation.cart}
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <Link href={`/${locale}`} className="bottom-nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span>{locale === 'bn' ? 'হোম' : 'Home'}</span>
        </Link>
        <Link href={`/${locale}/churi`} className="bottom-nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="4"></circle></svg>
          <span>{dict.navigation.churi}</span>
        </Link>
        <Link href={`/${locale}/threepiece`} className="bottom-nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
          <span>{dict.navigation.saree}</span>
        </Link>
        {session?.user ? (
          <Link href={`/${locale}/profile`} className="bottom-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>{locale === 'bn' ? 'প্রোফাইল' : 'Profile'}</span>
          </Link>
        ) : (
          <Link href={`/${locale}/login`} className="bottom-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
            <span>{locale === 'bn' ? 'লগইন' : 'Login'}</span>
          </Link>
        )}
      </div>
    </header>
  );
}
