"use client";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
      <PulseLoader color="red" />
    </div>
  );
};

export default Loader;
