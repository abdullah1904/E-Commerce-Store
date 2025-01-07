import { db } from "@/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';

type Props = {
    params: Promise<{ id: string }>
}

export const GET = async (req: NextRequest, { params }: Props) => {
    const { id } = await params;
    const product = await db.product.findUnique({
        where: { id },
        select: { filePath: true, name: true }
    });
    if (product == null) {
        return notFound();
    }
    const { size } = await fs.stat(product.filePath);
    const file = await fs.readFile(product.filePath);
    const extension = product.filePath.split('.').pop();
    return new NextResponse(file,{headers:{
        "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
        "Content-Length": size.toString(),
    }});
}