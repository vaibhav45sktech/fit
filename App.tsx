import React from 'react';
import { HashRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import DesignLab from './components/DesignLab';

const ScrollToTop = () => {
    // A simple component to scroll to top on route change
    // Using standard useEffect or useLocation approach inside Router
    // Or react-router-dom v6's <ScrollRestoration />
    return null;
}

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="flex flex-col min-h-screen bg-background text-white font-sans selection:bg-amber-500 selection:text-black">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/design-lab" element={<DesignLab />} />
                </Routes>
              </main>
              <Footer />
              <Toaster 
                position="bottom-center"
                toastOptions={{
                  style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)'
                  },
                  success: {
                    iconTheme: {
                        primary: '#f59e0b',
                        secondary: '#000'
                    }
                  }
                }}
              />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;