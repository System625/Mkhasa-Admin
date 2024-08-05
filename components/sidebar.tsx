import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="hidden lg:block w-64 bg-gray-100 shadow-md h-full overflow-y-auto">
      <ul className="space-y-1">
        <li>
          <Link href="/dashboard">
            <span className="p-3 font-bold text-lg block">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/order">
            <span className="p-3 cursor-pointer hover:bg-gray-200 block">Order</span>
          </Link>
        </li>
        <li>
          <Link href="/item">
            <span className="p-3 cursor-pointer hover:bg-gray-200 block">Item</span>
          </Link>
        </li>
        <li>
          <Link href="/inventory">
            <span className="p-3 cursor-pointer hover:bg-gray-200 block">Inventory</span>
          </Link>
        </li>
        <li>
          <Link href="/categories">
            <span className="p-3 cursor-pointer hover:bg-gray-200 block">Categories</span>
          </Link>
        </li>
        <li>
          <Link href="/slides">
            <span className="p-3 cursor-pointer hover:bg-gray-200 block">Slides</span>
          </Link>
        </li>
        <li>
          <Link href="/customers">
            <span className="p-3 cursor-pointer hover:bg-gray-200 block">Customers</span>
          </Link>
        </li>
        <li>
          <Link href="/vendor">
            <span className="p-3 cursor-pointer hover:bg-gray-200 block">Vendor</span>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <span className="p-3 cursor-pointer hover:bg-gray-200 block">Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
