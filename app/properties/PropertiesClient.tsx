"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { Listing, Reservation, User } from "@prisma/client";
import Heading from "../components/Heading";
import ListingCard from "../components/ListingCard";

import Container from "../components/Container";
import axios from "axios";
import toast from "react-hot-toast";

interface PropertiesClient {
  listings: Listing[];
  currentUser: User | null;
}

const PropertiesClient: React.FC<PropertiesClient> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listing/${id}`)
        .then(() => {
          toast.success("Listing Deleted");
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
        title="Your Properties"
        subtitle="All of your listings"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {listings?.map((listing) => {

          return (
            <ListingCard
              key={listing.id}
              onAction={() => onCancel(listing.id)}
              actionLabel="Delete Listing"
              currentUser={currentUser}
              data={listing}
              disabled={listing.id === deletingId}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
