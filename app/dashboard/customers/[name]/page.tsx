// app/customers/[name]/page.tsx

import { notFound } from 'next/navigation';
import CustomerDetail from '@/components/customerDetail';
import { customers, Customer } from '@/data/customers';

interface Params {
    name: string;
}

export default function CustomerDetailPage({ params }: { params: Params }) {
    const customerName = params.name.replace(/-/g, ' ');
    const customer = customers.find(c => c.name.toLowerCase() === customerName.toLowerCase());

    if (!customer) {
        notFound();
    }

    return <CustomerDetail customer={customer} />;
}