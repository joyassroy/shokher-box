import { getDictionary, Locale } from '@/dictionaries';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartBtn from '@/components/ui/AddToCartBtn';
import './product.css';

export default async function ProductPage({
  params
}: {
  params: Promise<{ locale: Locale, slug: string }>
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);

  await dbConnect();
  
  let product = await Product.findOne({ slug, isActive: true }).populate('category');

  // Fallback for demonstration since DB is empty
  if (!product) {
    if (slug === 'royal-silk-bangles-01' || slug === 'demo') {
       product = {
         title: { bn: 'রাজকীয় রেশমি চুড়ি', en: 'Royal Silk Bangles' },
         slug: 'royal-silk-bangles-01',
         description: { 
           bn: 'খুবই সুন্দর কাস্টমাইজড চুড়ি। প্রিমিয়াম কুন্দন পাথর এবং খাঁটি রেশমি সুতায় মোড়ানো এই চুড়িগুলো যেকোনো উৎসব বা বিয়ের অনুষ্ঠানের জন্য একদম মানানসই। প্রতিটি চুড়ি আমাদের কারিগরদের নিজ হাতে নিপুণভাবে তৈরি।', 
           en: 'Beautiful customized bangles wrapped in premium silk thread and adorned with sparkling kundan stones. Handcrafted to perfection.' 
         },
         images: ['/images/craft_main.jpg', '/images/hero_bangles.jpg', '/images/craft_float.jpg'],
         price: 1200,
         comparePrice: 1500,
         material: 'Silk Thread, Kundan Stones, Metal Base',
         tags: ['Bridal', 'Handcrafted', 'Premium'],
         variants: [
           { size: '2.2' }, { size: '2.4' }, { size: '2.6' }
         ],
         ratingAvg: 4.8,
         soldCount: 124
       };
    } else {
       // Since the links in our empty state don't point anywhere specific, let's just use the mock for any slug during this phase
       product = {
        title: { bn: 'এক্সক্লুসিভ কালেকশন', en: 'Exclusive Collection' },
        slug,
        description: { 
          bn: 'আমাদের অন্যতম সেরা একটি কালেকশন। প্রিমিয়াম কোয়ালিটি মেটেরিয়াল দিয়ে তৈরি, যা আপনাকে দেবে আভিজাত্যের ছোঁয়া।', 
          en: 'One of our finest collections, made with premium materials giving you a touch of elegance.' 
        },
        images: ['/images/threepiece_hero.jpg', '/images/threepiece_portrait.jpg'],
        price: 2500,
        material: 'Premium Fabric / Material',
        tags: ['New Arrival'],
        variants: [],
      };
    }
  }

  return (
    <div className="product-page">
      <div className="breadcrumb">
        <Link href={`/${locale}`}>{locale === 'bn' ? 'হোম' : 'Home'}</Link>
        <span>/</span>
        <span>{product.title[locale]}</span>
      </div>

      <div className="product-layout">
        {/* Left: Image Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <Image src={product.images[0] || '/images/hero_bangles.jpg'} alt={product.title[locale]} fill className="p-img" />
          </div>
          <div className="thumbnail-list">
            {product.images.map((img: string, i: number) => (
              <div key={i} className={`thumbnail ${i === 0 ? 'active' : ''}`}>
                <Image src={img} alt={`Thumbnail ${i}`} fill className="t-img" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="product-details">
          <div className="product-header">
            {product.tags && product.tags.length > 0 && (
              <span className="product-badge">{product.tags[0]}</span>
            )}
            <h1 className="product-title">{product.title[locale]}</h1>
            <div className="product-price-row">
              <span className="current-price">৳ {product.price}</span>
              {product.comparePrice && <span className="old-price">৳ {product.comparePrice}</span>}
            </div>
          </div>

          <div className="product-description">
            <p>{product.description[locale]}</p>
          </div>

          <AddToCartBtn product={product} locale={locale} />

          <div className="trust-signals">
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"></path></svg>
              <span>{locale === 'bn' ? '১০০% অরিজিনাল প্রোডাক্ট' : '100% Original Product'}</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
              <span>{locale === 'bn' ? 'নিরাপদ পেমেন্ট' : 'Secure Payment'}</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>{locale === 'bn' ? 'দ্রুত ডেলিভারি' : 'Fast Delivery'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
