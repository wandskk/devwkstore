'use server';
import { prisma } from "@/db/prisma"
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants/index"

export async function getLatestProducts() {
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: {
            createdAt: 'desc'
        }
    })

    return data.map((product) => ({
        ...product,
        price: product.price.toString(),
        rating: product.rating.toString(),
    }));
}

export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({ where: { slug } })
}

export async function getProductById(id: string) {
    return await prisma.product.findFirst({ where: { id } })
}