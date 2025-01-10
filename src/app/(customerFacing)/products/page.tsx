import React, { Suspense } from 'react'
import { ProductCard, ProductCardSkeleton } from '../_components/ProductCard'
import { getProductsForUser } from '@/utils';

const ProductsSuspense = async () => {
    const products = await getProductsForUser();
    return products.map((product) => (
        <ProductCard key={product.id} {...product} />
    ))
}

const page = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <Suspense fallback={
                <>
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />

                </>
            }>
                {
                    <ProductsSuspense />
                }
            </Suspense>
        </div>
    )
}

export default page