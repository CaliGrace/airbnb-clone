import { Listing, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import useCountries from "../Hooks/useCountries";
import HeartButton from "./Listings/HeartButton";

interface DataProps {
  data: Listing;
  currentUser: User | null;
}

const ListingCard: React.FC<DataProps> = ({ data, currentUser }) => {
  const { getByValue } = useCountries();
  const country = getByValue(data.locationValue);

  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col w-full gap-3">
        <div className="relative aspect-square w-full h-full rounded-xl overflow-hidden">
          <Image
            fill
            alt={data.title || "listing"}
            src={data.imageSrc}
            className="object-cover w-full h-full transition group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div>
          <p>{data.title}</p>
          <p className="text-slate-700 text-xs">{country?.label}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
