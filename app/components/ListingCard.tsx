import React, { useCallback } from "react";
import { Listing, Reservation, User } from "@prisma/client";
import Image from "next/image";

import { format } from "date-fns";

import useCountries from "../Hooks/useCountries";
import HeartButton from "./HeartButton";
import Link from "next/link";
import Button from "./Button";

interface DataProps {
  data: Listing ;
  currentUser: User | null;
  reservation?: Reservation;
  actionLabel?: string;
  onAction?: (id: string) => void;
  actionId?: string;
  disabled?: boolean;
}

const ListingCard: React.FC<DataProps> = ({
  data,
  currentUser,
  reservation,
  disabled,
  onAction,
  actionLabel,
  actionId = "",
}) => {
  const { getByValue } = useCountries();
  const country = getByValue(data?.locationValue);

  const price = () => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  };

  const reservationDate = useCallback(() => {
    if (!reservation) {
      return null;
    }

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  }, [reservation]);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault()

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

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
        <div className="flex items-center flex-wrap gap-2">
          <p className="font-bold">{data.title}, </p>
          <p className="text-slate-700 text-xs">{country?.label}</p>
        </div>
        <div>
          <p className="text-neutral-700 text-sm">
            {reservationDate() || data.category}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm font-semibold ">$ {price()} </p>
          {!reservation && <span className="font-light text-sm">night</span>}
        </div>
        {(onAction && actionLabel) && (
          <Button label={actionLabel} onClick={handleCancel} disabled={disabled}/>
        )}
      </div>
    </Link>
  );
};

export default ListingCard;
