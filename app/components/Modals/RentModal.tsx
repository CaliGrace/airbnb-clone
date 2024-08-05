"use client";

import { use, useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/Hooks/useRent";
import Heading from "../Heading";

import { categoryList } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Counter";
import ImageUpload from "../ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import useLoginModal from "@/app/Hooks/useLoginModal";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
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
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

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

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    axios
      .post("/api/listing", data)
      .then((res) => {
        toast.success("Listing created");
        rentModal.onClose();
        router.refresh();
      })
      .catch((error) => {
        toast.error("Error occured");
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
      return "Create";
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
        <Map markerData={location?.label} position={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="Tell us about your property?"
          subtitle="What ameneties do you have?"
        />
        <Counter
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
          title="Guests"
          subTitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
          title="Rooms"
          subTitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
          title="Bath Room"
          subTitle="How many bath room do you have?"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col items-center justify-center">
        <ImageUpload
          value={imageSrc}
          onChange={(value: string) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="How would you describe your property?"
          subtitle="Short and sweet works."
        />
        <Input
          id="title"
          label="Title"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Description"
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="">
        <Heading title="Set your price" subtitle="How much does it cost?" />
        <Input
          id="price"
          register={register}
          required
          formatPrice
          label="Price"
          errors={errors}
          type="number"
        />
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
      onSubmit={handleSubmit(submitHandler)}
      body={bodyContent}
      secondaryAction={onBack}
    />
  );
};

export default RentModal;
