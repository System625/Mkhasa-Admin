import React from 'react';
import Link from 'next/link';

interface MobileSidebarProps {
  isOpen: boolean;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen }) => {
  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-100 shadow-md transition-all duration-300 z-50 lg:hidden ${isOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
      <ul className="space-y-1 pt-16 pl-5">
        <li className="p-3 font-bold text-lg"><Link href="/dashboard">Dashboard</Link></li>
        <li className="p-3"><Link href="/order">Order</Link></li>
        <li className="p-3"><Link href="/item">Item</Link></li>
        <li className="p-3"><Link href="/inventory">Inventory</Link></li>
        <li className="p-3"><Link href="/categories">Categories</Link></li>
        <li className="p-3"><Link href="/slides">Slides</Link></li>
        <li className="p-3"><Link href="/customers">Customers</Link></li>
        <li className="p-3"><Link href="/vendor">Vendor</Link></li>
        <li className="p-3"><Link href="/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default MobileSidebar;