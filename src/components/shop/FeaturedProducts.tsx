import Image from 'next/image';
import { getDictionary, Locale } from '@/dictionaries';
import './FeaturedProducts.css';

export default async function FeaturedProducts({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  const products = [
    {
      id: 1,
      title: locale === 'bn' ? 'সবুজ সুতার কুন্দন চুড়ি' : 'Green Thread Kundan Bangle',
      price: '৳১,২৫০',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Churi',
    },
    {
      id: 2,
      title: locale === 'bn' ? 'মেরুন সুতার কুন্দন চুড়ি' : 'Maroon Thread Kundan Bangle',
      price: '৳১,৪০০',
      image: 'https://images.unsplash.com/photo-1599643478524-fb5244098775?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Churi',
    },
    {
      id: 3,
      title: locale === 'bn' ? 'সোনালী মেটাল ঝুমকা' : 'Golden Metal Jhumka',
      price: '৳৮৫০',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Jhapi',
    },
    {
      id: 4,
      title: locale === 'bn' ? 'নীল জামদানি শাড়ি' : 'Blue Jamdani Saree',
      price: '৳৪,৫০০',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Saree',
    }
  ];

  return (
    <section className="featured-section">
      <div className="section-header">
        <h2>{locale === 'bn' ? 'নতুন কালেকশন' : 'New Arrivals'}</h2>
        <a href={`/${locale}/shop`} className="view-all-link">{dict.home.view_all} &rarr;</a>
      </div>
      
      <div className="product-grid">
        {products.map((product) => (
          <a href={`/${locale}/product/sample-slug`} key={product.id} className="product-card">
            <div className="product-img-wrapper">
              <Image 
                src={product.image} 
                alt={product.title} 
                fill 
                className="product-img"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <span className="badge featured">{locale === 'bn' ? 'হট' : 'HOT'}</span>
            </div>
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3 className="product-title">{product.title}</h3>
              <div className="price-row">
                <p className="current-price">{product.price}</p>
              </div>
              <div className="card-action">
                <span className="view-btn">{locale === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
