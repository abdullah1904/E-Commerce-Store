import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getProducts } from '@/utils'
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react';
import React from 'react'

const ProductsTable = async () => {
    const products = await getProducts();
    if (products.length === 0) {
        return <p>No Products Found</p>
    }
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
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>{
                            product.isAvailableForPurchase ? (
                                <>
                                    <CheckCircle2 />
                                    <span className='sr-only'>Available</span>
                                </>
                            ) : (
                                <>
                                    <XCircle />
                                    <span className='sr-only'>Unavailable</span>
                                </>
                            )
                        }</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell>
                            <MoreVertical />
                            <span className='sr-only'>Actions</span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ProductsTable