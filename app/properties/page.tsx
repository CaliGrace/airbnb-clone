import React from "react";

import getReservations from "../actions/getReservations";
import { getCurrentUser } from "../actions/getCurrentUser";

import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const Trips = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListings({ userId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subTitle="No listings added"
      />
    );
  }

  return <PropertiesClient currentUser={currentUser} listings={listings} />;
};

export default Trips;
