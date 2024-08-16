import { getCurrentUser } from "@/app/actions/getCurrentUser";
import Prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { listingId } = params;
    const currentUser = await getCurrentUser();

    if (!listingId) {
      throw new Error("Invalid error");
    }

    const deletedListing = await Prisma.listing.delete({
      where: { id: listingId, userId: currentUser?.id },
    });

    return NextResponse.json(deletedListing);
  } catch (error: any) {
    throw new Error(error);
  }
}
