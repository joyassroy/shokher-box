import { signIn } from '@/auth';
import { loginWithCredentials } from '@/actions/auth';
import './login.css';
import { Locale } from '@/dictionaries';
import Link from 'next/link';

export default async function LoginPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>শখের বাক্স</h2>
          <p>{locale === 'bn' ? 'স্বাগতম! লগইন করুন' : 'Welcome! Please login'}</p>
        </div>
        
        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: `/${locale}/onboarding` });
          }}
          className="auth-google-form"
        >
          <button type="submit" className="google-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {locale === 'bn' ? 'Google দিয়ে চালিয়ে যান' : 'Continue with Google'}
          </button>
        </form>

        <div className="divider">
          <span>{locale === 'bn' ? 'অথবা' : 'OR'}</span>
        </div>

        <form action={loginWithCredentials} className="auth-email-form">
          <input type="hidden" name="locale" value={locale} />
          <div className="form-group">
            <label>{locale === 'bn' ? 'ইমেইল' : 'Email'}</label>
            <input type="email" name="email" placeholder={locale === 'bn' ? 'আপনার ইমেইল দিন' : 'Enter your email'} required />
          </div>
          <div className="form-group">
            <label>{locale === 'bn' ? 'পাসওয়ার্ড' : 'Password'}</label>
            <input type="password" name="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="primary-btn">
            {locale === 'bn' ? 'লগইন' : 'Login'}
          </button>
        </form>
        
        <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          {locale === 'bn' ? 'অ্যাকাউন্ট নেই?' : 'Don\'t have an account?'} <Link href={`/${locale}/register`} style={{ color: 'var(--sindoor)', fontWeight: 'bold' }}>{locale === 'bn' ? 'রেজিস্টার করুন' : 'Register here'}</Link>
        </div>
      </div>
    </div>
  );
}
