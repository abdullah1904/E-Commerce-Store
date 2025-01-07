import PageHeader from '../../../_components/PageHeader';
import React from 'react'
import ProductForm from '../../_components/ProductForm'
import { db } from '@/db';

type Props = {
    params: Promise<{ id: string }>
}

const page = async ({ params }: Props) => {
    const { id } = await params;
    const product = await db.product.findUnique({ where: { id } });
    return (
        <div>
            <PageHeader>Edit Product</PageHeader>
            <ProductForm product={product} />
        </div>
    )
}

export default page