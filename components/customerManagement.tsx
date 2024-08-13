"use client";

import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Icon } from "@iconify/react";
import CustomerMetric from "./customerMetric";
import Link from "next/link";
import { customers } from '@/data/customers';

interface Customer {
    name: string;
    email: string;
    phone: string;
}

const CustomerManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;
    const [orders, setOrders] = useState<Customer[]>(customers);

    // Filtering vendors based on search term
    const filteredVendors = orders.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastVendor = currentPage * customersPerPage;
    const indexOfFirstVendor = indexOfLastVendor - customersPerPage;

    const { filteredOrders, currentVendors, totalPages } = useMemo(() => {
        const filtered: Customer[] = orders.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const displayed: Customer[] = filtered.slice(
            (currentPage - 1) * customersPerPage,
            currentPage * customersPerPage
        );
        const total = Math.ceil(filtered.length / customersPerPage);
        return { filteredOrders: filtered, currentVendors: displayed, totalPages: total };
    }, [orders, searchTerm, currentPage, customersPerPage]);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <CustomerMetric title="Total Customers" count={3500} icon="iconamoon:profile-fill" backgroundColor="#ED7620" />
                <CustomerMetric title="New Customers" count={2000} icon="lets-icons:user-add-alt-fill" backgroundColor="#3B9BCE" />
            </div>
            <form className="w-72 relative my-5">
                <input
                    id="search"
                    name="search"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search By Name"
                    className="w-full px-6 py-2 rounded-full outline-none bg-gray-100"
                />
                <button
                    aria-label="search for product"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    type="submit"
                >
                    <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
                </button>
            </form>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <input type="checkbox" />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="flex justify-center items-center">Edit User</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentVendors.map((customer, index) => (
                        <TableRow key={index}>
                            <TableCell><input type="checkbox" /></TableCell>
                            <TableCell>
                                <Link href={`/dashboard/customers/${customer.name.replace(/\s+/g, '-').toLowerCase()}`}>
                                    {customer.name}
                                </Link>
                            </TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell className=" flex justify-center items-center">
                                <Icon icon="tabler:trash" width="20" height="20" className="text-gray-300 hover:text-gray-500 cursor-pointer" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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

export default CustomerManagement;