"use client";

import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import useFavorites from "@/app/Hooks/useFavorites";
import { User } from "@prisma/client";

interface HeartButtonProps {
  listingId: string;
  currentUser: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites({
    listingId,
    currentUser,
  });

  return (
    <div
      className="relative"
      onClick={() => {
        toggleFavorite();
      }}
    >
      <FaRegHeart size={25} className="text-white absolute" />
      <FaHeart
        size={25}
        className={`${isFavorite ? "fill-rose-500" : "fill-neutral-700"}`}
      />
    </div>
  );
};

export default HeartButton;
