import Image from "next/image";
import React from "react";

import Heading from "@/app/components/Heading";
import HeartButton from "@/app/components/HeartButton";

import useCountries from "@/app/Hooks/useCountries";
import { Listing, User } from "@prisma/client";

interface ListingHeadProps {
  listing: Listing;
  currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ listing, currentUser }) => {
  const { getByValue } = useCountries();
  const country = getByValue(listing.locationValue);
  
  return (
    <>
      <Heading
        title={listing.title}
        subtitle={`${country?.label}, ${country?.region}`}
      />
      <div className="w-full h-[64vh] rounded-lg overflow-hidden relative">
        <Image
          fill
          alt={listing.title}
          src={listing.imageSrc}
          className="object-cover"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={listing.id} currentUser={currentUser}/>
        </div>
      </div>
    </>
  );
};

export default ListingHead;
