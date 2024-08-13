'use client'

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heading } from '@/components/heading';
import { Icon } from '@iconify/react';

interface Product {
    id: string;
    name: string;
    category: string;
    stock: 'In Stock' | 'Out of stock';
    totalSale: number;
}

const initialProducts: Product[] = [
    { id: '1', name: 'Nivea Perfume', category: 'Perfume', stock: 'In Stock', totalSale: 540 },
    { id: '2', name: 'Nivea Roll On', category: 'Roll on', stock: 'Out of stock', totalSale: 680 },
    { id: '3', name: 'Nivea Body Spray', category: 'Body spray', stock: 'In Stock', totalSale: 980 },
];

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
    </div>
);

export default function SlideManagement() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [bestSellers, setBestSellers] = useState<string[]>([]);
    const [selectedSlide, setSelectedSlide] = useState<string>('best-sellers');
    const [isLoading, setIsLoading] = useState(false);

    const addBestSeller = (value: string) => {
        if (!bestSellers.includes(value)) {
            setBestSellers([...bestSellers, value]);
        }
    };

    const removeBestSeller = (value: string) => {
        setBestSellers(bestSellers.filter(seller => seller !== value));
    };

    const handleSlideChange = (newSlide: string) => {
        setIsLoading(true);
        setSelectedSlide(newSlide);
        setTimeout(() => {
            setIsLoading(false);
        }, 500); // Adjust this time as needed
    };

    return (
        <div>
            <main>
                {/* Slide Selection Dropdown */}
                <div className="mb-6 flex justify-between">
                    <div>
                        <Heading>Slides</Heading>
                    </div>
                    <div>
                        <Select onValueChange={handleSlideChange} defaultValue="best-sellers">
                            <SelectTrigger className='bg-gray-100 rounded-none w-36 font-semibold'>
                                <SelectValue placeholder="Select slide" />
                            </SelectTrigger>
                            <SelectContent className='rounded-none bg-gray-100'>
                                <SelectItem value="new-in">New In</SelectItem>
                                <SelectItem value="best-sellers">Best Sellers</SelectItem>
                                <SelectItem value="similar-items">Similar Items</SelectItem>
                                <SelectItem value="can-be-layered-with">Can Be Layered With</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {/* Conditional Rendering based on Selected Slide */}
                        {selectedSlide === 'best-sellers' && (
                            <>
                                <div className="mb-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Similar Items</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Stock</TableHead>
                                                <TableHead>Total sale</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {products.map((product) => (
                                                <TableRow key={product.id}>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell>{product.category}</TableCell>
                                                    <TableCell className={product.stock === 'In Stock' ? 'text-green-500' : 'text-red-500'}>
                                                        {product.stock}
                                                    </TableCell>
                                                    <TableCell>{product.totalSale} pieces</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <Button className="w-full mb-6 rounded-none bg-black">Save & Continue</Button>

                                <div>
                                    <h2 className="text-base font-semibold text-center md:text-left bg-gray-50 py-1 pl-2 mb-6">Add {selectedSlide === 'best-sellers' ? 'Best Sellers' : selectedSlide === "new-in" ? "New In" : selectedSlide === "can-be-layered-with" ? "Can Be Layered With" : 'Similar Items'}</h2>
                                    <form className="w-full md:flex-grow lg:max-w-80 relative mb-4 lg:mt-0">
                                        <Input
                                            id="search"
                                            name="search"
                                            type="text"
                                            placeholder="Search By Name"
                                            className="w-full px-6 py-2 rounded-full outline-none border-none bg-gray-50"
                                        />
                                        <button
                                            aria-label="search for product"
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            type="submit"
                                        >
                                            <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
                                        </button>
                                    </form>
                                    <ul className="space-y-2 lg:w-[28%]">
                                        {['Taskane Marina', 'Oud Zafran', 'Supremacy Noir'].map((item) => (
                                            <li key={item} className="flex justify-between items-center">
                                                <span>{item}</span>
                                                <div>
                                                    <Button size="sm" variant="outline" className='hover:bg-black hover:text-white rounded-none' onClick={() => addBestSeller(item)}>+</Button>
                                                    <Button size="sm" variant="outline" onClick={() => removeBestSeller(item)} className="ml-5 hover:bg-black hover:text-white rounded-none">-</Button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}

                        {selectedSlide === 'new-in' && (
                            <>
                                <div className="mb-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Similar Items</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Stock</TableHead>
                                                <TableHead>Total sale</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {products.map((product) => (
                                                <TableRow key={product.id}>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell>{product.category}</TableCell>
                                                    <TableCell className={product.stock === 'In Stock' ? 'text-green-500' : 'text-red-500'}>
                                                        {product.stock}
                                                    </TableCell>
                                                    <TableCell>{product.totalSale} pieces</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <Button className="w-full mb-6 rounded-none bg-black">Save & Continue</Button>

                                <div>
                                    <h2 className="text-base font-semibold text-center md:text-left bg-gray-50 py-1 pl-2 mb-6">Add {selectedSlide === 'new-in' ? 'New In' : selectedSlide === "best-sellers" ? "Best Sellers" : selectedSlide === "can-be-layered-with" ? "Can Be Layered With" : 'Similar Items'}</h2>
                                    <form className="w-full md:flex-grow lg:max-w-80 relative mb-4 lg:mt-0">
                                        <Input
                                            id="search"
                                            name="search"
                                            type="text"
                                            placeholder="Search By Name"
                                            className="w-full px-6 py-2 rounded-full outline-none border-none bg-gray-50"
                                        />
                                        <button
                                            aria-label="search for product"
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            type="submit"
                                        >
                                            <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
                                        </button>
                                    </form>
                                    <ul className="space-y-2 lg:w-[28%]">
                                        {['Taskane Marina', 'Oud Zafran', 'Supremacy Noir'].map((item) => (
                                            <li key={item} className="flex justify-between items-center">
                                                <span>{item}</span>
                                                <div>
                                                    <Button size="sm" variant="outline" className='hover:bg-black hover:text-white rounded-none' onClick={() => addBestSeller(item)}>+</Button>
                                                    <Button size="sm" variant="outline" onClick={() => removeBestSeller(item)} className="ml-5 hover:bg-black hover:text-white rounded-none">-</Button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}

                        {selectedSlide === 'can-be-layered-with' && (
                            <>
                                <div className="mb-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Similar Items</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Stock</TableHead>
                                                <TableHead>Total sale</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {products.map((product) => (
                                                <TableRow key={product.id}>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell>{product.category}</TableCell>
                                                    <TableCell className={product.stock === 'In Stock' ? 'text-green-500' : 'text-red-500'}>
                                                        {product.stock}
                                                    </TableCell>
                                                    <TableCell>{product.totalSale} pieces</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <Button className="w-full mb-6 rounded-none bg-black">Save & Continue</Button>

                                <div>
                                    <h2 className="text-base font-semibold text-center md:text-left bg-gray-50 py-1 pl-2 mb-6">Add {selectedSlide === 'can-be-layered-with' ? 'Can Be Layered With' : selectedSlide === "new-in" ? "New In" : selectedSlide === "best-sellers" ? "Best Sellers" : 'Similar Items'}</h2>
                                    <form className="w-full md:flex-grow lg:max-w-80 relative mb-4 lg:mt-0">
                                        <Input
                                            id="search"
                                            name="search"
                                            type="text"
                                            placeholder="Search By Name"
                                            className="w-full px-6 py-2 rounded-full outline-none border-none bg-gray-50"
                                        />
                                        <button
                                            aria-label="search for product"
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            type="submit"
                                        >
                                            <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
                                        </button>
                                    </form>
                                    <ul className="space-y-2 lg:w-[28%]">
                                        {['Taskane Marina', 'Oud Zafran', 'Supremacy Noir'].map((item) => (
                                            <li key={item} className="flex justify-between items-center">
                                                <span>{item}</span>
                                                <div>
                                                    <Button size="sm" variant="outline" className='hover:bg-black hover:text-white rounded-none' onClick={() => addBestSeller(item)}>+</Button>
                                                    <Button size="sm" variant="outline" onClick={() => removeBestSeller(item)} className="ml-5 hover:bg-black hover:text-white rounded-none">-</Button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}

                        {selectedSlide === 'similar-items' && (
                            <>
                                <div className="mb-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Similar Items</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Stock</TableHead>
                                                <TableHead>Total sale</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {products.map((product) => (
                                                <TableRow key={product.id}>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell>{product.category}</TableCell>
                                                    <TableCell className={product.stock === 'In Stock' ? 'text-green-500' : 'text-red-500'}>
                                                        {product.stock}
                                                    </TableCell>
                                                    <TableCell>{product.totalSale} pieces</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <Button className="w-full mb-6 rounded-none bg-black">Save & Continue</Button>

                                <div>
                                    <h2 className="text-base font-semibold text-center md:text-left bg-gray-50 py-1 pl-2 mb-6">Add {selectedSlide === 'similar-items' ? 'Similar Items' : selectedSlide === "new-in" ? "New In" : selectedSlide === "can-be-layered-with" ? "Can Be Layered With" : 'Best Sellers'}</h2>
                                    <form className="w-full md:flex-grow lg:max-w-80 relative mb-4 lg:mt-0">
                                        <Input
                                            id="search"
                                            name="search"
                                            type="text"
                                            placeholder="Search By Name"
                                            className="w-full px-6 py-2 rounded-full outline-none border-none bg-gray-50"
                                        />
                                        <button
                                            aria-label="search for product"
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            type="submit"
                                        >
                                            <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
                                        </button>
                                    </form>
                                    <ul className="space-y-2 lg:w-[28%]">
                                        {['Taskane Marina', 'Oud Zafran', 'Supremacy Noir'].map((item) => (
                                            <li key={item} className="flex justify-between items-center">
                                                <span>{item}</span>
                                                <div>
                                                    <Button size="sm" variant="outline" className='hover:bg-black hover:text-white rounded-none' onClick={() => addBestSeller(item)}>+</Button>
                                                    <Button size="sm" variant="outline" onClick={() => removeBestSeller(item)} className="ml-5 hover:bg-black hover:text-white rounded-none">-</Button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
