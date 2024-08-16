import React from "react";
import { getCurrentUser } from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const Reservation = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized user" subTitle="Go ahead and login" />
    );
  }

  const reservations = await getReservations({ authorId: currentUser?.id });

  if (reservations.length === 0) {
    return (
      <EmptyState title="No reservations" subTitle="Go ahead and login" />
    );
  }
  return <ReservationsClient reservations={reservations} currentUser={currentUser}/>
}

export default Reservation;
