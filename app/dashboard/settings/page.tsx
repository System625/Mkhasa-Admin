import React from 'react';
import { Wrapper } from '@/components/wrapper';
import { Heading } from '@/components/heading';
import { SubHeading } from '@/components/subHeading';
import { Icon } from "@iconify/react";

const SettingsPage = () => {
    return (
        <Wrapper>
            <Heading>Settings</Heading>
            <SubHeading className='flex items-center gap-1 mt-3'>
                Dashboard
                <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                Settings
            </SubHeading>
        </Wrapper>
    );
};

export default SettingsPage;
