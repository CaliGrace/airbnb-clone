import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import Prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser();

  const { startDate, endDate, totalPrice, listingId } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!startDate || !endDate || !totalPrice || !listingId) {
    return NextResponse.error();
  }

  const listingAndReservations = await Prisma.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservations);
}
