import React from "react";

import getReservations from "../actions/getReservations";
import { getCurrentUser } from "../actions/getCurrentUser";

import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const Trips = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please Login" />;
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subTitle="Looks like you have not reserved any trips yet."
      />
    );
  }

  return <TripsClient currentUser={currentUser} reservations={reservations} />;
};

export default Trips;
