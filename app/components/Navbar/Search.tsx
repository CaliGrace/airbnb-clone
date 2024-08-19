"use client";

import useCountries from "@/app/Hooks/useCountries";
import useSearchModal from "@/app/Hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { Suspense } from "react";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const location = params.get("locationValue");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const guests = params.get("guestCount");

  const locationLabel = useMemo(() => {
    if (location) {
      return getByValue(location)?.label;
    }

    return "Anywhere";
  }, [location, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const diff = differenceInDays(
        new Date(endDate.toString()),
        new Date(startDate.toString())
      );
      return `${diff} days`;
    }

    return "Anyweek";
  }, [startDate, endDate]);

  const guestsLabel = useMemo(() => {
    if (guests) {
      return `${guests} Guests `;
    }

    return "Add Guests";
  }, [guests]);

  return (
    <Suspense>
      <div
        onClick={() => searchModal.onOpen()}
        className="w-full md:w-auto rounded-full border px-6 py-2 gap-2 flex justify-between items-center"
      >
        <div className="hidden sm:block px-3 py-1 hover:bg-slate-100 font-semibold transition rounded-full cursor-pointer">
          {locationLabel}
        </div>
        <div className="px-3 py-1  font-semibold hover:bg-slate-100 transition rounded-full cursor-pointer">
          {durationLabel}
        </div>
        <div className="px-3 py-1 hover:bg-slate-100 transition rounded-full cursor-pointer flex gap-2 items-center">
          <div className="hidden sm:block font-semibold ">{guestsLabel}</div>
          <div className="bg-rose-700 text-white p-2 rounded-full">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Search;
