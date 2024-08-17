"use client"
import React from "react";
import Heading from "./Heading";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  reset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact match found!",
  subTitle = "Change or remove some of your filters.",
  reset
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <Heading title={title} subtitle={subTitle} center />
      {reset && (
        <div className="w-[10%]">

            <Button
              label="Reset Filters"
              outline
              onClick={() => router.push("/")}
            />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
