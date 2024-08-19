import Prisma from "@/libs/prismadb";

interface IParams {
  userId?: string;
  authorId?: string;
  listingId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { userId, authorId, listingId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = {userId: authorId}
    }

    if (listingId) {
      query.listingId = listingId;
    }

    const reservations = await Prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
