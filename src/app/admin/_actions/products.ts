"use server"
import { db } from "@/db";
import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
    name: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    description: z.string().min(1),
    file: fileSchema.refine((file) => file.size > 0, { message: "Required" }),
    image: imageSchema.refine((file) => file.size > 0, { message: "Required" }),
})

export const addProduct = async (formData: FormData) => {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }
    const data = result.data;
}