"use client";
import { useSearchParams, useRouter } from "next/navigation";
import queryString from "query-string";

import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { Suspense } from "react";

interface CategoryBoxProps {
  label: string;
  description?: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(()=>{
    let currentQuery = {}

    if(params) {
        currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
        ...currentQuery,
        category: label
    }

    if(params?.get('category') === label) {
        delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl({
        url: '/',
        query: updatedQuery,
    }, {skipNull: true})

    router.push(url);

}, [label,router,params])

  return (
    <Suspense>
    
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
      
    </Suspense>
  );
};

export default CategoryBox;
