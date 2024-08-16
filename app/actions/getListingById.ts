import Prisma from "@/libs/prismadb";

interface IParams {
  listingId: string;
}

export default async function getListingById(params: IParams) {
  const { listingId } = params;

  try {
    const listing = await Prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });

    if(!listing) {
        return null;
    }
    return listing;
    
  } catch (error: any) {
    throw new Error(error);
  }
}
