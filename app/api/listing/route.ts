import { getCurrentUser } from "@/app/actions/getCurrentUser";
import Prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser()

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  if(!currentUser) {
    return NextResponse.error();
  }

  const listing = await Prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price),
      title,
      description,
      userId: currentUser?.id
    },
  });

  return NextResponse.json(listing)
}
