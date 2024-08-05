import React from 'react';

const TopSellingProductsTable = () => {
    const products = [
        {
            id: 1,
            category: 'Perfume',
            name: 'Taskane Marina',
            stock: 'In Stock',
            stockStatus: 'in-stock', // 'in-stock' or 'out-of-stock'
            totalSale: '280 pieces',
            imageUrl: '/images/marina.png',
        },
        {
            id: 2,
            category: 'Roll on',
            name: 'Nivea roll on',
            stock: 'Out of stock',
            stockStatus: 'out-of-stock',
            totalSale: '300 pieces',
            imageUrl: '/images/roll-on.png',
        },
        {
            id: 3,
            category: 'Body spray',
            name: 'Nivea body spray',
            stock: 'In Stock',
            stockStatus: 'in-stock',
            totalSale: '270 pieces',
            imageUrl: '/images/body-spray.png',
        },
        // Add more products as needed
    ];

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Top selling Product</h2>
            <div className='overflow-x-auto'>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr className='text-left'>
                            <th className="py-3 px-4 border-b">S/NO</th>
                            <th className="py-3 px-4 border-b">Category</th>
                            <th className="py-3 px-4 border-b">Product name</th>
                            <th className="py-3 px-4 border-b">Stock</th>
                            <th className="py-3 px-4 border-b">Total Sale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id} className="hover:bg-gray-100">
                                <td className="py-3 px-4 border-b text-xs md:text-sm lg:text-base">{index + 1}</td>
                                <td className="py-3 px-4 border-b text-xs md:text-sm lg:text-base">{product.category}</td>
                                <td className="py-3 px-4 border-b flex items-center space-x-3">
                                    <img src={product.imageUrl} alt={product.name} className="w-8 h-8 rounded-full object-cover" />
                                    <span className='text-xs md:text-sm lg:text-base'>{product.name}</span>
                                </td>
                                <td className={`py-3 px-4 border-b text-xs md:text-sm lg:text-base ${product.stockStatus === 'in-stock' ? 'text-green-500' : 'text-red-500'}`}>
                                    {product.stock}
                                </td>
                                <td className="py-3 px-4 border-b text-xs md:text-sm lg:text-base">{product.totalSale}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopSellingProductsTable;
