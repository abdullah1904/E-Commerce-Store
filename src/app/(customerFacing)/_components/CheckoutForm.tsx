"use client"
import { Product } from '@prisma/client'
import React from 'react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import { formatCurrency } from '@/utils/formatters'

type Props = {
    clientSecret: string
    product: Product
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

const CheckoutForm = ({ clientSecret, product }: Props) => {
    return (
        <div className="max-w-5xl w-full mx-auto space-y-8">
            <div className="flex gap-4 items-center">
                <div className="aspect-video flex-shrink-0 w-1/3 relative">
                    <Image
                        src={product.imagePath}
                        fill
                        alt={product.name}
                        className="object-cover"
                    />
                </div>
                <div>
                    <div className="text-lg">
                        {formatCurrency(product.priceInCents / 100)}
                    </div>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <div className="line-clamp-3 text-muted-foreground">
                        {product.description}
                    </div>
                </div>
            </div>
            <Elements options={{ clientSecret }} stripe={stripePromise}>
                <Form priceInCents={product.priceInCents} productId={product.id} />
            </Elements>
        </div >
    )
}

const Form = ({ priceInCents, productId }: { priceInCents: number, productId: string }) => {
    const stripe = useStripe();
    const elements = useElements();
    return (
        <form>
            <PaymentElement />
        </form>
    )
}

export default CheckoutForm