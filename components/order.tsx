"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Icon } from "@iconify/react";
import OrderStatistics from '@/components/orderStat';
import { Heading } from '@/components/heading';
import { SubHeading } from './subHeading';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Order {
    id: number;
    orderNumber: string;
    productImage: string;
    productName: string;
    customer: string;
    date: string;
    total: string;
    status: string;
    item: number;
    delivery: string;
}

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-red"></div>
    </div>
);

const OrderTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const productImages = {
        'Nivea Roll On': '/images/roll-on.png',
        'Nivea Body Spray': '/images/body-spray.png',
        'Marina Perfume': '/images/marina.png'
    };

    type ProductName = keyof typeof productImages;

    const generateRandomOrders = (numOrders: number): Order[] => {
        const customers = [
            'Adewale Michael',
            'Aisha Abubakar',
            'Samson James',
            'Taskane Marina',
            'Chukwuemeka Eze',
            'Oluchi Adesina',
            'Fatima Usman',
            'John Doe',
            'Jane Smith',
            'Michael Johnson',
        ];

        const statuses = ['Pending', 'Completed', 'Shipped', 'Cancelled'];

        const products = Object.keys(productImages) as ProductName[];

        const generateRandomDate = () => {
            const start = new Date(2023, 0, 1);
            const end = new Date(2024, 7, 1);
            const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        };

        const generateRandomCurrency = (min: number, max: number) => {
            return `₦${Math.floor(Math.random() * (max - min + 1) + min).toLocaleString()}`;
        };

        const orders = [];
        for (let i = 3; i <= numOrders + 2; i++) {
            const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            const randomItemCount = Math.floor(Math.random() * 10) + 1;
            const randomOrderNumber = Math.floor(Math.random() * 1000000);

            orders.push({
                id: i,
                orderNumber: `#${randomOrderNumber}`,
                productImage: productImages[randomProduct],
                productName: randomProduct,
                customer: randomCustomer,
                date: generateRandomDate(),
                total: generateRandomCurrency(1000, 20000),
                status: randomStatus,
                item: randomItemCount,
                delivery: 'Free Shipping',
            });
        }
        return orders;
    };

    useEffect(() => {
        const initialOrders: Order[] = [
            { id: 1, orderNumber: '#657892', productImage: productImages['Marina Perfume'], productName: 'Taskane Marina', customer: 'Adewale Michael', date: '25-08-2024', total: '₦15,000', status: 'Pending', item: 1, delivery: 'Free Shipping' },
            { id: 2, orderNumber: '#657893', productImage: productImages['Nivea Roll On'], productName: 'Nivea Roll On', customer: 'Aisha Abubakar', date: '25-08-2024', total: '₦2,000', status: 'Completed', item: 8, delivery: 'Free Shipping' },
        ];
        const generatedOrders = generateRandomOrders(98);
        setOrders([...initialOrders, ...generatedOrders]);
    }, []);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Adjust this value as needed

        return () => clearTimeout(timer);
    }, []);

    const { filteredOrders, displayedOrders, totalPages } = useMemo(() => {
        const filtered: Order[] = orders.filter(order =>
            order.customer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const displayed: Order[] = filtered.slice(
            (currentPage - 1) * ordersPerPage,
            currentPage * ordersPerPage
        );
        const total = Math.ceil(filtered.length / ordersPerPage);
        return { filteredOrders: filtered, displayedOrders: displayed, totalPages: total };
    }, [orders, searchTerm, currentPage, ordersPerPage]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
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

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div key={windowWidth}>
            <div className='flex justify-between items-center'>
                <div>
                    <Heading>Order</Heading>
                    <SubHeading className='flex items-center gap-1 mt-3'>
                        Category
                        <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                        Order
                    </SubHeading>
                </div>
                <div>
                    <Select>
                        <SelectTrigger className='bg-[#3B9BCE] text-white rounded-none gap-2'>
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="filter1">Pending</SelectItem>
                            <SelectItem value="filter2">Completed</SelectItem>
                            <SelectItem value="filter3">Cancelled</SelectItem>
                            <SelectItem value="filter4">Returned</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <OrderStatistics />
            <form className="w-full items-center justify-center flex relative mt-3 lg:mt-0">
                <input
                    type="text"
                    placeholder="Search By Customer Name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border p-2 mb-4 rounded w-full px-6 py-2 outline-none"
                />
                <button
                    aria-label="search for product"
                    className="absolute right-3 top-5 -translate-y-1/2"
                    type="submit"
                >
                    <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
                </button>
            </form>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-black font-semibold'>ORDER</TableHead>
                        <TableHead className='text-black font-semibold'>CUSTOMER</TableHead>
                        <TableHead className='text-black font-semibold'>DATE</TableHead>
                        <TableHead className='text-black font-semibold'>TOTAL</TableHead>
                        <TableHead className='text-black font-semibold'>PAYMENT STATUS</TableHead>
                        <TableHead className='text-black font-semibold'>ITEM</TableHead>
                        <TableHead className='text-black font-semibold'>DELIVERY METHOD</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayedOrders.map((order) => (
                        <TableRow key={order.id} className='bg-gray-100'>
                            <TableCell className='pr-10 lg:pr-0'>
                                <div className="flex items-center">
                                    <img
                                        src={order.productImage}
                                        alt={order.productName}
                                        className="w-10 h-10 mr-2"
                                    />
                                    <div>
                                        <div className='text-xs line-clamp-1 lg:text-base'>{order.productName}</div>
                                        <div className="text-xs lg:text-sm text-gray-500">{order.orderNumber}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className='text-xs lg:text-base'>{order.customer}</TableCell>
                            <TableCell className='text-xs lg:text-base'>{order.date}</TableCell>
                            <TableCell className='text-xs lg:text-base'>{order.total}</TableCell>
                            <TableCell className='text-xs lg:text-base'>{order.status}</TableCell>
                            <TableCell className='text-xs lg:text-base'>{order.item}</TableCell>
                            <TableCell className='text-xs lg:text-base'>{order.delivery}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="overflow-x-auto">
                <Pagination className="flex justify-center mt-4 min-w-max">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                aria-disabled={currentPage === 1}
                            />
                        </PaginationItem>

                        {getPageNumbers(currentPage, totalPages, windowWidth < 640 ? 2 : 5).map((page, index) => (
                            <PaginationItem key={index}>
                                {page === 'ellipsis' ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        href="#"
                                        className={currentPage === page ? 'bg-black text-white' : 'border'}
                                        onClick={() => handlePageChange(page)}
                                    >
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

export default OrderTable;
