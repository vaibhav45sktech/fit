import React, { createContext, useContext, useState, useEffect } from 'react';
import { Review } from '../types';

// Initial mock data to populate the app
const INITIAL_REVIEWS: Review[] = [
  { id: '1', productId: 1, userName: 'Rahul Sharma', rating: 5, comment: 'The fit is absolutely perfect. The Lachka fabric feels incredibly premium and breathable. It stayed crisp throughout my entire workday. Highly recommended!', date: '2 days ago' },
  { id: '2', productId: 1, userName: 'Amit Verma', rating: 4, comment: 'Great quality for the price. The wrinkle-free claim is true, I didn\'t have to iron it after washing. The black color is very deep and rich.', date: '1 week ago' },
  { id: '3', productId: 1, userName: 'Karan Patel', rating: 5, comment: 'Excellent shirt. Looks very professional and elegant. Delivery was fast too.', date: '3 weeks ago' },
  { id: '4', productId: 3, userName: 'Vikram Singh', rating: 5, comment: 'Best black shirt I own. Does not fade even after multiple washes.', date: '2 days ago' },
  { id: '5', productId: 3, userName: 'Rohan Das', rating: 4, comment: 'Fits well, slightly tight on the collar but overall good. The fabric quality is top notch.', date: '5 days ago' }
];

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getReviewsByProductId: (productId: number) => Review[];
  getProductRating: (productId: number) => { rating: number; count: number };
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const storedReviews = localStorage.getItem('fittara_reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
        localStorage.setItem('fittara_reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Math.random().toString(36).substr(2, 9),
      date: 'Just now'
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getReviewsByProductId = (productId: number) => {
    // Sort by most recent (assuming ID generation or just unshift logic in state matches this, otherwise sort by date)
    // Here we just return reversed for "newest first" logic if we append new ones to the top
    return reviews.filter(r => r.productId === productId);
  };

  const getProductRating = (productId: number) => {
    const productReviews = getReviewsByProductId(productId);
    if (productReviews.length === 0) return { rating: 0, count: 0 };
    
    const total = productReviews.reduce((sum, r) => sum + r.rating, 0);
    return {
      rating: Number((total / productReviews.length).toFixed(1)),
      count: productReviews.length
    };
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getReviewsByProductId, getProductRating }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) throw new Error('useReview must be used within a ReviewProvider');
  return context;
};