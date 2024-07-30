import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected: boolean;
  onClick: (category: string) => void;
}
const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`p-3 flex flex-col gap-3 border-2 rounded-md transition cursor-pointer hover:bg-slate-100 ${
        selected ? "border-black" : "border-neutral-200/70"
      }`}
    >
      <Icon size={24} />
      <p className="text-bold">{label}</p>
    </div>
  );
};

export default CategoryInput;
