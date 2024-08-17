"use client";

import React, { useMemo, useState } from "react";
import qs from "query-string";
import useSearchModal from "@/app/Hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";

import Modal from "./Modal";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import Calendar from "../inputs/Calendar";
import Heading from "../Heading";
import Counter from "../Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const initialDate = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  }

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();

  const [bathroomCount, setBathroomCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>(initialDate);

  const params = useSearchParams();

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onSubmit = () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    const currentQuery = qs.parse(params.toString());

    let updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      bathroomCount,
      roomCount,
      guestCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: "/",
      query: updatedQuery,
    });

    router.push(url);
    searchModal.onClose();
    setStep(STEPS.LOCATION)
    setDateRange(initialDate)
    setRoomCount(1);
    setGuestCount(1);
    setBathroomCount(1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onBack = () => {
    if (step === STEPS.LOCATION) return;
    setStep((value) => value - 1);
  };

  const actionLabel = () => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  };

  const secondaryActionLabel = () => {
    if (step === STEPS.LOCATION) {
      return;
    }

    return "Back";
  };

  let bodyContent = (
    <div className="flex flex-col gap-5">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <Map position={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-5">
        <Heading
          title="Where do you plan to go "
          subtitle="Make sure everyone is free"
        />
        <Calendar value={dateRange} onChange={(value: any) => setDateRange(value.selection)} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-5">
        <Heading title="More information" subtitle="Find your perfect place"/>
        <Counter
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
          subTitle="How many bathrooms do you need?"
          title="Bathrooms"
        />
        <Counter
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
          subTitle="How many guests are coming?"
          title="Guests"
        />
        <Counter
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
          subTitle="How many rooms do you need?"
          title="Rooms"
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filter"
      actionLabel={actionLabel()}
      onSubmit={onSubmit}
      secondaryAction={onBack}
      secondaryActionLabel={secondaryActionLabel()}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
