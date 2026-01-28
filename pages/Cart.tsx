import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // Address State
  const [address, setAddress] = useState({
    name: '', street: '', city: '', state: '', zip: '', phone: ''
  });

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckout(true);
  };

  const processPayment = async () => {
    // Validation
    if (!address.name || !address.phone || !address.zip) {
        toast.error("Please fill in required address details");
        return;
    }

    setProcessing(true);
    
    // Simulate Razorpay Delay
    setTimeout(() => {
        setProcessing(false);
        setIsCheckout(false);
        clearCart();
        toast.success("Order Placed Successfully! (Mock Payment)");
        navigate('/account');
    }, 3000);
  };

  if (cart.length === 0 && !isCheckout) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
         <div className="bg-surface p-6 rounded-full mb-6">
            <ShoppingBag size={48} className="text-gray-600" />
         </div>
         <h2 className="text-2xl font-serif mb-2">Your Cart is Empty</h2>
         <p className="text-gray-400 mb-8">Looks like you haven't added any premium wear yet.</p>
         <Link to="/shop" className="px-8 py-3 bg-amber-600 text-black font-bold rounded-lg hover:bg-amber-500 transition-colors">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <h1 className="text-3xl font-serif mb-8 border-b border-gray-800 pb-4">Shopping Bag ({cart.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex gap-6 bg-surface p-4 rounded-xl border border-gray-800">
               <div className="w-24 h-32 flex-shrink-0 bg-gray-900 rounded-lg overflow-hidden">
                 <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500"><Trash2 size={18} /></button>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                    <p className="text-amber-500 font-bold mt-2">₹{item.price.toLocaleString()}</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-700 rounded-md">
                        <button className="px-2 py-1 hover:bg-gray-800 text-gray-400"><Minus size={14} /></button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button className="px-2 py-1 hover:bg-gray-800 text-gray-400"><Plus size={14} /></button>
                    </div>
                 </div>
               </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface p-6 rounded-xl border border-gray-800 sticky top-24">
             <h2 className="text-xl font-serif mb-6">Order Summary</h2>
             
             <div className="space-y-3 text-sm text-gray-400 mb-6">
                <div className="flex justify-between">
                   <span>Subtotal</span>
                   <span className="text-white">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                   <span>Shipping</span>
                   <span className="text-green-500">FREE</span>
                </div>
                <div className="border-t border-gray-800 pt-3 flex justify-between text-base font-bold text-white">
                   <span>Total</span>
                   <span>₹{cartTotal.toLocaleString()}</span>
                </div>
             </div>

             {!isCheckout ? (
                <button 
                  onClick={handleCheckout}
                  className="w-full py-3 bg-amber-600 text-black font-bold rounded-lg hover:bg-amber-500 transition-colors shadow-lg shadow-amber-500/20"
                >
                   Proceed to Checkout
                </button>
             ) : (
                <div className="space-y-4 animate-fadeIn">
                   <h3 className="font-bold text-white">Shipping Address</h3>
                   <input type="text" placeholder="Full Name" className="w-full bg-black/30 border border-gray-700 rounded p-2 text-sm outline-none focus:border-amber-500" onChange={e => setAddress({...address, name: e.target.value})} />
                   <input type="text" placeholder="Phone Number" className="w-full bg-black/30 border border-gray-700 rounded p-2 text-sm outline-none focus:border-amber-500" onChange={e => setAddress({...address, phone: e.target.value})} />
                   <div className="grid grid-cols-2 gap-2">
                     <input type="text" placeholder="Pincode" className="w-full bg-black/30 border border-gray-700 rounded p-2 text-sm outline-none focus:border-amber-500" onChange={e => setAddress({...address, zip: e.target.value})} />
                     <input type="text" placeholder="City" className="w-full bg-black/30 border border-gray-700 rounded p-2 text-sm outline-none focus:border-amber-500" onChange={e => setAddress({...address, city: e.target.value})} />
                   </div>
                   <input type="text" placeholder="Full Address" className="w-full bg-black/30 border border-gray-700 rounded p-2 text-sm outline-none focus:border-amber-500" onChange={e => setAddress({...address, street: e.target.value})} />
                   
                   <button 
                      onClick={processPayment}
                      disabled={processing}
                      className="w-full py-3 bg-amber-600 text-black font-bold rounded-lg hover:bg-amber-500 transition-colors shadow-lg shadow-amber-500/20 mt-4 flex justify-center items-center"
                   >
                      {processing ? "Processing Payment..." : `Pay ₹${cartTotal.toLocaleString()}`}
                   </button>
                   <button onClick={() => setIsCheckout(false)} className="w-full text-xs text-gray-500 hover:text-white mt-2 underline">Cancel Checkout</button>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;