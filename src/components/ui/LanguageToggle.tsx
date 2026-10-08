'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/dictionaries';
import './LanguageToggle.css';

export default function LanguageToggle({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = currentLocale === 'bn' ? 'en' : 'bn';
    const currentPathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    router.push(`/${nextLocale}${currentPathWithoutLocale}`);
  };

  return (
    <button className="lang-toggle-btn" onClick={toggleLanguage}>
      <span className={currentLocale === 'bn' ? 'active' : ''}>বাং</span>
      {' | '}
      <span className={currentLocale === 'en' ? 'active' : ''}>EN</span>
    </button>
  );
}
