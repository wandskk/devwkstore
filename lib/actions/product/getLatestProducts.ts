"use server";

import { prisma } from "@/db/prisma";
import { ProductsConstants } from "@/lib/constants/products";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: ProductsConstants.latestProductsLimit,
    orderBy: { createdAt: "desc" },
  });

  return data.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));
}
