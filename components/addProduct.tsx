"use client"

import React, { useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Heading } from '@/components/heading';

export const AddProduct = () => {
    const [images, setImages] = useState<(File | null)[]>(Array(4).fill(null));

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
        }
    };

    const renderImageSlot = (index: number) => {
        if (images[index]) {
            return (
                <img
                    src={URL.createObjectURL(images[index] as File)}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                />
            );
        }
        return (
            <label className="w-full h-full flex items-center justify-center cursor-pointer">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="hidden"
                />
                <span className="text-blue-500">+</span>
            </label>
        );
    };

    return (
        <>
            <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center mb-4">
                <Heading>Add Product</Heading>
                <div className='flex justify-evenly gap-4'>
                    <Button className='rounded-none w-40 border border-app-red text-app-red bg-white text-xs md:text-base'>Discard Changes</Button>
                    <Button className='rounded-none w-40 bg-[#3B9BCE] text-xs md:text-base'>Add Product</Button>
                </div>
            </div>
            <div className="py-4 md:py-8 grid gap-10 lg:grid-cols-12">
                {/* Left Section: General Information */}
                <div className="lg:col-span-7">
                    <Card className="mb-8 border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">General Information</h2>
                            <form className="grid gap-5">
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Product Name</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Description</Label>
                                    <Textarea className='h-32' />
                                </div>
                                <div>
                                    <Select>
                                        <SelectTrigger className='bg-transparent rounded-sm'>
                                            <SelectValue placeholder="Add Series" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="series1">Series 1</SelectItem>
                                            <SelectItem value="series2">Series 2</SelectItem>
                                            <SelectItem value="series3">Series 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Name</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Serial bar code</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Base Price</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Discount Percentage (%)</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mb-8 border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                            <form className="grid gap-5">
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Base Price</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Discount Percentage (%)</Label>
                                    <Input type="text" className='bg-white border-gray-200 w-1/2' />
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mb-8 border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">Inventory</h2>
                            <form className="grid grid-cols-3 gap-5">
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">SKU</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Barcode</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Quantity</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mb-8 border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">Notes</h2>
                            <form className="grid gap-5">
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Top Notes</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Middle Notes</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Base Notes</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mb-8 border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">Other</h2>
                            <form className="grid gap-5">
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Appeal</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Type</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Volume</Label>
                                    <Input type="text" className='bg-white border-gray-200' />
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Section: Product Media and Category */}
                <div className="lg:col-span-5">
                    <Card className="mb-8 py-4 border-none bg-gray-50">
                        <CardContent>
                            <h2 className="text-xl font-semibold mb-4">Product Media</h2>
                            <p className="text-gray-500 mb-4">Photo Product</p>
                            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg bg-white">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {images.map((_, index) => (
                                        <div key={index} className="aspect-square border border-gray-300">
                                            {renderImageSlot(index)}
                                        </div>
                                    ))}
                                </div>
                                <div className="relative">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        style={{ color: '#3B9BCE', borderColor: '#33B9BCE' }}
                                    >
                                        Add More Images
                                    </Button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleImageUpload(e, images.findIndex(img => img === null))
                                        }
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='py-4 border-none bg-gray-50'>
                        <CardContent>
                            <h2 className="text-xl font-semibold mb-4">Category</h2>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="perfumes">Perfumes</SelectItem>
                                    <SelectItem value="roll-on">Roll On</SelectItem>
                                    <SelectItem value="air-freshener">Air Freshener</SelectItem>
                                    <SelectItem value="body-mist">Body Mist</SelectItem>
                                    <SelectItem value="reed-diffuser">Reed Diffuser</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};
