import Button from "@/app/components/Button";
import Calendar from "@/app/components/inputs/Calendar";
import React, { useCallback } from "react";
import { DateRange, Range } from "react-date-range";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  disabled?: boolean;
  disabledDates: Date[];
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit,
  dateRange,
}) => {

  return (
    <div className="border-[1px] border-neutral-200 rounded-xl p-4 bg-white ">
      <div className="flex gap-4 ml-4 items-center gap-3">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="text-xs text-neutral-600">night</div>
      </div>
      <hr className="my-4" />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value: any) => onChangeDate(value.selection)}
      />
      <div className="flex justify-between p-6">
        <div className="font-bold">Total</div>
        <div className="font-bold">$ {totalPrice}</div>
      </div>
      <Button label="Reserve" onClick={onSubmit} disabled={disabled} />
    </div>
  );
};

export default ListingReservation;
