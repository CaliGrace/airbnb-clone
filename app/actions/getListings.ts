import Prisma from "@/libs/prismadb";
async function getListings() {
  try {
    const listings = await Prisma.listing.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getListings;