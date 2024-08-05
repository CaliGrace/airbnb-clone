import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
  listingId: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;

  if (!currentUser) {
    return NextResponse.error();
  }

  const favoriteIds = [...(currentUser?.favoriteIds || null)];
  favoriteIds.push(listingId);

  const user = await Prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;

  if (!currentUser) {
    return NextResponse.error();
  }

  const favoriteIds = [...(currentUser?.favoriteIds || null)];

  const newFavoriteList = favoriteIds.filter((item) => item !== listingId);

  const user = await Prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds: newFavoriteList },
  });

  return NextResponse.json(user);
}
