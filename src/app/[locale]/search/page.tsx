import { getDictionary, Locale } from '@/dictionaries';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Image from 'next/image';
import Link from 'next/link';
import '../[category]/catalog.css'; // Reuse catalog styling

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  const dict = await getDictionary(locale);
  const query = q || '';

  await dbConnect();

  let products = [];
  if (query.trim()) {
    const searchRegex = new RegExp(query, 'i');
    products = await Product.find({
      isActive: true,
      $or: [
        { 'title.bn': searchRegex },
        { 'title.en': searchRegex },
        { tags: searchRegex }
      ]
    }).sort({ createdAt: -1 });
  }

  return (
    <div className="catalog-container" style={{ padding: '40px 5%', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-noto-bengali), serif', color: 'var(--sindoor)', fontSize: '32px', marginBottom: '12px' }}>
          {locale === 'bn' ? 'সার্চ রেজাল্ট' : 'Search Results'}
        </h1>
        <p style={{ color: 'var(--raat)', fontSize: '18px' }}>
          {locale === 'bn' 
            ? `"${query}" এর জন্য ${products.length} টি প্রোডাক্ট পাওয়া গেছে` 
            : `${products.length} products found for "${query}"`}
        </p>
      </div>

      <div className="catalog-grid">
        {products.length > 0 ? (
          products.map(product => (
            <Link href={`/${locale}/product/${product.slug}`} key={product._id.toString()} className="product-card">
              <div className="product-img-wrapper">
                <Image 
                  src={product.images[0] || '/images/hero_bangles.jpg'} 
                  alt={product.title[locale] as string} 
                  fill 
                  className="product-img" 
                />
                {product.isFeatured && (
                  <span className="badge featured">{locale === 'bn' ? 'বেস্টসেলার' : 'Bestseller'}</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title[locale]}</h3>
                <div className="product-price">
                  <span className="current-price">৳ {product.price}</span>
                  {product.comparePrice && <span className="old-price">৳ {product.comparePrice}</span>}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state" style={{ padding: '60px' }}>
            <h3>{locale === 'bn' ? 'দুঃখিত, কোনো প্রোডাক্ট পাওয়া যায়নি' : 'Sorry, no products found'}</h3>
            <p>{locale === 'bn' ? 'দয়া করে অন্য কিছু লিখে সার্চ করুন' : 'Please try searching for something else'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
