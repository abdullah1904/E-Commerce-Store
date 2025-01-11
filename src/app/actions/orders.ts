"use server"

import { db } from "@/db"

export const userOrderExists = async (email: string, productId: string) => {
    return (await db.order.findFirst({
        where: {
            user: {
                email,
            },
            productId
        },
        select: {
            id: true
        }
    })) != null;
}

export const createDownloadVerification = async (productId: string) => {
    return (
        await db.downloadVerification.create({
            data: {
                productId,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
        })
    ).id;
}