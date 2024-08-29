"use client"

import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Heading } from '@/components/heading';
import { toast } from 'react-hot-toast';

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    mainImage: string;
    firstImage: string;
    secondImage: string;
    thirdImage: string;
    brand: string;
    sku: string;
    quantityInStock: number;
    type: string;
    topNotes: string;
    middleNotes: string;
    baseNotes: string;
    volume: string;
    serialBarcode: string;
    barcode: string;
    discountPercentage: number;
    appeal: string;
    manufacturer: string;
    serialName: string;
}

interface EditProductProps {
    productId: string;
}

type Category = {
    _id: string;
    name: string;
};

const EditProduct: React.FC<EditProductProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<Partial<Product>>({});
    const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter();
    const { data: session } = useSession();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (productId && session?.user?._id) {
            fetchProduct();
            fetchCategories();
        }
    }, [productId, session]);

    const fetchProduct = async () => {
        if (!session?.user?._id) {
            console.error('User ID is missing');
            toast.error('Authentication error');
            return;
        }
    
        const url = `https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/product/${productId}`;
        console.log('Fetching product from:', url);
    
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session.user._id}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched product data:', data);
                setProduct(data);
            } else {
                const errorText = await response.text();
                console.error('Failed to fetch product. Status:', response.status, 'Error:', errorText);
                toast.error(`Failed to fetch product: ${response.status} ${errorText}`);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Error fetching product');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/proxy?path=all/category');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setProduct(prev => prev ? {
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        } : null);
        if (errors[name as keyof Product]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setProduct(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>, fieldName: keyof Product) => {
        const file = event.target.files?.[0];
        if (file) {
            setProduct(prev => prev ? {
                ...prev,
                [fieldName]: URL.createObjectURL(file),
            } : null);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Product> = {};
        if (!product) return false;

        if (!product.name) newErrors.name = "Name is required";
        if (!product.description) newErrors.description = "Description is required";
        if (!product.price || isNaN(Number(product.price))) newErrors.price = "Valid price is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product || !session?.user?._id) return;
        if (!validateForm()) {
            toast.error("Please correct the errors in the form");
            return;
        }
    
        const url = `https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/product/${session.user._id}/${productId}`;
        
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${session.user._id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
    
            if (response.ok) {
                toast.success('Product updated successfully');
                router.push('/dashboard/inventory');
            } else {
                const errorText = await response.text();
                console.error('Failed to update product. Status:', response.status, 'Error:', errorText);
                toast.error(`Failed to update product: ${response.status} ${errorText}`);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product');
        }
    };

    const handleDiscardChanges = () => {
        fetchProduct(); // Re-fetch the original product data
        setErrors({});
    };

    const triggerSubmit = () => {
        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center mb-4">
                <Heading>Edit Product</Heading>
                <div className='flex justify-evenly gap-4'>
                    <Button onClick={handleDiscardChanges} className='rounded-none w-40 border border-app-red text-app-red bg-white text-xs md:text-base'>Discard Changes</Button>
                    <Button onClick={triggerSubmit} className='rounded-none w-40 bg-[#3B9BCE] text-xs md:text-base'>Update Product</Button>
                </div>
            </div>
            <div className="py-4 md:py-8 grid gap-10 lg:grid-cols-12">
                {/* Left Section: General Information */}
                <div className="lg:col-span-7">
                    <Card className="mb-8 border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">General Information</h2>
                            <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Product Name</Label>
                                    <Input
                                        name="name"
                                        value={product.name}
                                        onChange={handleInputChange}
                                        type="text"
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Description</Label>
                                    <Textarea
                                        name="description"
                                        value={product.description}
                                        onChange={handleInputChange}
                                        className='h-32'
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Serial Name</Label>
                                    <Input
                                        type="text"
                                        name="serialName"
                                        value={product.serialName}
                                        onChange={handleInputChange}
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Serial bar code</Label>
                                    <Input
                                        type="text"
                                        name="serialBarcode"
                                        value={product.serialBarcode}
                                        onChange={handleInputChange}
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Barcode</Label>
                                    <Input
                                        type="text"
                                        name="barcode"
                                        value={product.barcode}
                                        onChange={handleInputChange}
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Category</Label>
                                    <Select
                                        value={product.category}
                                        onValueChange={(value) => handleSelectChange("category", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category._id} value={category.name}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Pricing, Stock, and Discounts */}
                    <Card className="border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">Pricing, Stock, and Discounts</h2>
                            <form className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Price</Label>
                                    <Input
                                        name="price"
                                        value={product.price}
                                        onChange={handleInputChange}
                                        type="number"
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Discount Percentage</Label>
                                    <Input
                                        name="discountPercentage"
                                        value={product.discountPercentage}
                                        onChange={handleInputChange}
                                        type="number"
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Quantity in Stock</Label>
                                    <Input
                                        name="quantityInStock"
                                        value={product.quantityInStock}
                                        onChange={handleInputChange}
                                        type="number"
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Section: Product Images, Type, Notes, Volume */}
                <div className="lg:col-span-5">
                    <Card className="border-none bg-gray-50 mb-8">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">Product Images</h2>
                            <form className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Main Image</Label>
                                    <Input
                                        type="file"
                                        name="mainImage"
                                        onChange={(e) => handleImageUpload(e, 'mainImage')}
                                        accept="image/*"
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">First Image</Label>
                                    <Input
                                        type="file"
                                        name="firstImage"
                                        onChange={(e) => handleImageUpload(e, 'firstImage')}
                                        accept="image/*"
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Second Image</Label>
                                    <Input
                                        type="file"
                                        name="secondImage"
                                        onChange={(e) => handleImageUpload(e, 'secondImage')}
                                        accept="image/*"
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Third Image</Label>
                                    <Input
                                        type="file"
                                        name="thirdImage"
                                        onChange={(e) => handleImageUpload(e, 'thirdImage')}
                                        accept="image/*"
                                    />
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">Other Information</h2>
                            <form className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Type</Label>
                                    <Input
                                        type="text"
                                        name="type"
                                        value={product.type}
                                        onChange={handleInputChange}
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Top Notes</Label>
                                    <Input
                                        type="text"
                                        name="topNotes"
                                        value={product.topNotes}
                                        onChange={handleInputChange}
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Middle Notes</Label>
                                    <Input
                                        type="text"
                                        name="middleNotes"
                                        value={product.middleNotes}
                                        onChange={handleInputChange}
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Base Notes</Label>
                                    <Input
                                        type="text"
                                        name="baseNotes"
                                        value={product.baseNotes}
                                        onChange={handleInputChange}
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Volume</Label>
                                    <Input
                                        type="text"
                                        name="volume"
                                        value={product.volume}
                                        onChange={handleInputChange}
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Brand</Label>
                                    <Input
                                        type="text"
                                        name="brand"
                                        value={product.brand}
                                        onChange={handleInputChange}
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Manufacturer</Label>
                                    <Input
                                        type="text"
                                        name="manufacturer"
                                        value={product.manufacturer}
                                        onChange={handleInputChange}
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Appeal</Label>
                                    <Input
                                        type="text"
                                        name="appeal"
                                        value={product.appeal}
                                        onChange={handleInputChange}
                                        className='bg-white border-gray-200'
                                    />
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default EditProduct;
