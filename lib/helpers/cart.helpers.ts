import { cookies } from "next/headers";
import { getUserWithSession } from "@/lib/utils/user.utils";

export const getCartAndUserCookies = async () => {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;

  if (!sessionCartId) {
    throw new Error("Cart session not found");
  }

  const user = await getUserWithSession();

  return {
    sessionCartId,
    userId: user?.id,
  };
};
