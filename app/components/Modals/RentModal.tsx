"use client";

import { use, useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/Hooks/useRent";
import Heading from "../Heading";

import { categoryList } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const {
    register,
    setValue,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const [step, setStep] = useState(STEPS.CATEGORY);

  const onNext = () => {
    if (step === STEPS.PRICE) {
      return undefined;
    }
    setStep((value) => value + 1);
  };

  const onBack = () => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    setStep((value) => value - 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return undefined;
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div>
      <Heading
        title="Which of this best describes your place?"
        subtitle="Pick your category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto py-3">
        {categoryList.map((item) => (
          <CategoryInput
            key={item.label}
            onClick={(category) => setCustomValue("category", category)}
            icon={item.icon}
            label={item.label}
            selected={category === item.label}
          />
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find your place"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map markerData={location?.label} position={location?.latlng}/>
      </div>
    );
  }

  return (
    <Modal
      title="Rent Airbnb"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      body={bodyContent}
      secondaryAction={onBack}
    />
  );
};

export default RentModal;
