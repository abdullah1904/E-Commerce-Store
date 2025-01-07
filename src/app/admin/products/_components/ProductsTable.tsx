import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getProducts } from '@/utils'
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { ActiveToggleDropDownItem, DeleteDropDownItem } from './ProductActions';

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
                                    <XCircle className='stroke-destructive'/>
                                    <span className='sr-only'>Unavailable</span>
                                </>
                            )
                        }</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className='sr-only'>Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>
                                            Download
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href={`/admin/products/${product.id}/edit`}>
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropDownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} />
                                    <DropdownMenuSeparator/>
                                    <DeleteDropDownItem id={product.id}  disabled={product._count.orders > 0}/>
                                </DropdownMenuContent> 
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ProductsTable