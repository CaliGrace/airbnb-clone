"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { Listing, Reservation, User } from "@prisma/client";
import Heading from "../components/Heading";
import ListingCard from "../components/ListingCard";

import Container from "../components/Container";
import axios from "axios";
import toast from "react-hot-toast";

interface TripsClientProps {
  reservations?: Reservation[];
  currentUser: User | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })

        .catch((error) => {
          toast.error(error?.response?.data?.error || "Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {reservations?.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              onAction={() => onCancel(reservation.id)}
              actionLabel="Cancel Reservation"
              currentUser={currentUser}
              data={(reservation as any).listing}
              reservation={reservation}
              disabled={reservation.id === deletingId}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
