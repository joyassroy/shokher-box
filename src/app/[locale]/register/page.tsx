import { registerWithCredentials } from '@/actions/auth';
import '../login/login.css';
import { Locale } from '@/dictionaries';
import Link from 'next/link';

export default async function RegisterPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>শখের বাক্স</h2>
          <p>{locale === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create a new account'}</p>
        </div>
        
        <form action={registerWithCredentials} className="auth-email-form">
          <input type="hidden" name="locale" value={locale} />
          
          <div className="form-group">
            <label>{locale === 'bn' ? 'পুরো নাম' : 'Full Name'}</label>
            <input type="text" name="name" placeholder={locale === 'bn' ? 'আপনার নাম দিন' : 'Enter your name'} required />
          </div>
          
          <div className="form-group">
            <label>{locale === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'}</label>
            <input type="tel" name="phone" placeholder="01XXXXXXXXX" pattern="01[3-9][0-9]{8}" required />
          </div>

          <div className="form-group">
            <label>{locale === 'bn' ? 'ইমেইল' : 'Email'}</label>
            <input type="email" name="email" placeholder={locale === 'bn' ? 'আপনার ইমেইল দিন' : 'Enter your email'} required />
          </div>
          
          <div className="form-group">
            <label>{locale === 'bn' ? 'পাসওয়ার্ড' : 'Password'}</label>
            <input type="password" name="password" placeholder="••••••••" minLength={6} required />
          </div>
          
          <button type="submit" className="primary-btn" style={{ marginTop: '16px' }}>
            {locale === 'bn' ? 'রেজিস্টার' : 'Register'}
          </button>
        </form>
        
        <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          {locale === 'bn' ? 'আগে থেকেই অ্যাকাউন্ট আছে?' : 'Already have an account?'} <Link href={`/${locale}/login`} style={{ color: 'var(--sindoor)', fontWeight: 'bold' }}>{locale === 'bn' ? 'লগইন করুন' : 'Login here'}</Link>
        </div>
      </div>
    </div>
  );
}
