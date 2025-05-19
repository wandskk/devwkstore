import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user";

export const getUserWithSession = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  const user = await getUserById(userId);

  return user;
};
