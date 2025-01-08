"use server"
import { db } from "@/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import path from 'path';
import crypto from 'crypto';

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
    name: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    description: z.string().min(1),
    file: fileSchema.refine((file) => file.size > 0, { message: "Required" }),
    image: imageSchema.refine((file) => file.size > 0, { message: "Required" }),
})

export const addProduct = async (prevState: unknown, formData: FormData) => {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }
    const data = result.data;

    const productsDir = path.resolve('products');
    await fs.mkdir(productsDir, { recursive: true });
    const filePath = path.join(productsDir, `${crypto.randomUUID()}-${data.file.name}`);
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

    const publicProductsDir = path.resolve('public', 'products');
    await fs.mkdir(publicProductsDir, { recursive: true });
    const imagePath = path.join('/products', `${crypto.randomUUID()}-${data.image.name}`);
    await fs.writeFile(path.join(publicProductsDir, imagePath), Buffer.from(await data.image.arrayBuffer()));

    await db.product.create({
        data: {
            name: data.name,
            priceInCents: data.priceInCents,
            description: data.description,
            filePath: filePath,
            imagePath: imagePath,
            isAvailableForPurchase: false
        }
    });
    redirect("/admin/products");
}

export const toggleProductAvailability = async (id: string, isAvailableForPurchase: boolean) => {
    await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
}

export const deleteProduct = async (id: string) => {
    const product = await db.product.delete({ where: { id } });
    if (product == null) {
        return notFound();
    }
    await Promise.all([fs.unlink(product.filePath), fs.unlink(`public${product.imagePath}`)])
}

const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: imageSchema.optional(),
})

export const updateProduct = async (id:string, prevState: unknown, formData: FormData) => {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }
    const data = result.data;
    const product = await db.product.findUnique({where: {id}})

    if(product == null){
        return notFound();
    }
    let filePath = product.filePath;;
    if(data.file != null && data.file.size > 0 ){
        await fs.unlink(product.filePath);
        filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
        await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
    }

    let imagePath = product.imagePath;
    if(data.image != null && data.image.size > 0 ){
        await fs.unlink(`public${product.imagePath}`);
        imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
    }

    await db.product.update({
        where: {id},
        data: {
            name: data.name,
            priceInCents: data.priceInCents,
            description: data.description,
            filePath: filePath,
            imagePath: imagePath,
        }
    });
    redirect("/admin/products");
}