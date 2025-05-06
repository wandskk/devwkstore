'use server';
import { PrismaClient } from "@/lib/generated/prisma";
import { convertToPlainObject } from "@/lib/utils"
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants/index"


export const ProductActions = {
    getLatestProducts: async (limit = LATEST_PRODUCTS_LIMIT) => {
        const prisma = new PrismaClient();

        const data = await prisma.product.findMany({
            take: limit,
            orderBy: {
                createdAt: 'desc'
            }
        })

        return convertToPlainObject(data);
    }
}