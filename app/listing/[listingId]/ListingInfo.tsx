"use client";

import React from "react";
import { Listing, User } from "@prisma/client";

import Avatar from "@/app/components/Avatar";
import ListingCategory from "./ListingCategory";
import { categoryList } from "./ListingClient";
import useCountries from "@/app/Hooks/useCountries";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";

interface ListingInfoProps {
  user: User;
  category: string;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}


const Map = 
dynamic(() => import("@/app/components/Map"), { ssr: false });

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {

  const categoryObject = categoryList.find((item) => item.label === category);

  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue);

  return (
    <div className="col-span-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <p className="font-bold text-lg">Hosted by {user?.name}</p>
        <Avatar src={user.image} />
      </div>
      <div className="flex gap-4 text-neutral-500">
        <div>{guestCount} guests</div>
        <div>{roomCount} rooms</div>
        <div>{bathroomCount} bathrooms</div>
      </div>
      <hr />
      {categoryObject && (
        <ListingCategory
          icon={categoryObject.icon}
          description={categoryObject?.description}
          label={categoryObject?.label}
        />
      )}
      <hr />
      <div className="text-lg text-neutral-500">{description}</div>
      <hr />
      <Map position={coordinates?.latlng}/>

    </div>
  );
};

export default ListingInfo;
