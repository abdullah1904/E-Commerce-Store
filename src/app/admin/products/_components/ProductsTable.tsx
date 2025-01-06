import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const ProductsTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

            </TableBody>
        </Table>
    )
}

export default ProductsTable