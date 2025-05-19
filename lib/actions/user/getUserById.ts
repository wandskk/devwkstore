"use server";

import { prisma } from "@/db/prisma";

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}
