import Prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { reservationId } = params;

  try {
    const currentUser = await getCurrentUser();

    const reservation = await Prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser?.id },
          { listing: { userId: currentUser?.id } },
        ],
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.error();
  }
}
