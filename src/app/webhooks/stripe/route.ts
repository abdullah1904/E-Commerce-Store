import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { Resend } from "resend"
import { db } from "@/db"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
    const event = await stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get("stripe-signature") as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
    )

    if (event.type === "charge.succeeded") {
        const charge = event.data.object;
        const productId = charge.metadata.productId;
        const email = charge.billing_details.email;
        const pricePaidInCents = charge.amount;

        const product = await db.product.findUnique({ where: { id: productId } })
        if (product == null || email == null) {
            return new NextResponse("Bad Request", { status: 400 })
        }

        const userFields = {
            email,
            orders: { create: { productId, pricePaidInCents } },
        }
        await db.user.upsert({
            where: { email },
            create: userFields,
            update: userFields,
            select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
        })

        await db.downloadVerification.create({
            data: {
                productId,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
        })

        await resend.emails.send({
            from: `Support <${process.env.SENDER_EMAIL}>`,
            to: email,
            subject: "Order Confirmation",
            react: "<h2>Thank you for your purchase!</h2>"
        })
    }

    return new NextResponse()
}