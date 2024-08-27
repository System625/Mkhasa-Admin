import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { toast } from 'react-hot-toast';

interface Product {
    _id: string;
    name: string;
    category?: string;
    price?: number;
    checked: boolean;
}

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
    </div>
);

const FeaturedSlide = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);   

    const fetchLayers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch("https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/all/products", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) throw new Error('Failed to fetch products');
            return await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error('Failed to fetch products', { position: 'top-right' });
            return [];
        }
    };

    const fetchIndividualProduct = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch("https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/feature", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) throw new Error('Failed to fetch Featured');
            const data = await response.json();
            return data.map((item: any) => item.product._id);
        } catch (error) {
            console.error("Error fetching Featured:", error);
            toast.error('Failed to fetch Featured', { position: 'top-right' });
            return [];
        }
    };

    const processProduct = async (bestSellerIds: string[], allProducts: Product[]) => {
        const bestSellerIdSet = new Set(bestSellerIds);
        return allProducts.map(product => ({
            ...product,
            checked: bestSellerIdSet.has(product._id)
        }));
    };

    const fetchData = async () => {
        setLoadingProducts(true);
        try {
            const allProducts = await fetchLayers();
            const bestSellerIds = await fetchIndividualProduct();
            const processedProducts = await processProduct(bestSellerIds, allProducts);
            setProducts(processedProducts);
        } catch (error) {
            console.error("Error fetching and processing data:", error);
            toast.error('Failed to fetch and process data', { position: 'top-right' });
        } finally {
            setLoadingProducts(false);
        }
    };

    const handleCheckboxChange = (productId: string) => {
        setProducts(prevProducts => 
            prevProducts.map(product => 
                product._id === productId 
                    ? { ...product, checked: !product.checked } 
                    : product
            )
        );
    };

    const handleSaveAndContinue = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const selectedProductIds = products.filter(product => product.checked).map(product => product._id);
        
        try {
            const response = await fetch('https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/feature', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productIds: selectedProductIds })
            });
            
            if (!response.ok) throw new Error('Failed to update Featured');
            
            toast.success('Featured updated successfully');            
        } catch (error) {
            console.error('Error updating Featured:', error);
            toast.error('An error occurred while updating Featured', { position: 'top-right' });
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="mb-6">
                {loadingProducts ? (
                    <LoadingSpinner />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Similar Items</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.filter(product => product.checked).map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category || 'N/A'}</TableCell>
                                    <TableCell>{product.price || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            onClick={() => handleCheckboxChange(product._id)} 
                                            className="hover:bg-black hover:text-white rounded-none"
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            <Button 
                className="w-full mb-6 rounded-none bg-black" 
                onClick={handleSaveAndContinue} 
                disabled={loading}
            >
                {loading ? <LoadingSpinner /> : 'Save & Continue'}
            </Button>

            <div>
                <h2 className="text-base font-semibold text-center md:text-left bg-gray-50 py-1 pl-2 mb-6">Add Featured</h2>
                <form className="w-full md:flex-grow lg:max-w-[50%] relative mb-4 lg:mt-0" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Search By Name"
                        className="w-full px-6 py-2 rounded-full outline-none border-none bg-gray-50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        aria-label="search for product"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        type="submit"
                    >
                        <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
                    </button>
                </form>
                {loadingProducts ? (
                    <LoadingSpinner />
                ) : (
                    <ul className="space-y-2 w-full lg:w-[60%]">
                        {filteredProducts.map((product) => (
                            <li key={product._id} className="flex justify-between w-full items-center">
                                <span className='line-clamp-1'>{product.name}</span>
                                <div className='flex'>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className='hover:bg-black hover:text-white rounded-none'
                                        onClick={() => handleCheckboxChange(product._id)}
                                    >
                                        {product.checked ? 'Added' : '+'}
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default FeaturedSlide;