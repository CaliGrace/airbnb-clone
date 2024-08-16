import Prisma from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export default async function getFavoriteListings() {
  const currentUser = await getCurrentUser();

  try {
    const favorites = await Prisma.listing.findMany({
        where: {
            id: {in: [...(currentUser?.favoriteIds) || []]}
        }
    })

    return favorites;
  } catch (error: any) {
    throw new Error(error)
  }
}
