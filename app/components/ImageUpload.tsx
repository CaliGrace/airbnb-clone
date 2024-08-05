import Image from "next/image";
import React, { useCallback } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const imageHandler = useCallback(
    (results: any) => {
      onChange(results.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget uploadPreset="airbnb-clone" onSuccess={imageHandler}>
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative p-8 py-24 w-full rounded-lg flex flex-col justify-center items-center border-dashed border-2 hover:opacity-70 cursor-pointer"
          >
            <RiImageAddLine size={36} />
            <div>Upload Image</div>

            {value && <Image fill src={value} alt="image" style={{objectFit: 'cover'}}/>}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
