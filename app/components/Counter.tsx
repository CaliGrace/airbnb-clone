"use client";
import { useCallback } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

interface CounterProps {
  value: number;
  title: string;
  subTitle: string;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  value,
  title,
  subTitle,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onMinus = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <div className="font-bold">{title}</div>
        <div className="font-light font-sm">{subTitle}</div>
      </div>
      <div className="flex items-center gap-2">
        <div
          onClick={onMinus}
          className="flex justify-center items-center p-2 rounded-full cursor-pointer hover:opacity-80 transition"
        >
          <CiCircleMinus size={40} color="#777" />
        </div>
        <div className="text-lg">{value}</div>
        <div
          onClick={onAdd}
          className="flex justify-center items-center p-2 rounded-full cursor-pointer hover:opacity-80"
        >
          <CiCirclePlus size={40} color="#777" />
        </div>
      </div>
    </div>
  );
};

export default Counter;
