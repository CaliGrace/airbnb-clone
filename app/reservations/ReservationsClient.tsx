"use client";
import React, { useState } from "react";
import { Reservation, User } from "@prisma/client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/ListingCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ReservationClientProps {
  reservations: Reservation[];
  currentUser: User | null;
}

const ReservationsClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();

  const onCancel = (id: string) => {
    setDeletingId(id);
    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation Cancelled");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Operation Not Successfull");
      })
      .finally(() => {
        setDeletingId("");
      });
  };

  return (
    <Container>
      <Heading title="Your reservations" subtitle="Reservations you created" />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {reservations.map((reservation) => (
          <ListingCard
            data={(reservation as any).listing}
            currentUser={currentUser}
            reservation={reservation}
            actionLabel="Cancel guest reservation"
            onAction={() => onCancel(reservation.id)}
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
