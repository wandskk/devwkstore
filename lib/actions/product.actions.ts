"use server";
import { prisma } from "@/db/prisma";
import { ProductsConstants } from "@/lib/constants/products";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: ProductsConstants.latestProductsLimit,
    orderBy: {
      createdAt: "desc",
    },
  });

  return data.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({ where: { slug } });
}

export async function getProductById(id: string) {
  return await prisma.product.findFirst({ where: { id } });
}
