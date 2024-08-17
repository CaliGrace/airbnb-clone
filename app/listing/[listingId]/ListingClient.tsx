"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import Container from "@/app/components/Container";
import { Listing, Reservation, User } from "@prisma/client";

import ListingHead from "./ListingHead";

import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { MdOutlineVilla } from "react-icons/md";

import ListingInfo from "./ListingInfo";
import useLoginModal from "@/app/Hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval, format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";

import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

export const categoryList = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has a skiing activities",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has a camping activites",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is on arctic",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in cave",
  },
  {
    label: "Dessert",
    icon: GiCactus,
    description: "This property is in a desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious",
  },
];

interface ListingClientProps {
  listing: Listing & { user: User };
  currentUser: User | null;
  reservations?: Reservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations,
  currentUser,
}) => {
  
  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const [isLoading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const loginModal = useLoginModal();
  const router = useRouter();

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {

      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const disabledDates = useCallback(() => {
    let dates: Date[] = [];

    reservations?.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
        router.refresh()
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [totalPrice, listing?.id, dateRange, router, currentUser, loginModal]);

  return (
    <Container>
      <div className="w-full flex flex-col gap-4">
        <ListingHead listing={listing} currentUser={currentUser} />
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-16 mt-6 justify-between">
          <ListingInfo
            user={listing.user}
            category={listing.category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
          <div className="order-first md:order-last col-span-3">
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              disabled={isLoading}
              disabledDates={disabledDates()}
              onSubmit={onCreateReservation}
              dateRange={dateRange}
              onChangeDate={(value) => setDateRange(value)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
