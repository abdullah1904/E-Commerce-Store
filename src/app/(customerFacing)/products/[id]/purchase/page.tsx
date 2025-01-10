import CheckoutForm from '@/app/(customerFacing)/_components/CheckoutForm';
import { getProduct } from '@/utils';
import { notFound } from 'next/navigation';
import React from 'react'
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Props = {
    params: Promise<{ id: string }>
}

const page = async ({ params }: Props) => {
    const { id } = await params;
    const product = await getProduct(id);
    if (product == null) {
        notFound();
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: product.priceInCents,
        currency: "usd",
        payment_method_types: ["card"],
        metadata: {
            productId: product.id
        }
    });
    if (paymentIntent.client_secret == null) {
        throw Error("Stripe failed to create payment intent");
    }
    return (
        <CheckoutForm product={product} clientSecret={paymentIntent.client_secret}/>
    )
}

export default page