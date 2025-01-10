import React from 'react'
import ProductGridSection from './_components/ProductGridSection'
import { getMostPopularProducts, getNewestProducts } from '@/utils'

const page = () => {
  return (
    <main className='space-y-12'>
        <ProductGridSection title={"Most Popular"} productFetcher={getMostPopularProducts}/>
        <ProductGridSection title={"Newest"} productFetcher={getNewestProducts}/>
    </main>
  )
}

export default page