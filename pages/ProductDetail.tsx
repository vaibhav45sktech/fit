import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShieldCheck, Ruler, Heart, CheckCircle2, Truck, X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useReview } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Size Guide Data
const SIZE_GUIDE_DATA = {
  tailored: {
    title: "Tailored Fit (Premium)",
    headers: ["Size", "Shoulder", "Chest", "Waist", "Hip", "Sleeve", "Neck", "Biceps", "Forearm", "Length"],
    rows: [
      ["XS", 16, 38, 34, 38, 24, 14.5, 12.5, 9.5, 27],
      ["S", 17.5, 39.5, 35.5, 39.5, 24.5, 15, 13.5, 10, 28],
      ["M", 18, 41, 37, 41, 25, 15.5, 14, 10, 28.5],
      ["L", 19, 42.5, 38.5, 42.5, 25, 16, 15, 10.5, 29],
      ["XL", 19.5, 44, 40, 44, 25.5, 16.5, 15.5, 11, 30],
      ["XXL", 20.5, 46.5, 42.5, 46.5, 26, 17.5, 16.5, 11.5, 31],
      ["3XL", 21.5, 49, 45, 49, 26.5, 18, 17.5, 12, 32]
    ]
  },
  classic: {
    title: "Classic / Regular Fit",
    headers: ["Size", "Shoulder", "Chest", "Waist", "Hip", "Sleeve", "Neck", "Biceps", "Forearm", "Length"],
    rows: [
      ["XS", 16.5, 40, 37, 40, 24, 14.5, 13.5, 10, 27],
      ["S", 17.5, 41.5, 38.5, 41.5, 24.5, 15, 14, 10.5, 28],
      ["M", 18, 43, 40, 43, 25, 15.5, 15, 11, 28.5],
      ["L", 19, 44.5, 41.5, 44.5, 25, 16, 15.5, 11.5, 29],
      ["XL", 19.5, 46, 43.5, 46, 25.5, 16.5, 16.5, 12, 30],
      ["XXL", 20.5, 48, 45.5, 48, 26, 17.5, 17.5, 12.5, 31],
      ["3XL", 21.5, 50.5, 48, 50.5, 26.5, 18, 18, 13, 32]
    ]
  },
  slim: {
    title: "Slim Fit",
    headers: ["Size", "Shoulder", "Chest", "Waist", "Hip", "Sleeve", "Neck", "Biceps", "Forearm", "Length"],
    rows: [
      ["XS", 16, 36, 32, 36, 24, 14, 12, 9, 26.5],
      ["S", 17, 38, 34, 38, 24.5, 14.5, 12.5, 9.5, 27.5],
      ["M", 18, 39.5, 35.5, 39.5, 25, 15, 13.5, 10, 28],
      ["L", 18.5, 41, 37, 41, 25, 15.5, 14, 10.5, 28.5],
      ["XL", 19.5, 42.5, 38.5, 42.5, 25.5, 16, 15, 11, 29.5],
      ["XXL", 20, 45, 41, 45, 26, 17, 16, 11.5, 30.5],
      ["3XL", 21, 47, 43.5, 47, 26.5, 17.5, 16.5, 12, 31.5]
    ]
  }
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  // Review & Auth Context
  const { addReview, getReviewsByProductId, getProductRating } = useReview();
  const { user } = useAuth();

  const [selectedSize, setSelectedSize] = useState(product?.size[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedFit, setSelectedFit] = useState("Regular Fit");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Review Form State
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!product) return <div className="pt-32 text-center">Product not found</div>;

  const productImages = product.images?.length 
    ? product.images 
    : (product.image ? [product.image] : []);

  const isWishlisted = isInWishlist(product.id);
  const productReviews = getReviewsByProductId(product.id);
  const { rating: avgRating, count: reviewCount } = getProductRating(product.id);
  
  // Use context rating if available, otherwise fallback to product static rating
  const displayRating = reviewCount > 0 ? avgRating : product.rating;
  const displayCount = reviewCount > 0 ? reviewCount : product.reviews;

  const handleSubmitReview = () => {
    if (!user) {
        toast.error("Please login to write a review");
        return;
    }
    if (!comment.trim()) {
        toast.error("Please write a comment");
        return;
    }
    
    addReview({
        productId: product.id,
        userName: user.name,
        rating: rating,
        comment: comment
    });

    toast.success("Review submitted successfully!");
    setIsWritingReview(false);
    setComment('');
    setRating(5);
  };

  const nextImage = () => {
    if (productImages.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % productImages.length);
  };
  
  const prevImage = () => {
    if (productImages.length === 0) return;
    setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left: Images Gallery */}
        <div className="space-y-4">
           {productImages.length > 0 ? (
             <>
               {/* Desktop: Vertical Scroll Stack */}
               <div className="hidden md:flex flex-col gap-6">
                  {productImages.map((img, idx) => (
                     <div key={idx} className="group relative w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-amber-500/30 transition-colors">
                        <img 
                          src={img} 
                          alt={`${product.title} view ${idx + 1}`} 
                          className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" 
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                     </div>
                  ))}
               </div>

               {/* Mobile: Horizontal Snap Carousel */}
               <div className="md:hidden relative group">
                  <div className="aspect-[3/4] w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-800 relative">
                      <img 
                        src={productImages[activeImageIndex]} 
                        alt={product.title} 
                        className="w-full h-full object-cover transition-opacity duration-300" 
                      />
                      
                      {/* Arrows */}
                      {productImages.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-black/70">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-black/70">
                                <ChevronRight size={20} />
                            </button>
                        </>
                      )}
                      
                      {/* Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                         {productImages.map((_, idx) => (
                            <div 
                              key={idx} 
                              className={`w-2 h-2 rounded-full transition-all ${idx === activeImageIndex ? 'bg-amber-500 w-4' : 'bg-white/50'}`} 
                            />
                         ))}
                      </div>
                  </div>
                  
                  {/* Thumbnails Row (Mobile Only) */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
                      {productImages.map((img, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)} 
                            className={`relative w-20 aspect-square flex-shrink-0 rounded-md overflow-hidden border-2 ${idx === activeImageIndex ? 'border-amber-500' : 'border-transparent opacity-70'}`}
                          >
                             <img src={img} className="w-full h-full object-cover" />
                          </button>
                      ))}
                  </div>
               </div>
             </>
           ) : (
               <div className="aspect-[3/4] w-full bg-surface rounded-lg border border-gray-800 flex flex-col items-center justify-center text-gray-500">
                   <ImageOff size={48} className="mb-2 opacity-50" />
                   <span className="text-sm">No Images Available</span>
               </div>
           )}
        </div>

        {/* Right: Info (Sticky on Desktop) */}
        <div className="md:sticky md:top-24 h-fit space-y-8">
           <div>
              <h1 className="text-3xl md:text-5xl font-serif mb-3 leading-tight">{product.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                 <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < Math.floor(displayRating) ? "currentColor" : "none"} />)}
                 </div>
                 <span className="text-sm text-gray-500">({displayCount} Reviews)</span>
              </div>
              <div className="flex items-baseline gap-4">
                 <span className="text-4xl font-bold text-amber-500">₹{product.price.toLocaleString()}</span>
                 {product.originalPrice && <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>}
                 {product.originalPrice && (
                    <span className="text-xs font-bold bg-amber-500/10 text-amber-500 px-2 py-1 rounded">
                       {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                 )}
              </div>
              <p className="text-xs text-gray-500 mt-2 font-medium tracking-wide">INCLUSIVE OF ALL TAXES</p>
           </div>

           <div className="h-px bg-gradient-to-r from-gray-800 to-transparent" />

           <div className="space-y-4">
               <p className="text-gray-300 leading-relaxed text-base">{product.description}</p>
               
               {/* Key Features Section */}
               {product.features && (
                   <div className="bg-surface/50 rounded-xl p-5 border border-gray-800/50">
                       <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Product Highlights</h3>
                       <ul className="space-y-3">
                           {product.features.map((feature, idx) => (
                               <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                   <CheckCircle2 size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                                   <span>{feature}</span>
                               </li>
                           ))}
                       </ul>
                   </div>
               )}
           </div>

           <div className="space-y-6">
              {/* Selectors */}
              <div className="space-y-6 bg-surface/30 p-5 rounded-xl border border-gray-800/50">
                  {/* Color Selector */}
                  <div>
                     <span className="block text-xs font-bold mb-3 uppercase text-gray-400 tracking-wider">Color: <span className="text-white">{selectedColor}</span></span>
                     <div className="flex gap-3">
                        {product.colors.map(color => (
                            <button
                              key={color} 
                              onClick={() => setSelectedColor(color)}
                              className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor === color ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-gray-600'}`}
                              style={{ backgroundColor: color.toLowerCase() }}
                              title={color}
                            />
                        ))}
                     </div>
                  </div>

                  {/* Fit Selector */}
                  <div>
                     <span className="block text-xs font-bold mb-3 uppercase text-gray-400 tracking-wider">Fit: <span className="text-white">{selectedFit}</span></span>
                     <div className="flex flex-wrap gap-3">
                        {["Slim Fit", "Regular Fit", "Tailored Fit"].map(fit => (
                            <button
                              key={fit} 
                              onClick={() => setSelectedFit(fit)}
                              className={`px-4 py-2 border rounded-lg transition-all text-sm ${selectedFit === fit ? 'bg-amber-500 text-black border-amber-500 font-bold' : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
                            >
                               {fit}
                            </button>
                        ))}
                     </div>
                  </div>

                  {/* Size Selector */}
                  <div>
                     <div className="flex justify-between items-center mb-3 relative">
                        <span className="block text-xs font-bold uppercase text-gray-400 tracking-wider">Size: <span className="text-white">{selectedSize}</span></span>
                        
                        <div className="relative">
                            <button 
                                onClick={() => setShowSizeGuide(!showSizeGuide)}
                                className="text-amber-500 text-xs flex items-center gap-1 hover:underline cursor-pointer py-1 font-medium"
                            >
                                <Ruler size={14} /> Size Guide
                            </button>
                            {/* Size Guide Modal Logic (Kept Same) */}
                            {showSizeGuide && (
                                <div className="absolute right-0 bottom-full mb-2 w-[85vw] md:w-[600px] max-h-[60vh] overflow-y-auto bg-[#1a1a1a] border border-gray-700 p-4 rounded-xl shadow-2xl z-50 text-xs text-gray-300 custom-scrollbar animate-fadeIn">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-serif text-white">Shirt Fit & Measurement System</h3>
                                            <p className="mb-4 text-gray-500 italic">All measurements are in INCHES (Garment measurements)</p>
                                        </div>
                                        <button onClick={() => setShowSizeGuide(false)} className="text-gray-400 hover:text-white p-1">
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="space-y-6">
                                        {Object.values(SIZE_GUIDE_DATA).map((fit, idx) => (
                                            <div key={idx}>
                                                <h4 className="text-amber-500 font-bold mb-2 uppercase text-[10px] tracking-wider">{fit.title}</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-left border-collapse">
                                                        <thead>
                                                            <tr className="border-b border-gray-700 text-gray-500">
                                                                {fit.headers.map((h, i) => <th key={i} className="p-2 font-medium whitespace-nowrap">{h}</th>)}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {fit.rows.map((row, rIdx) => (
                                                                <tr key={rIdx} className="border-b border-gray-800 hover:bg-white/5">
                                                                    {row.map((cell, cIdx) => <td key={cIdx} className={`p-2 whitespace-nowrap ${cIdx === 0 ? 'font-bold text-white' : ''}`}>{cell}</td>)}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                     </div>
                     
                     <div className="flex flex-wrap gap-3">
                        {product.size.map(size => (
                            <button
                              key={size} 
                              onClick={() => setSelectedSize(size)}
                              className={`w-12 h-12 flex items-center justify-center border rounded-lg transition-all ${selectedSize === size ? 'bg-amber-500 text-black border-amber-500 font-bold' : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
                            >
                               {size}
                            </button>
                        ))}
                     </div>
                  </div>
              </div>
           </div>

           <div className="flex gap-4 pt-4">
               <button 
                 onClick={() => addToCart(product, selectedSize, selectedColor, selectedFit)}
                 className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold py-4 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all uppercase tracking-wider shadow-lg shadow-amber-500/20"
               >
                  Add to Cart
               </button>
               <button 
                 onClick={() => toggleWishlist(product)}
                 className={`w-14 flex items-center justify-center border rounded-xl transition-all ${isWishlisted ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-gray-700 hover:border-amber-500 hover:text-amber-500'}`}
               >
                  <Heart fill={isWishlisted ? "currentColor" : "none"} />
               </button>
           </div>

           <div className="grid grid-cols-1 gap-4 text-xs text-gray-400 pt-2 border-t border-gray-800 mt-4">
              <div className="flex items-center gap-2 mt-4">
                 <ShieldCheck size={16} className="text-amber-500" />
                 <span>100% Authentic Products</span>
              </div>
              <div className="flex items-center gap-2">
                 <Truck size={16} className="text-amber-500" />
                 <span>Fast & Insured Delivery</span>
              </div>
           </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 border-t border-gray-800 pt-12">
        <h2 className="text-2xl font-serif mb-8 flex items-center gap-4">
          Customer Reviews <span className="text-sm font-sans text-gray-500 font-normal">({displayCount})</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Rating Summary */}
          <div className="bg-surface p-6 rounded-xl border border-gray-800 h-fit">
            <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">{displayRating}</div>
                <div className="flex justify-center text-amber-500 mb-2">
                   {[...Array(5)].map((_, i) => <Star key={i} size={20} fill={i < Math.floor(displayRating) ? "currentColor" : "none"} />)}
                </div>
                <p className="text-gray-400 text-sm mb-6">Based on {displayCount} verified reviews</p>
                <button 
                  onClick={() => setIsWritingReview(true)}
                  className="w-full py-3 bg-white/5 border border-gray-700 text-white rounded-xl hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all font-medium"
                >
                  Write a Review
                </button>
            </div>
            
            <div className="mt-8 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="w-3">{star}★</span>
                        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500" style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }}></div>
                        </div>
                        <span className="w-6 text-right">{star === 5 ? '70%' : star === 4 ? '20%' : '5%'}</span>
                    </div>
                ))}
            </div>
          </div>

          {/* Reviews List & Form */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Write Review Form */}
            {isWritingReview && (
              <div className="bg-surface/50 p-6 rounded-xl border border-amber-500/50 mb-8 animate-fadeIn">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">Write Your Review</h3>
                    <button onClick={() => setIsWritingReview(false)} className="text-gray-500 hover:text-white"><X size={20}/></button>
                 </div>
                 
                 <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Rating</label>
                    <div className="flex gap-2">
                       {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} onClick={() => setRating(star)} type="button">
                             <Star size={24} className={star <= rating ? "text-amber-500 fill-current" : "text-gray-600"} />
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Review</label>
                    <textarea 
                       value={comment}
                       onChange={(e) => setComment(e.target.value)}
                       className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none h-24"
                       placeholder="How was the product? How is the fit?"
                    ></textarea>
                 </div>

                 <div className="flex justify-end gap-3">
                    <button onClick={() => setIsWritingReview(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
                    <button 
                       onClick={handleSubmitReview}
                       className="px-6 py-2 bg-amber-600 text-black font-bold rounded-lg hover:bg-amber-500 transition-colors"
                    >
                       Submit Review
                    </button>
                 </div>
              </div>
            )}

            {/* List */}
            {productReviews.length > 0 ? (
                productReviews.map((review) => (
                  <div key={review.id} className="bg-surface/30 p-6 rounded-xl border border-gray-800/50">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center font-bold text-gray-300">
                              {review.userName.charAt(0)}
                           </div>
                           <div>
                              <h4 className="font-bold text-white text-sm">{review.userName}</h4>
                              <div className="flex text-amber-500">
                                  {[...Array(5)].map((_, j) => <Star key={j} size={12} fill={j < review.rating ? "currentColor" : "none"} />)}
                              </div>
                           </div>
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                       <CheckCircle2 size={12} className="text-green-500" />
                       <span>Verified Purchase</span>
                    </div>
                  </div>
                ))
            ) : (
                <div className="text-center py-10 text-gray-500 border border-gray-800 rounded-xl border-dashed">
                    <p>No reviews yet. Be the first to review!</p>
                </div>
            )}
            
            {productReviews.length > 3 && (
                <button className="text-amber-500 text-sm hover:underline font-medium">View All Reviews</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;