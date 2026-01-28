import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, User as UserIcon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Account: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="bg-surface rounded-xl p-6 h-fit border border-gray-800">
             <div className="flex items-center gap-4 mb-8">
                {user.avatar ? <img src={user.avatar} className="w-12 h-12 rounded-full border border-amber-500" /> : <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center"><UserIcon /></div>}
                <div>
                   <h3 className="font-bold text-white">{user.name}</h3>
                   <p className="text-xs text-gray-500">{user.email}</p>
                </div>
             </div>
             <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-amber-600/10 text-amber-500 border border-amber-500/20 rounded-lg flex items-center gap-2 font-medium">
                   <Package size={18} /> Orders
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-400 hover:text-white flex items-center gap-2">
                   <UserIcon size={18} /> Profile Details
                </button>
                <button onClick={() => { signOut(); navigate('/'); }} className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg flex items-center gap-2 mt-8">
                   <LogOut size={18} /> Sign Out
                </button>
             </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
             <h2 className="text-2xl font-serif mb-6">Order History</h2>
             
             {/* Mock Orders */}
             <div className="space-y-4">
                <div className="bg-surface border border-gray-800 rounded-xl p-6">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <p className="text-sm text-gray-400">Order #ORD-2024-8832</p>
                         <p className="text-xs text-gray-500">Placed on Oct 15, 2024</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-500 text-xs rounded-full font-bold">Delivered</span>
                   </div>
                   <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-gray-900 rounded overflow-hidden">
                         <img src="https://picsum.photos/seed/gurkha1/100/100" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <h4 className="font-medium text-white">The Royal Gurkha Pant - Onyx</h4>
                         <p className="text-sm text-gray-400">Qty: 1 | Size: 32</p>
                      </div>
                      <div className="ml-auto font-bold text-white">₹8,999</div>
                   </div>
                </div>
                
                <div className="bg-surface border border-gray-800 rounded-xl p-6">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <p className="text-sm text-gray-400">Order #ORD-2024-8541</p>
                         <p className="text-xs text-gray-500">Placed on Sep 22, 2024</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-500 text-xs rounded-full font-bold">Delivered</span>
                   </div>
                   <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-gray-900 rounded overflow-hidden">
                         <img src="https://picsum.photos/seed/shirt1/100/100" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <h4 className="font-medium text-white">Midnight Silk Ceremonial Shirt</h4>
                         <p className="text-sm text-gray-400">Qty: 1 | Size: L</p>
                      </div>
                      <div className="ml-auto font-bold text-white">₹12,999</div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Account;