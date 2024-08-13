"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

interface Product {
    id: number;
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

const InventoryTable = () => {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: "Taskane Marina", category: "Perfume", imageUrl: '/images/marina.png', price: "₦15,000", inventory: { quantity: 3, unit: "Pieces", total: 12 } },
        { id: 2, name: "Nivea Roll On", category: "Roll On", imageUrl: '/images/roll-on.png', price: "₦3,000", inventory: { quantity: 3, unit: "Cans", total: 3 } },
        { id: 3, name: "Nivea Body Spray", category: "Spray", imageUrl: '/images/body-spray.png', price: "₦5,000", inventory: { quantity: 3, unit: "Kg", total: 6 } },
        { id: 4, name: "Nivea Body Spray", category: "Spray", imageUrl: '/images/body-spray.png', price: "₦5,000", inventory: { quantity: 3, unit: "Grams", total: 3 } },
        { id: 5, name: "Nivea Body Spray", category: "Spray", imageUrl: '/images/body-spray.png', price: "₦5,000", inventory: { quantity: 5, unit: "Tubes", total: 16 } },
        { id: 6, name: "Nivea Body Spray", category: "Spray", imageUrl: '/images/body-spray.png', price: "₦5,000", inventory: { quantity: 5, unit: "Cartons", total: 16 } },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const handleQuantityChange = (id: number, quantity: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, inventory: { ...product.inventory, quantity } } : product
            )
        );
    };

    const handleUnitChange = (id: number, unit: string) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, inventory: { ...product.inventory, unit } } : product
            )
        );
    };

    const handleTotalChange = (id: number, total: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, inventory: { ...product.inventory, total } } : product
            )
        );
    };

    const handleRefresh = () => {
        // Implement your refresh logic here
        console.log("Refreshed");
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getPageNumbers = () => {
        const totalPages = Math.ceil(products.length / productsPerPage);
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const displayedProducts = products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <div className="pt-5">
            <div className="flex flex-col md:flex-row justify-between items-center my-4 md:mt-0">
                <h2 className="text-xl font-semibold">Main warehouse</h2>
                <div className="flex gap-2 items-center">
                    <h2 className="text-lg text-gray-400">Recently Update</h2>
                    <Icon icon="bx:refresh" className="cursor-pointer" onClick={handleRefresh} fontSize={24} />
                </div>
            </div>

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
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="mr-2"
                                        width={40}
                                        height={40}
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

            <Pagination className="flex justify-center mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        />
                    </PaginationItem>

                    {getPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                className={currentPage === page ? "bg-gray-100" : ""}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(products.length / productsPerPage)))}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default InventoryTable;
