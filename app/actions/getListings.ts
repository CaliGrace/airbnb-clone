import Prisma from "@/libs/prismadb";

export interface IListingParams {
  userId?: string;
}
export default async function getListings(params: IListingParams) {
  const {userId} = params;
  let query: any = {};

  if(userId) {
    query.userId = userId
  }

  try {
    const listings = await Prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "asc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error)
  }
}

