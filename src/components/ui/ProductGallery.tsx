'use client';

import { useState } from 'react';
import Image from 'next/image';
import './ProductGallery.css';

export default function ProductGallery({ images, title }: { images: string[], title: string }) {
  const [activeImg, setActiveImg] = useState(images[0] || '/images/threepiece_hero.jpg');

  return (
    <div className="product-gallery">
      <div className="main-image">
        <Image src={activeImg} alt={title} fill priority className="p-img" />
      </div>
      
      {images.length > 1 && (
        <div className="thumbnail-list">
          {images.map((img: string, i: number) => (
            <div 
              key={i} 
              className={`thumbnail ${activeImg === img ? 'active' : ''}`}
              onClick={() => setActiveImg(img)}
            >
              <Image src={img} alt={`Thumbnail ${i}`} fill className="t-img" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
