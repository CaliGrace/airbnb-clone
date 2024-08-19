"use client";

import CategoryBox from "./CategoryBox";
import Container from "../Container";
import { usePathname, useSearchParams } from "next/navigation";
import { categoryList } from "../../listing/[listingId]/ListingClient";
import {Suspense } from 'react'

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const category = params?.get("category");

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Suspense>

    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto w-full">
        {categoryList.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
    </Suspense>
  );
};

export default Categories;
