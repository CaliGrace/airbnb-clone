import Prisma from "@/libs/prismadb";
import { getCurrentUser } from "../actions/getCurrentUser";
import { useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import useLoginModal from "./useLoginModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User } from "@prisma/client";

interface IUseFavorites {
  listingId: string;
  currentUser?: User | null;
}

const useFavorites = ({ listingId, currentUser }: IUseFavorites) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  // if (!currentUser) {
  //   throw new Error();
  // }

  const favoriteList = currentUser?.favoriteIds;

  const isFavorite = useMemo(() => {
    return favoriteList?.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async () => {
    let request;

    try {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      if (isFavorite) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success("Favorite operation success.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }, [currentUser, router, listingId]);

  return {
    isFavorite,
    toggleFavorite,
  };
};

export default useFavorites;
