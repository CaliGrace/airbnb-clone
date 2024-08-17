import React from "react";
import getFavoriteListings from "../actions/getFavoriteListings";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";
import { getCurrentUser } from "../actions/getCurrentUser";

const Favorites = async () => {
  const favorites = await getFavoriteListings();
  const currentUser = await getCurrentUser()

  if(!currentUser) {
    return (
      <EmptyState
        title="Unauthorized user"
        subTitle="Please login to add your favorites"
      />
    )
  }

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No Favorites"
        subTitle="You've not added any favorites"
      />
    );
  }
  return <FavoritesClient currentUser={currentUser} favorites={favorites}/>
};

export default Favorites;
