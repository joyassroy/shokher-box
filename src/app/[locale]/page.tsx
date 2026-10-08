import { getDictionary, Locale } from '@/dictionaries';
import HeroAnimation from '@/components/ui/HeroAnimation';
import FeaturedProducts from '@/components/shop/FeaturedProducts';
import Link from 'next/link';
import { Sparkles, Gem, Truck, Star } from 'lucide-react';
import './page.css';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-text-content">
            <div className="hero-badge">
              <Sparkles size={16} strokeWidth={2.5} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
              {locale === 'bn' ? 'প্রিমিয়াম কালেকশন' : 'Premium Collection'}
            </div>
            <h1 className="hero-title">
              {locale === 'bn' ? (
                <>শখের কোনো<br/><span>সীমানা</span> নেই</>
              ) : (
                <>No limits to your<br/><span>passion</span></>
              )}
            </h1>
            <p className="hero-description">
              {locale === 'bn' 
                ? 'হাতে তৈরি সুতা ও কুন্দনের কাজের চোখ ধাঁধানো কাস্টম চুড়ি এবং প্রিমিয়াম জামদানি শাড়ির সবচেয়ে বড় কালেকশন এখন শখের বাক্সে।' 
                : 'The finest collection of handcrafted silk thread bangles, kundan jewelry, and premium Three Piece suits exclusively at Shokher Baxho.'}
            </p>
            <div className="hero-actions">
              <Link href={`/${locale}/shop`} className="btn-primary">
                {locale === 'bn' ? 'শপিং শুরু করুন' : 'Shop Now'}
              </Link>
              <Link href={`/${locale}/collections`} className="btn-secondary">
                {locale === 'bn' ? 'কালেকশন দেখুন' : 'View Collection'} <span style={{fontSize:'20px'}}>→</span>
              </Link>
            </div>
          </div>
          <div className="hero-visual-wrapper">
            <HeroAnimation />
          </div>
        </div>
      </section>

      {/* Scrolling Marquee */}
      <div className="marquee-section">
        <div className="marquee-content">
          {Array(8).fill(null).map((_, i) => (
            <div className="marquee-item" key={i}>
              <span><Star size={18} fill="currentColor" /></span> {locale === 'bn' ? 'শতভাগ অরিজিনাল কোয়ালিটি' : '100% Original Quality'}
              <span><Star size={18} fill="currentColor" /></span> {locale === 'bn' ? 'কাস্টম ডিজাইনের সুবিধা' : 'Custom Designs Available'}
              <span><Star size={18} fill="currentColor" /></span> {locale === 'bn' ? 'সারা দেশে হোম ডেলিভারি' : 'Nationwide Home Delivery'}
            </div>
          ))}
        </div>
      </div>

      {/* Modern Editorial Section: The Craftsmanship */}
      <section className="craft-section">
        <div className="craft-container">
          <div className="craft-text">
            <span className="section-subtitle">{locale === 'bn' ? 'আমাদের কারুশিল্প' : 'Our Craftsmanship'}</span>
            <h2>{locale === 'bn' ? 'প্রতিটি সুতায় বোনা হয় ভালোবাসা ও ঐতিহ্য' : 'Woven with love and tradition in every thread'}</h2>
            <p>
              {locale === 'bn' 
                ? 'আমরা শুধু গহনা বিক্রি করি না, আমরা একটি অনুভূতি তৈরি করি। আপনার শাড়ির রঙের সাথে নিখুঁতভাবে মিলিয়ে কাস্টম ডিজাইনের চুড়ি তৈরি করতে আমাদের কারিগররা ঘণ্টার পর ঘণ্টা সময় দেন। কুন্দন পাথর আর রেশমি সুতার এই মেলবন্ধন আপনাকে দেবে এক রাজকীয় লুক।' 
                : 'We don\'t just sell jewelry, we craft emotions. Our artisans spend hours perfecting custom designs to match your outfit. The blend of kundan stones and silk thread gives you a royal look.'}
            </p>
            <div className="trust-badges">
              <div className="t-badge"><span>✓</span> {locale === 'bn' ? 'হাতে তৈরি' : 'Handcrafted'}</div>
              <div className="t-badge"><span>✓</span> {locale === 'bn' ? 'কাস্টম ডিজাইন' : 'Custom Design'}</div>
              <div className="t-badge"><span>✓</span> {locale === 'bn' ? 'প্রিমিয়াম ফিনিশিং' : 'Premium Finish'}</div>
            </div>
          </div>
          <div className="craft-visuals">
            <div className="img-box img-main">
              <img src="/images/craft_main.jpg" alt="Crafting jewelry with kundan and silk thread" />
            </div>
            <div className="img-box img-float">
              <img src="/images/craft_float.jpg" alt="Macro shot of Kundan stones and silk thread" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials (Bento Style) */}
      <section className="reviews-section">
        <div className="reviews-header">
          <h2>{locale === 'bn' ? 'শখের বাক্সের খুশি ক্রেতারা' : 'Happy Customers'}</h2>
          <p>{locale === 'bn' ? 'দেখুন আমাদের কাস্টমাররা কী বলছেন' : 'See what our clients say about us'}</p>
        </div>
        <div className="bento-grid">
          <div className="review-card bento-large">
            <div className="stars">★★★★★</div>
            <p className="review-text">"{locale === 'bn' ? 'চুড়িগুলো হাতে পাওয়ার পর আমি মুগ্ধ! ঠিক যেমনটা চেয়েছিলাম, থ্রি পিসের কালারের সাথে একদম পারফেক্ট ম্যাচ করেছে। প্যাকেজিংটাও খুব প্রিমিয়াম ছিল।' : 'Absolutely mesmerized by the bangles! Matched my three piece perfectly.'}"</p>
            <p className="reviewer">- {locale === 'bn' ? 'সাদিয়া তাসনিম' : 'Sadia Tasnim'}</p>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"{locale === 'bn' ? 'কুন্দনের কাজটা এত নিখুঁত যে সবাই জিজ্ঞেস করছিল কোথা থেকে নিয়েছি।' : 'The kundan work is so flawless, everyone kept asking about it.'}"</p>
            <p className="reviewer">- {locale === 'bn' ? 'ফারিয়া হক' : 'Faria Hoque'}</p>
          </div>
          <div className="review-card dark-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"{locale === 'bn' ? 'ডেলিভারি অনেক ফাস্ট ছিল। কোয়ালিটি নিয়ে কোনো সন্দেহ নেই!' : 'Super fast delivery. No doubts about the quality!'}"</p>
            <p className="reviewer">- {locale === 'bn' ? 'নোভা রহমান' : 'Nova Rahman'}</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts locale={locale} />
    </div>
  );
}
