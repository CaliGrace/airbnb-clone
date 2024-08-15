import { Listing, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import useCountries from "../Hooks/useCountries";
import HeartButton from "./HeartButton";
import Link from "next/link";

interface DataProps {
  data: Listing;
  currentUser: User | null;
}

const ListingCard: React.FC<DataProps> = ({ data, currentUser }) => {
  const { getByValue } = useCountries();
  const country = getByValue(data.locationValue);

  return (
    <Link
      href={`/listing/${data.id}`}
      className="col-span-1 cursor-pointer group"
    >
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
        <div className="flex items-center gap-2">
          <p className="font-bold">{data.title}, </p>
          <p className="text-slate-700 text-xs">{country?.label}</p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm font-semibold ">$ {data.price} </p>
          <span className="font-light text-sm">night</span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
