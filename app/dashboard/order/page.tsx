import React from 'react';
import OrderTable from '@/components/order';
import { Wrapper } from '@/components/wrapper'; 
import { Heading } from '@/components/heading';
import OrderStatistics from '@/components/orderStat';

const OrderPage = () => {
  return (
    <Wrapper>
      <Heading>Order</Heading>
      <OrderStatistics/>
      <OrderTable />
    </Wrapper>
  );
};

export default OrderPage;
