import Prisma from "@/libs/prismadb";

export interface IListingParams {
  userId?: string;
  bathroomCount?: number;
  roomCount?: number;
  guestCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  const {userId, bathroomCount, roomCount, guestCount, startDate, endDate, locationValue, category} = params;
  let query: any = {};

  if(userId) {
    query.userId = userId
  }

  if(category) {
    query.category = category
  }

  if(bathroomCount) {
    query.bathroomCount = {gte: +bathroomCount}
  }

  if(roomCount) {
    query.roomCount = {gte: +roomCount}
  }

  if(guestCount) {
    query.guestCount = {gte: +guestCount}
  }

  if(startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            {
              startDate: {lte: endDate},
              endDate: {gte: startDate}
            },
            {
              startDate: {gte: startDate},
              endDate: {lte: endDate}
            }
          ]
        }
      }
    }
  }

  if(locationValue) {
    query.locationValue = locationValue
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

