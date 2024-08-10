import React from 'react';
import { Icon } from '@iconify/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Heading } from '@/components/heading';
import { Button } from './ui/button';
import CategoryMetric from './categoryMetric';

const CategoryTable: React.FC = () => {
  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Heading>Categories</Heading>
        <Button className='rounded-none bg-[#3B9BCE] text-xs md:text-base'>Add new Category</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <CategoryMetric title="Total Perfumes" count={569} icon="solar:perfume-bold" color="#C53EA7" />
        <CategoryMetric title="Total Body Spray" count={430} icon="streamline:spray-paint-solid" color="#85B6FF" />
        <CategoryMetric title="Total Reed Diffusers" count={569} icon="cbi:essential-oil-diffuser-alt" color="#51E4C9" />
        <CategoryMetric title="Total Roll On" count={569} icon="game-icons:perfume-bottle" color="
#DF6060" />
      </div>

      <Table className="w-full mt-5">
        <TableHeader>
          <TableRow className='bg-gray-100'>
            <TableHead>ID Category</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Sub Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { id: '#001', category: 'Perfumes', subCategory: 'Eau de Parfum', description: 'Lorem Ipsum Dolor Sit Amet' },
            { id: '#002', category: 'Body Spray', subCategory: 'Eau de Toilette', description: 'Lorem Ipsum Dolor Sit Amet' },
            { id: '#003', category: 'Reed Diffusers', subCategory: 'Eau de Cologne', description: 'Lorem Ipsum Dolor Sit Amet' },
            { id: '#004', category: 'Roll on', subCategory: 'Perfume Oil', description: 'Lorem Ipsum Dolor Sit Amet' },
          ].map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <Select defaultValue={item.subCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Eau de Parfum">Eau de Parfum</SelectItem>
                    <SelectItem value="Eau de Toilette">Eau de Toilette</SelectItem>
                    <SelectItem value="Eau de Cologne">Eau de Cologne</SelectItem>
                    <SelectItem value="Perfume Oil">Perfume Oil</SelectItem>
                    <SelectItem value="Body Mist">Body Mist</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="flex space-x-2 justify-end relative top-1">
                <Icon icon="akar-icons:edit" className="cursor-pointer" style={{ fontSize: 24 }} />
                <Icon icon="tabler:trash" className="cursor-pointer" style={{ fontSize: 24 }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
