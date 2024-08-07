import React from 'react';
import { Wrapper } from '@/components/wrapper';
import { Heading } from '@/components/heading';
import { SubHeading } from '@/components/subHeading';
import { Icon } from "@iconify/react";
import { Button } from '@/components/ui/button';
import InventoryTable from '@/components/inventoryTable';

const InventoryPage = () => {
    return (
        <Wrapper>
            <div className='flex justify-between items-center'>
                <div>
                    <Heading>Inventory</Heading>
                    <SubHeading className='flex items-center gap-1 mt-3'>
                        Category
                        <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                        Inventory
                    </SubHeading>
                </div>
                <div>
                    <Button className='rounded-none bg-[#3B9BCE] w-28 text-xs md:text-base md:w-full'>Add New Product</Button>
                </div>
            </div>
            <InventoryTable/>
        </Wrapper>
    );
};

export default InventoryPage;
