import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { ProductCard, ProductCardSkeleton } from './ProductCard'

type Props = {
    title: string
    productFetcher: () => Promise<Product[]>
}

const ProductSuspense = async ({ productFetcher }: { productFetcher: () => Promise<Product[]> }) => {
    return (await productFetcher()).map(product => (
        <ProductCard key={product.id} {...product} />
    ))
}

const ProductGridSection = ({ title, productFetcher }: Props) => {
    return (
        <div className='space-y-4'>
            <div className='flex gap-4'>
                <h2 className='text-3xl font-bold'>{title}</h2>
                <Button variant="outline" asChild>
                    <Link href="/products" className='space-x-2'>
                        <span>View All</span>
                        <ArrowRight className='size-5=4' />
                    </Link>
                </Button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Suspense fallback={
                    <>
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </>
                }>
                    {
                        <ProductSuspense productFetcher={productFetcher} />
                    }
                </Suspense>
            </div>
        </div>
    )
}

export default ProductGridSection