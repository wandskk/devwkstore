"use server";

import { prisma } from "@/db/prisma";

export async function getProductById(id: string) {
  return await prisma.product.findFirst({ where: { id } });
}
