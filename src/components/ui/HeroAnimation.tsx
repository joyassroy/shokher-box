'use client';
import Image from 'next/image';
import './HeroAnimation.css';

export default function HeroAnimation() {
  return (
    <div className="hero-premium-visual">
      <div className="glow-backdrop"></div>
      
      <div className="hero-image-wrapper">
        <Image 
          src="/images/hero_bangles.jpg" 
          alt="Premium Handcrafted Bangles" 
          fill
          className="hero-main-image"
          priority
        />
        
        {/* Floating glass card overlay */}
        <div className="floating-badge">
          <div className="badge-icon">✨</div>
          <div className="badge-text">
            <span>Handcrafted</span>
            <strong>Premium Quality</strong>
          </div>
        </div>
      </div>
      
      <div className="floating-sparkles">
        <div className="f-sparkle fs-1">✦</div>
        <div className="f-sparkle fs-2">✦</div>
        <div className="f-sparkle fs-3">✦</div>
        <div className="f-sparkle fs-4">✦</div>
      </div>
    </div>
  );
}
