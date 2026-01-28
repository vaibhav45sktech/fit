import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "The Royal Gurkha",
    subtitle: "Timeless Elegance",
    image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=2070&auto=format&fit=crop",
    cta: "Shop Trousers",
    link: "/shop?category=modern"
  },
  {
    id: 2,
    title: "Ceremonial Grandeur",
    subtitle: "Wedding Collection 2024",
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2080&auto=format&fit=crop",
    cta: "Explore Wedding",
    link: "/shop?category=wedding"
  },
  {
    id: 3,
    title: "Silk & Velvet",
    subtitle: "Premium Shirts",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3ef6548?q=80&w=1965&auto=format&fit=crop",
    cta: "View Collection",
    link: "/shop?category=shirt"
  }
];

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[10000ms]"
            style={{ backgroundImage: `url(${slide.image})`, transform: index === current ? 'scale(100%)' : 'scale(105%)' }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-transparent opacity-90" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-4xl px-6 space-y-6">
              <p className="text-amber-500 tracking-[0.3em] uppercase text-sm font-semibold animate-fadeIn opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                {slide.subtitle}
              </p>
              <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight animate-slideUp opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                {slide.title}
              </h1>
              <div className="pt-8 animate-fadeIn opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                <Link 
                  to={slide.link}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-black font-bold uppercase tracking-wider text-sm transition-all transform hover:-translate-y-1"
                >
                  {slide.cta} <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current ? 'bg-amber-500 w-8' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;