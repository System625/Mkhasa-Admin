"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heading } from '@/components/heading';
import { SubHeading } from '@/components/subHeading';
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    category: string;
    inventory: {
        quantity: number;
        unit: string;
        total: number;
    };
}

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
    </div>
);

const InventoryTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const productsPerPage = 10;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch data from the API endpoint
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/proxy?path=all/products');
                const data = await response.json();

                // Map the response to match the Product interface
                const formattedProducts = data.map((item: any) => ({
                    id: item._id,
                    name: item.name,
                    price: `₦${item.price}`,
                    imageUrl: item.mainImage,
                    category: item.category,
                    inventory: {
                        quantity: 0, // Default value, you can update it as needed
                        unit: "Pieces", // Default value, you can update it as needed
                        total: 0, // Default value, you can update it as needed
                    },
                }));

                setProducts(formattedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleQuantityChange = (id: string, quantity: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, inventory: { ...product.inventory, quantity } } : product
            )
        );
    };

    const handleUnitChange = (id: string, unit: string) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, inventory: { ...product.inventory, unit } } : product
            )
        );
    };

    const handleTotalChange = (id: string, total: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, inventory: { ...product.inventory, total } } : product
            )
        );
    };

    const handleRefresh = async () => {
        // Implement your refresh logic here
        setLoading(true);
            try {
                const response = await fetch('/api/proxy?path=all/products');
                const data = await response.json();

                // Map the response to match the Product interface
                const formattedProducts = data.map((item: any) => ({
                    id: item._id,
                    name: item.name,
                    price: `₦${item.price}`,
                    imageUrl: item.mainImage,
                    category: item.category,
                    inventory: {
                        quantity: 0, // Default value, you can update it as needed
                        unit: "Pieces", // Default value, you can update it as needed
                        total: 0, // Default value, you can update it as needed
                    },
                }));

                setProducts(formattedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
    };

    // Pagination logic
    const indexOfLastVendor = currentPage * productsPerPage;
    const indexOfFirstVendor = indexOfLastVendor - productsPerPage;

    const { filteredOrders, displayedProducts, totalPages } = useMemo(() => {
        const filtered: Product[] = products.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const displayed: Product[] = filtered.slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
        );
        const total = Math.ceil(filtered.length / productsPerPage);
        return { filteredOrders: filtered, displayedProducts: displayed, totalPages: total };
    }, [products, searchTerm, currentPage, productsPerPage]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getPageNumbers = (currentPage: number, totalPages: number, maxVisible: number): (number | 'ellipsis')[] => {
        if (totalPages <= maxVisible) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(end - maxVisible + 1, 1);
        }

        const pages: (number | 'ellipsis')[] = Array.from({ length: end - start + 1 }, (_, i) => start + i);

        if (start > 1) {
            pages.unshift(1);
            if (start > 2) pages.splice(1, 0, 'ellipsis' as const);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('ellipsis' as const);
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <Heading>Inventory</Heading>
                    <SubHeading className='flex items-center gap-1 mt-3'>
                        Category
                        <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                        Inventory
                    </SubHeading>
                </div>
                <div>
                    <Button className='rounded-none bg-[#3B9BCE] w-28 text-xs md:text-base md:w-full'><Link href="/dashboard/add-product">Layer With</Link></Button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center my-4 md:mt-0">
                <h2 className="text-xl font-semibold">List Of All Products</h2>
                <div className="flex gap-2 items-center">
                    <h2 className="text-lg text-gray-400">Recently Update</h2>
                    <Icon icon="bx:refresh" className="cursor-pointer" onClick={handleRefresh} fontSize={24} />
                </div>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-center">Inventory</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayedProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <div className="flex items-center pr-6">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="mr-2 w-10 h-10"
                                        />
                                        <div>
                                            <p className="text-sm line-clamp-1 md:text-base">{product.name}</p>
                                            <span className="text-gray-400 line-clamp-1 text-xs">{product.category}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs md:text-base">{product.price}</TableCell>
                                <TableCell className="flex justify-center items-center gap-2">
                                    <div className="flex items-center border pr-2 rounded-md h-10">
                                        <Input
                                            type="number"
                                            value={product.inventory.quantity}
                                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                            className="w-10 pr-0 border-none h-9 text-xs md:text-base"
                                        />
                                        <Select
                                            value={product.inventory.unit}
                                            onValueChange={(value: string) => handleUnitChange(product.id, value)}
                                        >
                                            <SelectTrigger className="w-20 border-none h-9 pr-0 text-xs md:text-base">
                                                <SelectValue>{product.inventory.unit}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pieces">Pieces</SelectItem>
                                                <SelectItem value="Bottles">Bottles</SelectItem>
                                                <SelectItem value="Cans">Cans</SelectItem>
                                                <SelectItem value="Kg">Kg</SelectItem>
                                                <SelectItem value="Grams">Grams</SelectItem>
                                                <SelectItem value="Tubes">Tubes</SelectItem>
                                                <SelectItem value="Cartons">Cartons</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center border pr-2 rounded-md h-10">
                                        <Input
                                            type="number"
                                            value={product.inventory.total}
                                            onChange={(e) => handleTotalChange(product.id, parseInt(e.target.value))}
                                            className="w-10 pr-0 border-none h-9 text-xs md:text-base"
                                        />
                                        <span className="text-xs md:text-base">Total</span>
                                    </div>
                                    <Button
                                        onClick={() => console.log("Add action for product", product.id)}
                                        className='bg-[#3B9BCE] text-xs md:text-base'
                                    >
                                        Add
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <div className="overflow-x-auto">
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                aria-disabled={currentPage === 1}
                            />
                        </PaginationItem>
                        {getPageNumbers(currentPage, totalPages, 5).map((page, index) => (
                            <PaginationItem key={index}>
                                {page === 'ellipsis' ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink href="#" onClick={() => handlePageChange(page as number)}>
                                        {page}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                                aria-disabled={currentPage === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default InventoryTable;
