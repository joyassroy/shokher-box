import { getDictionary, Locale } from '@/dictionaries';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import './catalog.css';

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ locale: string, category: string }> 
}) {
  const { locale, category: categorySlug } = (await params) as { locale: Locale, category: string };
  const dict = await getDictionary(locale);

  // Validate basic routes to not catch auth routes
  if (['login', 'register', 'onboarding', 'cart'].includes(categorySlug)) {
    return null; // Handled by their respective folders
  }

  await dbConnect();

  // Find the category
  let category = await Category.findOne({ slug: categorySlug });
  
  // Fallback for demonstration if DB is empty
  if (!category) {
    if (['churi', 'threepiece', 'jhapi'].includes(categorySlug)) {
      category = {
        name: { 
          bn: categorySlug === 'churi' ? 'কাস্টম চুড়ি' : categorySlug === 'threepiece' ? 'এক্সক্লুসিভ থ্রি পিস' : 'বিয়ের ঝাঁপি',
          en: categorySlug === 'churi' ? 'Custom Bangles' : categorySlug === 'threepiece' ? 'Premium Three Piece' : 'Bridal Jhapi'
        },
        image: '/images/hero_bangles.jpg',
        _id: 'mock-id'
      };
    } else {
      notFound();
    }
  }

  // Find products for this category
  let products = [];
  if (category._id !== 'mock-id') {
    products = await Product.find({ category: category._id, isActive: true })
                                  .sort({ createdAt: -1 });
  }

  if (categorySlug === 'threepiece') {
    return (
      <div className="catalog-container saree-layout">
        <div className="saree-editorial-header">
          <div className="saree-header-text">
            <h1>{category.name[locale]}</h1>
            <p>{locale === 'bn' ? 'ঐতিহ্য আর আভিজাত্যের মেলবন্ধন' : 'A blend of tradition and elegance'}</p>
          </div>
          <div className="saree-header-image">
             <Image src="/images/threepiece_hero.jpg" alt="Three Piece Suit" fill className="editorial-img" />
          </div>
        </div>

        <div className="saree-grid">
          {products.length > 0 ? (
            products.map(product => (
              <Link href={`/${locale}/product/${product.slug}`} key={product._id.toString()} className="saree-card">
                <div className="saree-img-wrapper">
                  <Image src={product.images[0] || '/images/threepiece_portrait.jpg'} alt={product.title[locale] as string} fill className="saree-img" />
                </div>
                <div className="saree-info">
                  <h3>{product.title[locale]}</h3>
                  <p>৳ {product.price}</p>
                </div>
              </Link>
            ))
          ) : (
             <div className="empty-state saree-empty">
               <Image src="/images/threepiece_portrait.jpg" alt="Coming Soon" width={200} height={300} className="empty-img" />
               <div className="empty-text">
                 <h3>{locale === 'bn' ? 'নতুন থ্রি পিসের কালেকশন আসছে...' : 'New Three Piece Collection Coming Soon...'}</h3>
                 <p>{locale === 'bn' ? 'আমাদের কারিগররা তৈরি করছেন আপনার স্বপ্নের থ্রি পিস' : 'Our artisans are tailoring your dream dress'}</p>
               </div>
             </div>
          )}
        </div>
      </div>
    );
  }

  // Default / Churi Layout (Masonry style emphasis)
  return (
    <div className="catalog-container churi-layout">
      <div className="catalog-header">
        <div className="catalog-header-bg">
           <Image src={category.image || '/images/hero_bangles.jpg'} alt={category.name[locale] as string} fill className="cat-bg-img" />
           <div className="cat-bg-overlay"></div>
        </div>
        <div className="catalog-header-content">
          <h1>{category.name[locale]}</h1>
          <p>{locale === 'bn' ? 'হাতের জাদুতে তৈরি কাস্টম জুয়েলারি' : 'Handcrafted custom jewelry'}</p>
        </div>
      </div>

      <div className="catalog-content">
        <div className="catalog-filters hidden-mobile">
          <h3>{locale === 'bn' ? 'ফিল্টার করুন' : 'Filter'}</h3>
          <div className="filter-group">
            <label><input type="checkbox" /> {locale === 'bn' ? 'নতুন কালেকশন' : 'New Arrivals'}</label>
            <label><input type="checkbox" /> {locale === 'bn' ? 'ব্রাইডাল সেট' : 'Bridal Set'}</label>
          </div>
        </div>

        <div className="catalog-grid churi-grid">
          {products.length > 0 ? (
            products.map(product => (
              <Link href={`/${locale}/product/${product.slug}`} key={product._id.toString()} className="product-card">
                <div className="product-img-wrapper">
                  <Image src={product.images[0] || '/images/craft_main.jpg'} alt={product.title[locale] as string} fill className="product-img" />
                  {product.isFeatured && <span className="badge featured">{locale === 'bn' ? 'হট' : 'HOT'}</span>}
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title[locale]}</h3>
                  <div className="price-row">
                    <span className="current-price">৳ {product.price}</span>
                  </div>
                  <div className="card-action">
                    <span className="view-btn">{locale === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="empty-state">
              <h3>{locale === 'bn' ? 'দুঃখিত, কোনো প্রোডাক্ট পাওয়া যায়নি' : 'Sorry, no products found'}</h3>
              <p>{locale === 'bn' ? 'খুব শিগগিরই এখানে নতুন প্রোডাক্ট যোগ করা হবে!' : 'New products will be added here very soon!'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
