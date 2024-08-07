import React from 'react';
import { Wrapper } from '@/components/wrapper';
import { Heading } from '@/components/heading';
import { SubHeading } from '@/components/subHeading';
import { Icon } from "@iconify/react";

const CustomersPage = () => {
    return (
        <Wrapper>
            <Heading>Customers</Heading>
            <SubHeading className='flex items-center gap-1 mt-3'>
                Category
                <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                Customers
            </SubHeading>
        </Wrapper>
    );
};

export default CustomersPage;
