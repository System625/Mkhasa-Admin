"use client"

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { toast } from 'react-hot-toast';

interface ProductDetails {
    name: string;
    category: string;
    price: number;
    // Add other properties as needed
}

interface Product {
    _id: string;
    name: string;
    product?: ProductDetails;
    category?: string;
    price?: number;
    isBestSeller?: boolean;
}

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
    </div>
);

const BestSellersSlide = () => {
    const [bestSellers, setBestSellers] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingBestSellers, setLoadingBestSellers] = useState(true);
    const [loadingAllProducts, setLoadingAllProducts] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            console.log('Starting initial data load');
            await fetchBestSellers();
            await fetchAllProducts();
            console.log('Finished initial data load');
        };
    
        loadInitialData();
    }, []);   

    const fetchBestSellers = async () => {
        setLoadingBestSellers(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/bestsellers', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch best sellers');
            const data = await response.json();
            console.log('Fetched best sellers from server:', data);
            if (Array.isArray(data) && data.length > 0) {
                setBestSellers(data);
                
                // Update allProducts with the latest best seller information
                setAllProducts(prevProducts => {
                    return prevProducts.map(product => ({
                        ...product,
                        isBestSeller: data.some((bs: Product) => bs._id === product._id)
                    }));
                });
            }
        } catch (error) {
            console.error('Error fetching best sellers:', error);
            toast.error('Failed to fetch best sellers');
        } finally {
            setLoadingBestSellers(false);
        }
    };

    const fetchAllProducts = async () => {
        setLoadingAllProducts(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/all/products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch all products');
            const data = await response.json();
            // Mark best sellers
            const productsWithBestSellerFlag = data.map((product: Product) => ({
                ...product,
                isBestSeller: bestSellers.some(bs => bs._id === product._id)
            }));
            setAllProducts(productsWithBestSellerFlag);
        } catch (error) {
            console.error('Error fetching all products:', error);
            toast.error('Failed to fetch all products');
        } finally {
            setLoadingAllProducts(false);
        }
    };

    const addBestSeller = (product: Product) => {
        if (!product.isBestSeller) {
            const newBestSeller: Product = {
                _id: product._id,
                name: product.name,
                product: {
                    name: product.name,
                    category: product.category || 'N/A',
                    price: product.price || 0,
                },
                isBestSeller: true
            };
            setBestSellers(prevBestSellers => [...prevBestSellers, newBestSeller]);
            setAllProducts(prevProducts =>
                prevProducts.map(p =>
                    p._id === product._id ? { ...p, isBestSeller: true } : p
                )
            );
        } else {
            toast.error('This product is already in the Best Sellers list');
        }
    };
    
    const removeBestSeller = (productId: string) => {
        setBestSellers(prevBestSellers => prevBestSellers.filter(item => item._id !== productId));
        setAllProducts(prevProducts =>
            prevProducts.map(p =>
                p._id === productId ? { ...p, isBestSeller: false } : p
            )
        );
    };

    const handleSaveAndContinue = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
    
        const currentBestSellers = bestSellers.map(item => item._id);
        const requestBody = { productIds: currentBestSellers };
    
        try {
            const response = await fetch('https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/bestsellers', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!response.ok) {
                throw new Error('Failed to save best sellers');
            }
    
            toast.success('Best sellers saved successfully');
            
            // After successful save, fetch the updated list from the server
            await fetchBestSellers();
            
        } catch (error) {
            console.error('Error saving best sellers:', error);
            toast.error('An error occurred while saving best sellers');
        } finally {
            setLoading(false);
        }
    };
    


    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="mb-6">
                {loadingBestSellers ? (
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
                            {bestSellers.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.product ? item.product.name : item.name}</TableCell>
                                    <TableCell>{item.product ? item.product.category : 'N/A'}</TableCell>
                                    <TableCell>{item.product ? item.product.price : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Button size="sm" variant="outline" onClick={() => removeBestSeller(item._id)} className="hover:bg-black hover:text-white rounded-none">Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            <Button className="w-full mb-6 rounded-none bg-black" onClick={handleSaveAndContinue} disabled={loading}>
                {loading ? <LoadingSpinner /> : 'Save & Continue'}
            </Button>

            <div>
                <h2 className="text-base font-semibold text-center md:text-left bg-gray-50 py-1 pl-2 mb-6">Add Best Sellers</h2>
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
                {loadingAllProducts ? (
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
                                        onClick={() => addBestSeller(product)}
                                        disabled={product.isBestSeller}
                                    >
                                        {product.isBestSeller ? 'Added' : '+'}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => removeBestSeller(product._id)}
                                        className="ml-5 hover:bg-black hover:text-white rounded-none"
                                    >
                                        -
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

export default BestSellersSlide;
