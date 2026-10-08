import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { completeOnboarding } from '@/actions/auth';
import { Locale } from '@/dictionaries';
import './onboarding.css';

export default async function OnboardingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  if (session.user.profileComplete) {
    redirect(`/${locale}`);
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <h2>{locale === 'bn' ? 'আর একটি ধাপ!' : 'One More Step!'}</h2>
        <p>
          {locale === 'bn' 
            ? 'অর্ডার কনফার্মেশনের জন্য আপনার মোবাইল নম্বরটি প্রয়োজন।' 
            : 'We need your mobile number for order confirmation.'}
        </p>

        <form action={async (formData) => {
          'use server';
          await completeOnboarding(formData);
        }} className="onboarding-form">
          <input type="hidden" name="locale" value={locale} />
          <div className="form-group">
            <label>{locale === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'}</label>
            <div className="phone-input-wrapper">
              <span className="phone-prefix">+880</span>
              <input type="tel" name="phone" placeholder="1XXXXXXXXX" pattern="1[3-9][0-9]{8}" required />
            </div>
          </div>
          <button type="submit" className="primary-btn">
            {locale === 'bn' ? 'সম্পন্ন করুন' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
