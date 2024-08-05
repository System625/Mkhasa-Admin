import React from 'react';

const OrderStatistics = () => {
  // Assuming these values come from your state or props
  const totalOrder = 49;
  const orderedItemsOverTime = 234;
  const returns = 9;
  const deliveredOrdersOverTime = 598;

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center my-4 p-2 bg-gray-100 rounded">
        <h2 className="text-3xl pb-3 lg:pb-0">Today</h2>
      <div className='grid justify-around grid-cols-2 lg:grid-cols-4 items-center gap-8'>
      <div className="text-center">    
        <p className='text-xs lg:text-base'>Total Order</p>
        <h2 className="text-3xl font-bold">{totalOrder}</h2>
      </div>
      <div className="text-center">        
        <p className='text-xs lg:text-base'>Ordered Items Over Time</p>
        <h2 className="text-3xl font-bold">{orderedItemsOverTime}</h2>
      </div>
      <div className="text-center">        
        <p className='text-xs lg:text-base'>Returns</p>
        <h2 className="text-3xl font-bold">{returns}</h2>
      </div>
      <div className="text-center">        
        <p className='text-xs lg:text-base'>Delivered Orders Over Time</p>
        <h2 className="text-3xl font-bold">{deliveredOrdersOverTime}</h2>
      </div>
      </div>
    </div>
  );
};

export default OrderStatistics;
