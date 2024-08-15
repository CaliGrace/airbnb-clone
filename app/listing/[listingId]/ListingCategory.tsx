"use client";

import React from "react";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  label: string | undefined;
  description: string | undefined;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <div>
        <Icon size={34} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">{label}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ListingCategory;
